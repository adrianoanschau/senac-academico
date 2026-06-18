import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchedulesService } from './schedules.service';
import { ScheduleGeneratorService } from './schedule-generator.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { RULE_EVENTS } from './events/rule-end-date-changed.event';

type MockScheduleConflict = { id: string; classGroup: { code: string } };

describe('SchedulesService', () => {
  let service: SchedulesService;
  let prismaService: PrismaService;
  let eventEmitter: EventEmitter2;

  const mockPrisma = {
    schedule: {
      create: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    $transaction: vi.fn(),
  };

  const mockGeneratorService = {
    generateProjections: vi.fn(),
  };

  const mockEventEmitter = {
    emit: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ScheduleGeneratorService, useValue: mockGeneratorService },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
    prismaService = module.get<PrismaService>(PrismaService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  describe('create', () => {
    const createDto: CreateScheduleDto = {
      startTime: new Date('2026-06-15T08:00:00Z').toISOString(),
      endTime: new Date('2026-06-15T12:00:00Z').toISOString(),
      roomId: 'room-1',
      professorId: 'prof-1',
      classGroupId: 'class-1',
      subjectId: 'subj-1',
    } as unknown as CreateScheduleDto;

    it('deve criar uma aula com sucesso se não houver conflitos (Caminho Feliz)', async () => {
      // Arrange
      mockPrisma.schedule.findFirst.mockResolvedValue(null); // Nenhum conflito de sala nem de prof
      const mockCreated = { id: 'sched-123', ...createDto };
      mockPrisma.schedule.create.mockResolvedValue(mockCreated);

      // Act
      const result = await service.create(createDto);

      // Assert
      // Garante que checou a sala
      expect(
        vi.spyOn(prismaService.schedule, 'findFirst'),
      ).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          where: expect.objectContaining({
            roomId: createDto.roomId,
          }) as unknown,
        }),
      );
      // Garante que checou o professor
      expect(
        vi.spyOn(prismaService.schedule, 'findFirst'),
      ).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          where: expect.objectContaining({
            professorId: createDto.professorId,
          }) as unknown,
        }),
      );
      expect(vi.spyOn(prismaService.schedule, 'create')).toHaveBeenCalledWith(
        expect.objectContaining({ data: createDto }),
      );
      expect(result).toEqual(mockCreated);
    });

    it('deve lançar BadRequestException se data de término for anterior à de início (Caminho Triste)', async () => {
      // Arrange
      const badDto = {
        ...createDto,
        startTime: new Date('2026-06-15T12:00:00Z').toISOString(),
        endTime: new Date('2026-06-15T08:00:00Z').toISOString(), // Invertido
      } as unknown as CreateScheduleDto;

      // Act & Assert
      await expect(service.create(badDto)).rejects.toThrow(BadRequestException);
      expect(
        vi.spyOn(prismaService.schedule, 'findFirst'),
      ).not.toHaveBeenCalled();
    });

    it('deve lançar ConflictException em caso de choque de sala (Caminho Triste)', async () => {
      // Arrange
      const mockConflict: MockScheduleConflict = {
        id: 'conflict-1',
        classGroup: { code: 'T1' },
      };

      // Simula que a primeira busca (por Sala) encontrou conflito
      mockPrisma.schedule.findFirst.mockResolvedValueOnce(mockConflict);

      // Act & Assert
      const promise = service.create(createDto);
      await expect(promise).rejects.toThrow(ConflictException);
      await expect(promise).rejects.toThrow('Choque de Sala');
      expect(vi.spyOn(prismaService.schedule, 'create')).not.toHaveBeenCalled();
    });

    it('deve lançar ConflictException em caso de choque de professor (Caminho Triste)', async () => {
      // Arrange
      const mockConflict: MockScheduleConflict = {
        id: 'conflict-2',
        classGroup: { code: 'T2' },
      };

      // Simula que a busca por sala retornou limpa (null), mas a busca por professor retornou conflito
      mockPrisma.schedule.findFirst
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockConflict);

      // Act & Assert
      const promise = service.create(createDto);
      await expect(promise).rejects.toThrow(ConflictException);
      await expect(promise).rejects.toThrow('Choque de Professor');
      expect(vi.spyOn(prismaService.schedule, 'create')).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('deve filtrar aulas que se sobrepõem ao intervalo informado', async () => {
      mockPrisma.schedule.findMany.mockResolvedValue([]);

      await service.findAll({ start: '2026-06-01', end: '2026-06-30' });

      expect(mockPrisma.schedule.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            AND: [
              { startTime: { lt: new Date('2026-06-30') } },
              { endTime: { gt: new Date('2026-06-01') } },
            ],
          }),
        }),
      );
    });

    it('deve filtrar por termo de busca em disciplina, professor, turma ou sala', async () => {
      mockPrisma.schedule.findMany.mockResolvedValue([]);

      await service.findAll({ search: 'matemática' });

      expect(mockPrisma.schedule.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            AND: [
              {
                OR: expect.arrayContaining([
                  {
                    subject: {
                      name: { contains: 'matemática', mode: 'insensitive' },
                    },
                  },
                  {
                    professor: {
                      name: { contains: 'matemática', mode: 'insensitive' },
                    },
                  },
                ]),
              },
            ],
          }),
        }),
      );
    });
  });

  describe('update', () => {
    const existing = {
      id: 'sched-1',
      startTime: new Date('2026-06-15T08:00:00Z'),
      endTime: new Date('2026-06-15T12:00:00Z'),
      roomId: 'room-1',
      professorId: 'prof-1',
      classGroupId: 'class-1',
      subjectId: 'subj-1',
    };

    it('deve atualizar quando não houver conflitos', async () => {
      mockPrisma.schedule.findUnique.mockResolvedValue(existing);
      mockPrisma.schedule.findFirst.mockResolvedValue(null);
      mockPrisma.schedule.update.mockResolvedValue({
        ...existing,
        roomId: 'room-2',
      });

      const result = await service.update('sched-1', { roomId: 'room-2' });

      expect(mockPrisma.schedule.update).toHaveBeenCalledWith({
        where: { id: 'sched-1' },
        data: { roomId: 'room-2' },
      });
      expect(result.roomId).toBe('room-2');
    });

    it('deve lançar ConflictException ao detectar choque de sala', async () => {
      mockPrisma.schedule.findUnique.mockResolvedValue(existing);
      mockPrisma.schedule.findFirst.mockResolvedValueOnce({
        id: 'other',
        classGroup: { code: 'T9' },
      });

      await expect(
        service.update('sched-1', {
          startTime: new Date('2026-06-16T08:00:00Z'),
          endTime: new Date('2026-06-16T12:00:00Z'),
        }),
      ).rejects.toThrow(ConflictException);
      expect(mockPrisma.schedule.update).not.toHaveBeenCalled();
    });
  });

  describe('postponeClass', () => {
    it('deve emitir evento de alteração de data final após adiamento', async () => {
      const rule = { id: 'rule-1', rootRuleId: null };
      mockPrisma.schedule.findUnique
        .mockResolvedValueOnce({
          id: 'sched-1',
          classGroupId: 'cg-1',
          rule,
        })
        .mockResolvedValueOnce({
          id: 'sched-new',
          ruleId: 'rule-1',
          endTime: new Date('2026-09-01T12:00:00Z'),
        });

      mockPrisma.$transaction.mockImplementation(
        (fn: (tx: unknown) => Promise<unknown>) => fn(mockPrisma),
      );

      mockPrisma.schedule.findFirst.mockResolvedValue({
        endTime: new Date('2026-09-01T12:00:00Z'),
      });

      vi.spyOn(service as never, 'postponeClassInTransaction' as never).mockResolvedValue({
        id: 'sched-new',
        ruleId: 'rule-1',
      } as never);

      await service.postponeClass('sched-1', 'Feriado');

      expect(eventEmitter.emit).toHaveBeenCalledWith(
        RULE_EVENTS.END_DATE_CHANGED,
        expect.objectContaining({
          ruleId: 'rule-1',
          classGroupId: 'cg-1',
        }),
      );
    });
  });
});

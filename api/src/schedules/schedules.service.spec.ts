import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchedulesService } from './schedules.service';
import { ScheduleGeneratorService } from './schedule-generator.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

type MockScheduleConflict = { id: string; classGroup: { code: string } };

describe('SchedulesService', () => {
  let service: SchedulesService;
  let prismaService: PrismaService;

  const mockPrisma = {
    schedule: {
      create: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
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
    // Arrange
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
});

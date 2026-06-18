import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { ScheduleGeneratorService } from './schedule-generator.service';
import { ScheduleConflictService } from './conflict/schedule-conflict.service';
import { ScheduleRuleLifecycleService } from './rules/schedule-rule-lifecycle.service';
import { SchedulePostponeService } from './reschedule/schedule-postpone.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

describe('SchedulesService', () => {
  let service: SchedulesService;
  let conflictService: ScheduleConflictService;

  const mockPrisma = {
    schedule: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      createMany: vi.fn(),
    },
    subject: {
      findUnique: vi.fn(),
    },
    scheduleRule: {
      create: vi.fn(),
      update: vi.fn(),
    },
    $transaction: vi.fn(),
  };

  const mockGeneratorService = {
    generateProjections: vi.fn(),
  };

  const mockConflictService = {
    assertNoScheduleConflicts: vi.fn(),
  };

  const mockRuleLifecycleService = {
    migrateRulePattern: vi.fn(),
    publishRule: vi.fn(),
    resolveDependencyStartDate: vi.fn(),
  };

  const mockPostponeService = {
    postponeClass: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ScheduleGeneratorService, useValue: mockGeneratorService },
        { provide: ScheduleConflictService, useValue: mockConflictService },
        {
          provide: ScheduleRuleLifecycleService,
          useValue: mockRuleLifecycleService,
        },
        { provide: SchedulePostponeService, useValue: mockPostponeService },
      ],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
    conflictService = module.get<ScheduleConflictService>(
      ScheduleConflictService,
    );
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

    it('deve criar uma aula após validar conflitos', async () => {
      const mockCreated = { id: 'sched-123', ...createDto };
      mockConflictService.assertNoScheduleConflicts.mockResolvedValue(
        undefined,
      );
      mockPrisma.schedule.create.mockResolvedValue(mockCreated);

      const result = await service.create(createDto);

      expect(
        vi.spyOn(conflictService, 'assertNoScheduleConflicts'),
      ).toHaveBeenCalledWith({
        startTime: new Date(createDto.startTime),
        endTime: new Date(createDto.endTime),
        roomId: createDto.roomId,
        professorId: createDto.professorId,
      });
      expect(result).toEqual(mockCreated);
    });

    it('deve propagar erro de conflito do serviço de validação', async () => {
      mockConflictService.assertNoScheduleConflicts.mockRejectedValue(
        new ConflictException('Choque de Sala'),
      );

      await expect(service.create(createDto)).rejects.toThrow(
        ConflictException,
      );
      expect(mockPrisma.schedule.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('deve filtrar aulas que se sobrepõem ao intervalo informado', async () => {
      mockPrisma.schedule.findMany.mockResolvedValue([]);

      const result = await service.findAll({
        start: '2026-06-01',
        end: '2026-06-30',
      });

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
      expect(result).toEqual({ data: [] });
    });

    it('deve paginar resultados quando limit for informado', async () => {
      mockPrisma.schedule.findMany.mockResolvedValue([
        { id: '1', startTime: new Date('2026-06-01T08:00:00Z') },
        { id: '2', startTime: new Date('2026-06-02T08:00:00Z') },
        { id: '3', startTime: new Date('2026-06-03T08:00:00Z') },
      ]);

      const result = await service.findAll({ limit: 2 });

      expect(mockPrisma.schedule.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ take: 3 }),
      );
      expect(result.data).toHaveLength(2);
      expect(result.meta).toEqual({
        limit: 2,
        hasMore: true,
        nextCursor: new Date('2026-06-02T08:00:00Z').toISOString(),
      });
    });
  });

  describe('postponeClass', () => {
    it('deve delegar adiamento ao SchedulePostponeService', async () => {
      const response = { message: 'ok', newSchedule: { id: 'new' } };
      mockPostponeService.postponeClass.mockResolvedValue(response);

      const result = await service.postponeClass('sched-1', 'Feriado');

      expect(mockPostponeService.postponeClass).toHaveBeenCalledWith(
        'sched-1',
        'Feriado',
        undefined,
        undefined,
      );
      expect(result).toEqual(response);
    });
  });

  describe('migrateRulePattern', () => {
    it('deve delegar migração ao ScheduleRuleLifecycleService', async () => {
      const dto = { transitionDate: '2026-07-01' };
      mockRuleLifecycleService.migrateRulePattern.mockResolvedValue({
        message: 'ok',
        newRuleId: 'rule-2',
      });

      const result = await service.migrateRulePattern('rule-1', dto as never);

      expect(mockRuleLifecycleService.migrateRulePattern).toHaveBeenCalledWith(
        'rule-1',
        dto,
      );
      expect(result.newRuleId).toBe('rule-2');
    });
  });

  describe('generateBulk', () => {
    const dto = {
      classGroupId: 'cg-1',
      subjectId: 'subj-1',
      professorId: 'prof-1',
      roomId: 'room-1',
      startDate: new Date('2026-06-01'),
      daysOfWeek: [1, 3],
      startTimeStr: '08:00',
      endTimeStr: '10:00',
    };

    it('deve gerar aulas e retornar metadados da regra', async () => {
      mockPrisma.subject.findUnique.mockResolvedValue({
        id: 'subj-1',
        hours: 8,
      });
      mockPrisma.schedule.findMany.mockResolvedValue([]);
      mockGeneratorService.generateProjections.mockResolvedValue([
        {
          startTime: new Date('2026-06-02T11:00:00.000Z'),
          endTime: new Date('2026-06-02T13:00:00.000Z'),
        },
      ]);
      mockPrisma.$transaction.mockImplementation(
        async (fn: (tx: typeof mockPrisma) => Promise<unknown>) => {
          mockPrisma.scheduleRule.create.mockResolvedValue({ id: 'rule-1' });
          mockPrisma.schedule.createMany.mockResolvedValue({ count: 1 });
          return fn(mockPrisma);
        },
      );

      const result = await service.generateBulk(dto);

      expect(result.ruleId).toBe('rule-1');
      expect(result.generatedCount).toBe(1);
      expect(result.lastClassEndDate).toEqual(
        new Date('2026-06-02T13:00:00.000Z'),
      );
    });

    it('deve usar resolveDependencyStartDate quando dependsOnRuleId existir', async () => {
      mockPrisma.subject.findUnique.mockResolvedValue({
        id: 'subj-1',
        hours: 4,
      });
      mockRuleLifecycleService.resolveDependencyStartDate.mockResolvedValue(
        new Date('2026-06-10T00:00:00.000Z'),
      );
      mockPrisma.schedule.findMany.mockResolvedValue([]);
      mockGeneratorService.generateProjections.mockResolvedValue([
        {
          startTime: new Date('2026-06-11T11:00:00.000Z'),
          endTime: new Date('2026-06-11T13:00:00.000Z'),
        },
      ]);
      mockPrisma.$transaction.mockImplementation(
        async (fn: (tx: typeof mockPrisma) => Promise<unknown>) => {
          mockPrisma.scheduleRule.create.mockResolvedValue({ id: 'rule-2' });
          mockPrisma.schedule.createMany.mockResolvedValue({ count: 1 });
          return fn(mockPrisma);
        },
      );

      await service.generateBulk({
        ...dto,
        dependsOnRuleId: 'rule-1',
      });

      expect(
        mockRuleLifecycleService.resolveDependencyStartDate,
      ).toHaveBeenCalledWith('rule-1');
    });
  });
});

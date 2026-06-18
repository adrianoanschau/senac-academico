import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ScheduleRuleLifecycleService } from './schedule-rule-lifecycle.service';
import { ScheduleGeneratorService } from '../schedule-generator.service';
import { PrismaService } from '@/prisma/prisma.service';
import { ClassStatus } from '@/prisma/generated';
import { RULE_EVENTS } from '../events/rule-end-date-changed.event';

describe('ScheduleRuleLifecycleService', () => {
  let service: ScheduleRuleLifecycleService;
  let eventEmitter: EventEmitter2;

  const mockPrisma = {
    scheduleRule: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    schedule: {
      deleteMany: vi.fn(),
      findMany: vi.fn(),
      findFirst: vi.fn(),
      updateMany: vi.fn(),
      createMany: vi.fn(),
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
        ScheduleRuleLifecycleService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ScheduleGeneratorService, useValue: mockGeneratorService },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<ScheduleRuleLifecycleService>(
      ScheduleRuleLifecycleService,
    );
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  describe('publishRule', () => {
    it('deve efetivar aulas PLANNED da família de regras', async () => {
      mockPrisma.scheduleRule.findUnique.mockResolvedValue({
        id: 'rule-1',
        rootRuleId: null,
      });
      mockPrisma.schedule.updateMany.mockResolvedValue({ count: 5 });

      const result = await service.publishRule('rule-1');

      expect(mockPrisma.schedule.updateMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          status: { in: [ClassStatus.PLANNED] },
        }),
        data: { status: ClassStatus.SCHEDULED },
      });
      expect(result.count).toBe(5);
    });

    it('deve lançar NotFoundException quando regra não existir', async () => {
      mockPrisma.scheduleRule.findUnique.mockResolvedValue(null);

      await expect(service.publishRule('missing')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('migrateRulePattern', () => {
    it('deve migrar padrão, gerar aulas e emitir evento de domino', async () => {
      const oldRule = {
        id: 'rule-1',
        rootRuleId: null,
        classGroupId: 'cg-1',
        subjectId: 'subj-1',
        professorId: 'prof-1',
        roomId: 'room-1',
        daysOfWeek: [1, 3],
        startTimeStr: '08:00',
        endTimeStr: '10:00',
        totalHours: 8,
      };

      const newRule = { ...oldRule, id: 'rule-2', totalHours: 6 };
      const lastEnd = new Date('2026-07-01T13:00:00.000Z');

      mockPrisma.scheduleRule.findUnique.mockResolvedValue(oldRule);
      mockPrisma.schedule.deleteMany.mockResolvedValue({ count: 2 });
      mockPrisma.schedule.findMany.mockResolvedValue([]);
      mockPrisma.scheduleRule.create.mockResolvedValue(newRule);
      mockGeneratorService.generateProjections.mockResolvedValue([
        {
          startTime: new Date('2026-07-01T11:00:00.000Z'),
          endTime: lastEnd,
        },
      ]);
      mockPrisma.schedule.createMany.mockResolvedValue({ count: 1 });
      mockPrisma.$transaction.mockImplementation(
        async (fn: (tx: typeof mockPrisma) => Promise<unknown>) =>
          fn(mockPrisma),
      );

      const result = await service.migrateRulePattern('rule-1', {
        transitionDate: '2026-07-01',
      } as never);

      expect(result.newRuleId).toBe('rule-2');
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        RULE_EVENTS.END_DATE_CHANGED,
        expect.objectContaining({
          ruleId: 'rule-1',
          classGroupId: 'cg-1',
        }),
      );
    });
  });

  describe('resolveDependencyStartDate', () => {
    it('deve falhar quando não houver aula predecessora', async () => {
      mockPrisma.schedule.findFirst.mockResolvedValue(null);

      await expect(
        service.resolveDependencyStartDate('rule-1'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});

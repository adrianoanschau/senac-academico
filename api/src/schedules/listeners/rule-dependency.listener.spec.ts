import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RuleDependencyListener } from './rule-dependency.listener';
import { PrismaService } from '@/prisma/prisma.service';
import { SchedulesService } from '../schedules.service';
import { RuleEndDateChangedEvent } from '../events/rule-end-date-changed.event';
import { ClassStatus } from '@/prisma/generated';
import { dayAfterInScheduleTz } from '../utils/schedule-date.utils';
import { ruleFamilyWhere } from '../utils/schedule-rule.utils';

describe('RuleDependencyListener', () => {
  let listener: RuleDependencyListener;
  let prismaService: PrismaService;
  let schedulesService: SchedulesService;

  const mockPrisma = {
    scheduleRule: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
    },
    schedule: {
      deleteMany: vi.fn(),
      findMany: vi.fn(),
    },
  };

  const mockSchedulesService = {
    generateBulk: vi.fn(),
  };

  const mockEventEmitter = {
    emit: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RuleDependencyListener,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: SchedulesService, useValue: mockSchedulesService },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    listener = module.get<RuleDependencyListener>(RuleDependencyListener);
    prismaService = module.get<PrismaService>(PrismaService);
    schedulesService = module.get<SchedulesService>(SchedulesService);
  });

  describe('handleRuleEndDateChanged', () => {
    const event = new RuleEndDateChangedEvent(
      'rule-1',
      new Date('2026-06-15T12:00:00Z'),
      'class-1',
    );

    it('deve retornar precocemente se não houver regra dependente (Caminho Feliz - Fim da cadeia)', async () => {
      mockPrisma.scheduleRule.findFirst.mockResolvedValue(null);

      await listener.handleRuleEndDateChanged(event);

      expect(
        vi.spyOn(prismaService.scheduleRule, 'findFirst'),
      ).toHaveBeenCalledWith({
        where: { dependsOnRuleId: 'rule-1' },
      });
      expect(
        vi.spyOn(prismaService.schedule, 'deleteMany'),
      ).not.toHaveBeenCalled();
      expect(vi.spyOn(schedulesService, 'generateBulk')).not.toHaveBeenCalled();
    });

    it('deve recalcular e gerar novas aulas quando existir regra dependente com carga horária restante (Caminho Feliz)', async () => {
      const dependentRule = {
        id: 'rule-2',
        classGroupId: 'class-1',
        subjectId: 'subj-2',
        professorId: 'prof-2',
        roomId: 'room-2',
        daysOfWeek: [1, 3],
        startTimeStr: '08:00',
        endTimeStr: '10:00',
        totalHours: 10,
        rootRuleId: null,
      };

      mockPrisma.scheduleRule.findFirst.mockResolvedValue(dependentRule);
      mockPrisma.scheduleRule.findUnique.mockResolvedValue(null);
      mockPrisma.schedule.deleteMany.mockResolvedValue({ count: 2 });
      mockPrisma.schedule.findMany.mockResolvedValue([
        {
          startTime: new Date('2026-06-01T08:00:00Z'),
          endTime: new Date('2026-06-01T10:00:00Z'),
        },
        {
          startTime: new Date('2026-06-03T08:00:00Z'),
          endTime: new Date('2026-06-03T10:00:00Z'),
        },
      ]);

      mockSchedulesService.generateBulk.mockResolvedValue({
        ruleId: 'rule-2',
        generatedCount: 3,
        lastClassEndDate: new Date('2026-06-20T10:00:00Z'),
      });

      await listener.handleRuleEndDateChanged(event);

      expect(
        vi.spyOn(prismaService.schedule, 'deleteMany'),
      ).toHaveBeenCalledWith({
        where: ruleFamilyWhere('rule-2', [
          ClassStatus.PLANNED,
          ClassStatus.SCHEDULED,
        ]),
      });

      expect(vi.spyOn(schedulesService, 'generateBulk')).toHaveBeenCalledWith(
        expect.objectContaining({
          classGroupId: 'class-1',
          subjectId: 'subj-2',
          dependsOnRuleId: 'rule-1',
          existingRuleId: 'rule-2',
          remainingHours: 6,
          startDate: dayAfterInScheduleTz(event.newEndDate),
        }),
      );

      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        'rule.end_date.changed',
        expect.objectContaining({
          ruleId: 'rule-2',
          classGroupId: 'class-1',
        }),
      );
    });

    it('não deve chamar generateBulk se a regra dependente já tiver consumido toda sua carga (Caminho Triste)', async () => {
      const dependentRule = { id: 'rule-3', totalHours: 4, rootRuleId: null };

      mockPrisma.scheduleRule.findFirst.mockResolvedValue(dependentRule);
      mockPrisma.scheduleRule.findUnique.mockResolvedValue(null);
      mockPrisma.schedule.deleteMany.mockResolvedValue({ count: 0 });
      mockPrisma.schedule.findMany.mockResolvedValue([
        {
          startTime: new Date('2026-06-01T08:00:00Z'),
          endTime: new Date('2026-06-01T10:00:00Z'),
        },
        {
          startTime: new Date('2026-06-03T08:00:00Z'),
          endTime: new Date('2026-06-03T10:00:00Z'),
        },
      ]);

      await listener.handleRuleEndDateChanged(event);

      expect(vi.spyOn(schedulesService, 'generateBulk')).not.toHaveBeenCalled();
    });
  });
});

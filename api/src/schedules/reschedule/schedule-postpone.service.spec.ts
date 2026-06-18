import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchedulePostponeService } from './schedule-postpone.service';
import { ScheduleConflictService } from '../conflict/schedule-conflict.service';
import { ScheduleRuleLifecycleService } from '../rules/schedule-rule-lifecycle.service';
import { PrismaService } from '@/prisma/prisma.service';
import { RULE_EVENTS } from '../events/rule-end-date-changed.event';

describe('SchedulePostponeService', () => {
  let service: SchedulePostponeService;
  let eventEmitter: EventEmitter2;

  const mockPrisma = {
    schedule: {
      findUnique: vi.fn(),
    },
    $transaction: vi.fn(),
  };

  const mockConflictService = {
    findPostponeConflict: vi.fn(),
  };

  const mockRuleLifecycleService = {
    findRuleFamilyLastClass: vi.fn(),
  };

  const mockEventEmitter = {
    emit: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulePostponeService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ScheduleConflictService, useValue: mockConflictService },
        {
          provide: ScheduleRuleLifecycleService,
          useValue: mockRuleLifecycleService,
        },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<SchedulePostponeService>(SchedulePostponeService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('deve emitir evento de alteração de data final após adiamento', async () => {
    const rule = { id: 'rule-1', rootRuleId: null };
    mockPrisma.schedule.findUnique.mockResolvedValueOnce({
      id: 'sched-1',
      classGroupId: 'cg-1',
      rule,
    });

    mockPrisma.$transaction.mockImplementation(
      (fn: (tx: unknown) => Promise<unknown>) => fn(mockPrisma),
    );

    mockRuleLifecycleService.findRuleFamilyLastClass.mockResolvedValue({
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

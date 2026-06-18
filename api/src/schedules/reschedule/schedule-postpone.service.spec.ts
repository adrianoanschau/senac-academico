import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClassStatus } from '@/prisma/generated';
import { SchedulePostponeService } from './schedule-postpone.service';
import { ScheduleConflictService } from '../conflict/schedule-conflict.service';
import { ScheduleRuleLifecycleService } from '../rules/schedule-rule-lifecycle.service';
import { PrismaService } from '@/prisma/prisma.service';
import { RULE_EVENTS } from '../events/rule-end-date-changed.event';
import { SCHEDULE_ERROR_ACTIONS } from '../constants/schedule-error.constants';

describe('SchedulePostponeService', () => {
  let service: SchedulePostponeService;
  let eventEmitter: EventEmitter2;
  let conflictService: ScheduleConflictService;

  const mockTx = {
    schedule: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
      create: vi.fn(),
    },
    scheduleRule: {
      findFirst: vi.fn(),
    },
  };

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

  const baseRule = {
    id: 'rule-1',
    rootRuleId: null,
    classGroupId: 'cg-1',
    subjectId: 'subj-1',
    professorId: 'prof-1',
    roomId: 'room-1',
    daysOfWeek: [1, 3],
    startTimeStr: '08:00',
    endTimeStr: '10:00',
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
    conflictService = module.get<ScheduleConflictService>(ScheduleConflictService);

    mockPrisma.$transaction.mockImplementation(
      (fn: (tx: typeof mockTx) => Promise<unknown>) => fn(mockTx),
    );
  });

  it('deve emitir evento de alteração de data final após adiamento', async () => {
    mockPrisma.schedule.findUnique.mockResolvedValueOnce({
      id: 'sched-1',
      classGroupId: 'cg-1',
      rule: baseRule,
    });

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

  it('deve exigir confirmação quando houver conflito com data fixa', async () => {
    mockTx.schedule.findUnique.mockResolvedValue({
      id: 'sched-1',
      status: ClassStatus.SCHEDULED,
      endTime: new Date('2026-06-15T10:00:00Z'),
      rule: baseRule,
    });

    mockConflictService.findPostponeConflict.mockResolvedValue({
      id: 'conflict-1',
      subject: { name: 'Java' },
      rule: baseRule,
    });

    await expect(
      service['postponeClassInTransaction'](
        mockTx as never,
        'sched-1',
        'Feriado',
        '2026-08-01',
        false,
        new Set<string>(),
      ),
    ).rejects.toMatchObject({
      response: {
        action: SCHEDULE_ERROR_ACTIONS.CONFIRM_REQUIRED,
        conflictingSubject: 'Java',
      },
    });
  });

  it('deve detectar ciclo na cascata de adiamentos', async () => {
    await expect(
      service['postponeClassInTransaction'](
        mockTx as never,
        'sched-1',
        'Feriado',
        undefined,
        true,
        new Set(['sched-1']),
      ),
    ).rejects.toThrow('Ciclo detectado');
  });

  it('deve reagendar aula PLANNED removendo o registro original', async () => {
    mockTx.schedule.findUnique.mockResolvedValue({
      id: 'sched-1',
      status: ClassStatus.PLANNED,
      endTime: new Date('2026-06-15T10:00:00Z'),
      rule: baseRule,
    });
    mockConflictService.findPostponeConflict.mockResolvedValue(null);
    mockTx.schedule.findFirst.mockResolvedValue(null);
    mockTx.schedule.create.mockResolvedValue({ id: 'sched-new' });

    await service['postponeClassInTransaction'](
      mockTx as never,
      'sched-1',
      'Feriado',
      undefined,
      false,
      new Set<string>(),
    );

    expect(mockTx.schedule.delete).toHaveBeenCalledWith({
      where: { id: 'sched-1' },
    });
    expect(mockTx.schedule.create).toHaveBeenCalled();
    expect(conflictService.findPostponeConflict).toHaveBeenCalled();
  });
});

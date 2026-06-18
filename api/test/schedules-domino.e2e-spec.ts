import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ClassStatus } from '@/prisma/generated';
import { PrismaService } from '@/prisma/prisma.service';

import { RuleEndDateChangedEvent } from '../src/schedules/events/rule-end-date-changed.event';
import { RuleDependencyListener } from '../src/schedules/listeners/rule-dependency.listener';
import { SchedulesService } from '../src/schedules/schedules.service';

describe('Schedules domino flow (e2e)', () => {
  let listener: RuleDependencyListener;
  let schedulesService: SchedulesService;
  let moduleFixture: TestingModule;

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

  beforeEach(async () => {
    vi.clearAllMocks();

    const testingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      providers: [
        RuleDependencyListener,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: SchedulesService, useValue: mockSchedulesService },
      ],
    }).compile();

    await testingModule.init();

    moduleFixture = testingModule;
    listener = testingModule.get(RuleDependencyListener);
    schedulesService = testingModule.get(SchedulesService);
  });

  afterEach(async () => {
    await moduleFixture?.close();
  });

  it('deve propagar adiamento via evento até recalcular regra dependente', async () => {
    const dependentRule = {
      id: 'rule-2',
      classGroupId: 'class-1',
      subjectId: 'subj-2',
      professorId: 'prof-2',
      roomId: 'room-2',
      daysOfWeek: [1, 3],
      startTimeStr: '08:00',
      endTimeStr: '10:00',
      totalHours: 8,
      rootRuleId: null,
    };

    mockPrisma.scheduleRule.findFirst
      .mockResolvedValueOnce(dependentRule)
      .mockResolvedValue(null);
    mockPrisma.scheduleRule.findUnique.mockResolvedValue(null);
    mockPrisma.schedule.deleteMany.mockResolvedValue({ count: 1 });
    mockPrisma.schedule.findMany.mockResolvedValue([]);
    mockSchedulesService.generateBulk.mockResolvedValue({
      ruleId: 'rule-2',
      generatedCount: 4,
      lastClassEndDate: new Date('2026-07-20T10:00:00.000Z'),
    });

    const event = new RuleEndDateChangedEvent(
      'rule-1',
      new Date('2026-06-15T12:00:00.000Z'),
      'class-1',
    );

    await listener.handleRuleEndDateChanged(event);

    expect(mockSchedulesService.generateBulk).toHaveBeenCalledWith(
      expect.objectContaining({
        dependsOnRuleId: 'rule-1',
        existingRuleId: 'rule-2',
        classGroupId: 'class-1',
      }),
    );

    expect(mockPrisma.schedule.deleteMany).toHaveBeenCalledWith({
      where: expect.objectContaining({
        status: { in: [ClassStatus.PLANNED, ClassStatus.SCHEDULED] },
      }),
    });

    expect(schedulesService.generateBulk).toHaveBeenCalledTimes(1);
  });
});

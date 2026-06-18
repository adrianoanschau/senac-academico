import { describe, it, expect, vi } from 'vitest';
import { ClassStatus } from '@/prisma/generated';
import {
  buildScheduleProjections,
  persistGeneratedScheduleBatch,
  persistPlannedSchedules,
  upsertRuleForGeneration,
} from './schedule-generation.utils';

describe('schedule-generation.utils', () => {
  const projectionParams = {
    from: new Date('2026-06-01T00:00:00.000Z'),
    classGroupId: 'cg-1',
    professorId: 'prof-1',
    roomId: 'room-1',
    daysOfWeek: [1, 3],
    startTimeStr: '08:00',
    endTimeStr: '10:00',
    totalHours: 8,
  };

  it('deve buscar ocupados e gerar projeções', async () => {
    const findMany = vi.fn().mockResolvedValue([]);
    const generateProjections = vi.fn().mockResolvedValue([
      {
        startTime: new Date('2026-06-02T11:00:00.000Z'),
        endTime: new Date('2026-06-02T13:00:00.000Z'),
      },
    ]);

    const projections = await buildScheduleProjections(
      { schedule: { findMany } } as never,
      { generateProjections } as never,
      projectionParams,
    );

    expect(findMany).toHaveBeenCalled();
    expect(generateProjections).toHaveBeenCalledWith(
      projectionParams.from,
      projectionParams.daysOfWeek,
      projectionParams.startTimeStr,
      projectionParams.endTimeStr,
      projectionParams.totalHours,
      [],
    );
    expect(projections).toHaveLength(1);
  });

  it('deve criar regra e persistir aulas planejadas', async () => {
    const create = vi.fn().mockResolvedValue({ id: 'rule-1' });
    const createMany = vi.fn().mockResolvedValue({ count: 1 });

    const result = await persistGeneratedScheduleBatch(
      {
        scheduleRule: { create, update: vi.fn() },
        schedule: { createMany },
      } as never,
      {
        classGroupId: 'cg-1',
        subjectId: 'subj-1',
        professorId: 'prof-1',
        roomId: 'room-1',
        daysOfWeek: [1, 3],
        startTimeStr: '08:00',
        endTimeStr: '10:00',
        totalHours: 8,
      },
      [
        {
          startTime: new Date('2026-06-02T11:00:00.000Z'),
          endTime: new Date('2026-06-02T13:00:00.000Z'),
        },
      ],
    );

    expect(create).toHaveBeenCalled();
    expect(createMany).toHaveBeenCalledWith({
      data: [
        expect.objectContaining({
          ruleId: 'rule-1',
          status: ClassStatus.PLANNED,
        }),
      ],
    });
    expect(result.ruleId).toBe('rule-1');
    expect(result.generatedCount).toBe(1);
  });

  it('deve atualizar regra existente sem criar nova', async () => {
    const update = vi.fn().mockResolvedValue({ id: 'rule-2' });
    const create = vi.fn();

    const ruleId = await upsertRuleForGeneration(
      {
        scheduleRule: { create, update },
      } as never,
      {
        existingRuleId: 'rule-2',
        classGroupId: 'cg-1',
        subjectId: 'subj-1',
        professorId: 'prof-1',
        roomId: 'room-1',
        daysOfWeek: [1, 3],
        startTimeStr: '08:00',
        endTimeStr: '10:00',
        totalHours: 8,
        dependsOnRuleId: 'rule-1',
      },
    );

    expect(ruleId).toBe('rule-2');
    expect(update).toHaveBeenCalled();
    expect(create).not.toHaveBeenCalled();
  });

  it('deve retornar contagem zero quando não houver projeções', async () => {
    const result = await persistPlannedSchedules(
      {
        schedule: { createMany: vi.fn() },
      } as never,
      {
        id: 'rule-1',
        classGroupId: 'cg-1',
        subjectId: 'subj-1',
        professorId: 'prof-1',
        roomId: 'room-1',
      },
      [],
    );

    expect(result.generatedCount).toBe(0);
    expect(result.lastClassEndDate).toBeNull();
  });
});

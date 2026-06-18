import { describe, expect, it, vi } from 'vitest';

import { ClassStatus } from '@/prisma/generated';

import {
  computeRuleRemainingHours,
  dependentRuleWhere,
  mapSlotsToPlannedSchedules,
  resolveRuleRootId,
  RULE_DOMINO_CONSUMED_STATUSES,
  RULE_MIGRATE_CONSUMED_STATUSES,
  ruleFamilyWhere,
} from './schedule-rule.utils';

describe('schedule-rule.utils', () => {
  it('deve resolver o id raiz da família de regras', () => {
    expect(resolveRuleRootId({ id: 'child', rootRuleId: 'root' })).toBe('root');
    expect(resolveRuleRootId({ id: 'root', rootRuleId: null })).toBe('root');
  });

  it('deve montar filtro de família de regras', () => {
    expect(ruleFamilyWhere('root-1', [ClassStatus.PLANNED])).toEqual({
      OR: [{ ruleId: 'root-1' }, { rule: { rootRuleId: 'root-1' } }],
      status: { in: [ClassStatus.PLANNED] },
    });
  });

  it('deve localizar dependentes pelo predecessor e alternativa', () => {
    expect(dependentRuleWhere('root-1', 'child-1')).toEqual({
      OR: [{ dependsOnRuleId: 'root-1' }, { dependsOnRuleId: 'child-1' }],
    });
  });

  it('deve mapear slots para aulas PLANNED', () => {
    const start = new Date('2026-06-02T11:00:00.000Z');
    const end = new Date('2026-06-02T13:00:00.000Z');

    expect(
      mapSlotsToPlannedSchedules(
        {
          id: 'rule-1',
          classGroupId: 'cg-1',
          subjectId: 'subj-1',
          professorId: 'prof-1',
          roomId: 'room-1',
        },
        [{ startTime: start, endTime: end }],
      ),
    ).toEqual([
      {
        classGroupId: 'cg-1',
        subjectId: 'subj-1',
        professorId: 'prof-1',
        roomId: 'room-1',
        startTime: start,
        endTime: end,
        ruleId: 'rule-1',
        status: ClassStatus.PLANNED,
      },
    ]);
  });

  it('deve calcular carga restante da família com statuses explícitos', async () => {
    const findMany = vi.fn().mockResolvedValue([
      {
        startTime: new Date('2026-06-01T11:00:00.000Z'),
        endTime: new Date('2026-06-01T13:00:00.000Z'),
      },
    ]);
    const findUnique = vi.fn().mockResolvedValue({ totalHours: 10 });

    const remaining = await computeRuleRemainingHours(
      {
        scheduleRule: { findUnique },
        schedule: { findMany },
      } as never,
      { totalHours: 4, rootRuleId: 'root-1' },
      'root-1',
      RULE_DOMINO_CONSUMED_STATUSES,
    );

    expect(findMany).toHaveBeenCalledWith({
      where: ruleFamilyWhere('root-1', RULE_DOMINO_CONSUMED_STATUSES),
    });
    expect(remaining).toBe(8);
  });

  it('deve expor conjuntos de status distintos para migrate e domino', () => {
    expect(RULE_MIGRATE_CONSUMED_STATUSES).toEqual([
      ClassStatus.COMPLETED,
      ClassStatus.SCHEDULED,
      ClassStatus.PLANNED,
    ]);
    expect(RULE_DOMINO_CONSUMED_STATUSES).toEqual([ClassStatus.COMPLETED]);
  });
});

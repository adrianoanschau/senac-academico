import { describe, it, expect } from 'vitest';
import { ClassStatus } from '@/prisma/generated';
import {
  dependentRuleWhere,
  resolveRuleRootId,
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
      OR: [
        { dependsOnRuleId: 'root-1' },
        { dependsOnRuleId: 'child-1' },
      ],
    });
  });
});

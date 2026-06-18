import { describe, expect, it } from 'vitest';

import { formatRuleDependencyLog } from './rule-dependency.logger';

describe('rule-dependency.logger', () => {
  it('deve formatar log estruturado em JSON', () => {
    const output = formatRuleDependencyLog('domino.received', {
      ruleId: 'rule-1',
      classGroupId: 'cg-1',
    });

    const parsed = JSON.parse(output) as Record<string, unknown>;

    expect(parsed.component).toBe('RuleDependencyListener');
    expect(parsed.action).toBe('domino.received');
    expect(parsed.ruleId).toBe('rule-1');
    expect(parsed.timestamp).toBeTypeOf('string');
  });
});

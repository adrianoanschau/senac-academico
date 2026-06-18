import { describe, it, expect, vi } from 'vitest';
import {
  RULE_EVENTS,
  RuleEndDateChangedEvent,
  emitRuleEndDateChanged,
} from './rule-end-date-changed.event';

describe('rule-end-date-changed.event', () => {
  it('deve emitir evento padronizado de alteração de data final', () => {
    const emitter = { emit: vi.fn() };
    const newEndDate = new Date('2026-07-01T13:00:00.000Z');

    emitRuleEndDateChanged(emitter, 'rule-1', newEndDate, 'cg-1');

    expect(emitter.emit).toHaveBeenCalledWith(
      RULE_EVENTS.END_DATE_CHANGED,
      new RuleEndDateChangedEvent('rule-1', newEndDate, 'cg-1'),
    );
  });
});

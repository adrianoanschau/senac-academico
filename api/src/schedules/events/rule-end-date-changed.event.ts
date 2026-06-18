import { EventEmitter2 } from '@nestjs/event-emitter';

export const RULE_EVENTS = {
  END_DATE_CHANGED: 'rule.end_date.changed',
} as const;

export class RuleEndDateChangedEvent {
  constructor(
    public readonly ruleId: string,
    public readonly newEndDate: Date,
    public readonly classGroupId: string,
  ) {}
}

export function emitRuleEndDateChanged(
  emitter: Pick<EventEmitter2, 'emit'>,
  ruleId: string,
  newEndDate: Date,
  classGroupId: string,
): void {
  emitter.emit(
    RULE_EVENTS.END_DATE_CHANGED,
    new RuleEndDateChangedEvent(ruleId, newEndDate, classGroupId),
  );
}

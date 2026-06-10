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

export type RuleDependencyLogAction =
  | 'domino.received'
  | 'domino.chain_end'
  | 'domino.recalculate'
  | 'domino.completed'
  | 'domino.hours_exhausted'
  | 'domino.error';

export function formatRuleDependencyLog(
  action: RuleDependencyLogAction,
  payload: Record<string, unknown>,
): string {
  return JSON.stringify({
    component: 'RuleDependencyListener',
    action,
    timestamp: new Date().toISOString(),
    ...payload,
  });
}

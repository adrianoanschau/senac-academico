export function hoursToMinutes(hours: number): number {
  return Math.round(hours * 60);
}

export function minutesToHours(minutes: number): number {
  return minutes / 60;
}

export function computeScheduleDurationMinutes(
  startTime: Date,
  endTime: Date,
): number {
  return Math.round((endTime.getTime() - startTime.getTime()) / 60_000);
}

export function sumScheduleDurationMinutes(
  classes: Array<{ startTime: Date; endTime: Date }>,
): number {
  return classes.reduce(
    (total, current) =>
      total +
      computeScheduleDurationMinutes(current.startTime, current.endTime),
    0,
  );
}

export function computeRemainingHours(
  totalHours: number,
  consumedMinutes: number,
): number {
  return minutesToHours(
    Math.max(0, hoursToMinutes(totalHours) - consumedMinutes),
  );
}

export function resolveOriginalTotalHours(
  rule: { totalHours: number; rootRuleId: string | null },
  rootRule?: { totalHours: number } | null,
): number {
  if (rule.rootRuleId && rootRule) {
    return rootRule.totalHours;
  }

  return rule.totalHours;
}

export function computeRemainingHoursForClasses(
  rule: { totalHours: number; rootRuleId: string | null },
  classes: Array<{ startTime: Date; endTime: Date }>,
  rootRule?: { totalHours: number } | null,
): number {
  const originalTotalHours = resolveOriginalTotalHours(rule, rootRule);
  const consumedMinutes = sumScheduleDurationMinutes(classes);
  return computeRemainingHours(originalTotalHours, consumedMinutes);
}

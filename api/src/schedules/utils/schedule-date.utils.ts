export const SCHEDULE_TIMEZONE = 'America/Sao_Paulo';

interface ZonedParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

function getZonedParts(
  date: Date,
  timeZone: string = SCHEDULE_TIMEZONE,
): ZonedParts {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value]),
  ) as Record<string, string>;

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

function getTimezoneOffsetMs(date: Date, timeZone: string): number {
  const zoned = getZonedParts(date, timeZone);
  const asUtc = Date.UTC(
    zoned.year,
    zoned.month - 1,
    zoned.day,
    zoned.hour,
    zoned.minute,
    zoned.second,
  );
  return asUtc - date.getTime();
}

function zonedWallClockToDate(parts: {
  year: number;
  month: number;
  day: number;
  hour?: number;
  minute?: number;
  second?: number;
}): Date {
  const utcGuess = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour ?? 0,
    parts.minute ?? 0,
    parts.second ?? 0,
  );
  return new Date(
    utcGuess - getTimezoneOffsetMs(new Date(utcGuess), SCHEDULE_TIMEZONE),
  );
}

export function parseTimeStr(timeStr: string): {
  hour: number;
  minute: number;
} {
  const [hour, minute] = timeStr.split(':').map(Number);
  return { hour, minute };
}

export function dailyClassDurationMinutes(
  startTimeStr: string,
  endTimeStr: string,
): number {
  const start = parseTimeStr(startTimeStr);
  const end = parseTimeStr(endTimeStr);
  return end.hour * 60 + end.minute - (start.hour * 60 + start.minute);
}

export function startOfScheduleDay(date: Date): Date {
  const parts = getZonedParts(date);
  return zonedWallClockToDate({
    year: parts.year,
    month: parts.month,
    day: parts.day,
  });
}

export function dayAfterInScheduleTz(date: Date): Date {
  const parts = getZonedParts(date);
  return zonedWallClockToDate({
    year: parts.year,
    month: parts.month,
    day: parts.day + 1,
  });
}

export function getScheduleWeekday(date: Date): number {
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: SCHEDULE_TIMEZONE,
    weekday: 'short',
  }).format(date);

  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return map[weekday];
}

export function buildScheduleSlotOnDay(
  anchorDate: Date,
  startTimeStr: string,
  endTimeStr: string,
): { startTime: Date; endTime: Date } {
  const parts = getZonedParts(anchorDate);
  const start = parseTimeStr(startTimeStr);
  const end = parseTimeStr(endTimeStr);

  return {
    startTime: zonedWallClockToDate({
      year: parts.year,
      month: parts.month,
      day: parts.day,
      hour: start.hour,
      minute: start.minute,
    }),
    endTime: zonedWallClockToDate({
      year: parts.year,
      month: parts.month,
      day: parts.day,
      hour: end.hour,
      minute: end.minute,
    }),
  };
}

export function buildScheduleSlotWithDuration(
  anchorDate: Date,
  startTimeStr: string,
  durationMinutes: number,
): { startTime: Date; endTime: Date } {
  const { startTime } = buildScheduleSlotOnDay(
    anchorDate,
    startTimeStr,
    startTimeStr,
  );

  return {
    startTime,
    endTime: new Date(startTime.getTime() + durationMinutes * 60_000),
  };
}

export function parseFixedPostponeSlot(
  newDateStr: string,
  rule: { startTimeStr: string; endTimeStr: string },
): { startTime: Date; endTime: Date } {
  const anchor = newDateStr.includes('T')
    ? new Date(newDateStr)
    : zonedWallClockToDate({
        year: Number(newDateStr.slice(0, 4)),
        month: Number(newDateStr.slice(5, 7)),
        day: Number(newDateStr.slice(8, 10)),
        hour: 12,
      });

  return buildScheduleSlotOnDay(anchor, rule.startTimeStr, rule.endTimeStr);
}

export function findFirstRuleOccurrence(
  fromDate: Date,
  daysOfWeek: number[],
  startTimeStr: string,
  endTimeStr: string,
): { startTime: Date; endTime: Date } | null {
  let cursor = startOfScheduleDay(fromDate);

  for (let safety = 0; safety < 730; safety++) {
    const dayOfWeek = getScheduleWeekday(cursor);
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (!isWeekend && daysOfWeek.includes(dayOfWeek)) {
      return buildScheduleSlotOnDay(cursor, startTimeStr, endTimeStr);
    }

    cursor = dayAfterInScheduleTz(cursor);
  }

  return null;
}

export function addScheduleDays(date: Date, days: number): Date {
  const parts = getZonedParts(date);
  return zonedWallClockToDate({
    year: parts.year,
    month: parts.month,
    day: parts.day + days,
  });
}

/** Avança a data em anos civis (mesma semântica de `Date#setFullYear`). */
export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

export interface TimeInterval {
  startTime: Date;
  endTime: Date;
}

/** Verdadeiro quando dois intervalos [start, end) se sobrepõem. */
export function intervalsOverlap(a: TimeInterval, b: TimeInterval): boolean {
  return a.startTime < b.endTime && a.endTime > b.startTime;
}

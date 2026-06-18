import { describe, expect, it } from 'vitest';

import {
  addYears,
  buildScheduleSlotOnDay,
  dayAfterInScheduleTz,
  getScheduleWeekday,
  intervalsOverlap,
  parseFixedPostponeSlot,
  parseTimeStr,
  startOfScheduleDay,
} from './schedule-date.utils';

describe('schedule-date.utils', () => {
  it('deve interpretar horários no fuso America/Sao_Paulo', () => {
    const anchor = new Date('2026-06-15T15:00:00.000Z');
    const slot = buildScheduleSlotOnDay(anchor, '08:00', '10:00');

    const startParts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(slot.startTime);

    expect(startParts).toBe('08:00');
  });

  it('deve calcular o dia seguinte no fuso de agenda', () => {
    const day = startOfScheduleDay(new Date('2026-06-15T15:00:00.000Z'));
    const next = dayAfterInScheduleTz(day);
    const weekday = getScheduleWeekday(next);

    expect(weekday).toBe((getScheduleWeekday(day) + 1) % 7);
  });

  it('deve montar slot fixo de adiamento a partir da data informada', () => {
    const slot = parseFixedPostponeSlot('2026-08-01', {
      startTimeStr: '08:00',
      endTimeStr: '10:00',
    });

    expect(parseTimeStr('08:00')).toEqual({ hour: 8, minute: 0 });
    expect(slot.endTime.getTime()).toBeGreaterThan(slot.startTime.getTime());
  });

  it('deve avançar a data em anos civis', () => {
    const date = new Date('2026-06-01T00:00:00.000Z');
    const next = addYears(date, 1);

    expect(next.getUTCFullYear()).toBe(2027);
    expect(next.getUTCMonth()).toBe(date.getUTCMonth());
    expect(next.getUTCDate()).toBe(date.getUTCDate());
  });

  it('deve detectar sobreposição entre intervalos', () => {
    const morning = {
      startTime: new Date('2026-06-15T08:00:00.000Z'),
      endTime: new Date('2026-06-15T10:00:00.000Z'),
    };
    const overlapping = {
      startTime: new Date('2026-06-15T09:00:00.000Z'),
      endTime: new Date('2026-06-15T11:00:00.000Z'),
    };
    const adjacent = {
      startTime: new Date('2026-06-15T10:00:00.000Z'),
      endTime: new Date('2026-06-15T12:00:00.000Z'),
    };

    expect(intervalsOverlap(morning, overlapping)).toBe(true);
    expect(intervalsOverlap(morning, adjacent)).toBe(false);
  });
});

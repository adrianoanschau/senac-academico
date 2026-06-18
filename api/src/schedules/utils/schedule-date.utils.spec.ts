import { describe, it, expect } from 'vitest';
import {
  buildScheduleSlotOnDay,
  dayAfterInScheduleTz,
  getScheduleWeekday,
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
});

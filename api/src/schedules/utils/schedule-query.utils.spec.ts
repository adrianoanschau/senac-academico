import { describe, it, expect } from 'vitest';
import {
  buildScheduleWhereInput,
  resolveSchedulePageLimit,
} from './schedule-query.utils';
import { SCHEDULES_MAX_PAGE_LIMIT } from '../constants/schedule-query.constants';

describe('schedule-query.utils', () => {
  it('deve montar filtro com cursor de paginação', () => {
    const where = buildScheduleWhereInput({
      cursor: '2026-06-01T00:00:00.000Z',
      limit: 50,
    });

    expect(where.AND).toEqual([
      { startTime: { gt: new Date('2026-06-01T00:00:00.000Z') } },
    ]);
  });

  it('deve limitar paginação ao máximo permitido', () => {
    expect(resolveSchedulePageLimit(1000)).toBe(SCHEDULES_MAX_PAGE_LIMIT);
    expect(resolveSchedulePageLimit(undefined)).toBeUndefined();
  });
});

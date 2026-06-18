import { describe, expect, it, vi } from 'vitest';

import { ClassStatus } from '@/prisma/generated';

import { SCHEDULES_MAX_PAGE_LIMIT } from '../constants/schedule-query.constants';
import { addYears } from './schedule-date.utils';
import {
  buildDateRangeOverlapConditions,
  buildOverlapWhere,
  buildResourceOrConditions,
  buildScheduleWhereInput,
  fetchOccupiedSlots,
  resolveSchedulePageLimit,
} from './schedule-query.utils';

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

  it('deve montar OR de recursos com ids únicos ou múltiplos', () => {
    expect(
      buildResourceOrConditions({
        classGroupId: 'cg-1',
        professorIds: 'prof-1',
        roomIds: 'room-1',
      }),
    ).toEqual([
      { classGroupId: 'cg-1' },
      { professorId: 'prof-1' },
      { roomId: 'room-1' },
    ]);

    expect(
      buildResourceOrConditions({
        classGroupId: 'cg-1',
        professorIds: ['prof-1', 'prof-2'],
        roomIds: ['room-1', 'room-2'],
      }),
    ).toEqual([
      { classGroupId: 'cg-1' },
      { professorId: { in: ['prof-1', 'prof-2'] } },
      { roomId: { in: ['room-1', 'room-2'] } },
    ]);
  });

  it('deve buscar horários ocupados na janela padrão de 1 ano', async () => {
    const from = new Date('2026-06-01T00:00:00.000Z');
    const findMany = vi.fn().mockResolvedValue([]);

    await fetchOccupiedSlots({ schedule: { findMany } } as never, {
      from,
      classGroupId: 'cg-1',
      professorIds: 'prof-1',
      roomIds: 'room-1',
    });

    expect(findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          { classGroupId: 'cg-1' },
          { professorId: 'prof-1' },
          { roomId: 'room-1' },
        ],
        startTime: { gte: from },
        endTime: { lte: addYears(from, 1) },
        status: { in: [ClassStatus.PLANNED, ClassStatus.SCHEDULED] },
      },
      select: { startTime: true, endTime: true },
    });
  });

  it('deve respeitar yearsAhead customizado', async () => {
    const from = new Date('2026-06-01T00:00:00.000Z');
    const findMany = vi.fn().mockResolvedValue([]);

    await fetchOccupiedSlots({ schedule: { findMany } } as never, {
      from,
      yearsAhead: 2,
      classGroupId: 'cg-1',
    });

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          endTime: { lte: addYears(from, 2) },
        }),
      }),
    );
  });

  it('deve montar filtro Prisma de sobreposição de intervalo', () => {
    const slot = {
      startTime: new Date('2026-06-15T08:00:00.000Z'),
      endTime: new Date('2026-06-15T12:00:00.000Z'),
    };

    expect(buildOverlapWhere(slot)).toEqual({
      startTime: { lt: slot.endTime },
      endTime: { gt: slot.startTime },
    });
  });

  it('deve montar condições de sobreposição para intervalo de listagem', () => {
    expect(
      buildDateRangeOverlapConditions(
        '2026-06-01T00:00:00.000Z',
        '2026-06-30T23:59:59.999Z',
      ),
    ).toEqual([
      { startTime: { lt: new Date('2026-06-30T23:59:59.999Z') } },
      { endTime: { gt: new Date('2026-06-01T00:00:00.000Z') } },
    ]);
  });
});

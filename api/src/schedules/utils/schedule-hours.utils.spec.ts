import { describe, it, expect } from 'vitest';
import {
  computeRemainingHours,
  computeRemainingHoursForClasses,
  computeScheduleDurationMinutes,
  hoursToMinutes,
  resolveOriginalTotalHours,
} from './schedule-hours.utils';

describe('schedule-hours.utils', () => {
  it('deve converter horas em minutos sem perder precisão fracionária na soma', () => {
    expect(hoursToMinutes(1.5)).toBe(90);
  });

  it('deve calcular carga restante em horas', () => {
    expect(computeRemainingHours(10, 240)).toBe(6);
  });

  it('deve calcular carga restante a partir das aulas consumidas', () => {
    const classes = [
      {
        startTime: new Date('2026-06-01T11:00:00.000Z'),
        endTime: new Date('2026-06-01T13:00:00.000Z'),
      },
    ];

    expect(
      computeRemainingHoursForClasses(
        { totalHours: 10, rootRuleId: null },
        classes,
      ),
    ).toBe(8);

    expect(
      computeRemainingHoursForClasses(
        { totalHours: 4, rootRuleId: 'root-1' },
        classes,
        { totalHours: 10 },
      ),
    ).toBe(8);
  });

  it('deve usar totalHours da regra raiz quando existir linhagem', () => {
    expect(
      resolveOriginalTotalHours(
        { totalHours: 4, rootRuleId: 'root-1' },
        { totalHours: 10 },
      ),
    ).toBe(10);
  });

  it('deve calcular duração de aula em minutos', () => {
    const minutes = computeScheduleDurationMinutes(
      new Date('2026-06-01T11:00:00.000Z'),
      new Date('2026-06-01T13:00:00.000Z'),
    );

    expect(minutes).toBe(120);
  });
});

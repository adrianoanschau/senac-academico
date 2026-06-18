import { describe, expect, it } from 'vitest';

import { buildScheduleCalendarQueryParams } from './scheduleCalendarParams';

describe('buildScheduleCalendarQueryParams', () => {
  it('deve usar start e end como parâmetros da API', () => {
    const params = buildScheduleCalendarQueryParams({
      startStr: '2026-06-01T00:00:00.000Z',
      endStr: '2026-06-30T23:59:59.999Z',
    });

    expect(params.get('start')).toBe('2026-06-01T00:00:00.000Z');
    expect(params.get('end')).toBe('2026-06-30T23:59:59.999Z');
    expect(params.has('startDate')).toBe(false);
    expect(params.has('endDate')).toBe(false);
  });

  it('deve incluir filtros opcionais do calendário', () => {
    const params = buildScheduleCalendarQueryParams(
      {
        startStr: '2026-06-01T00:00:00.000Z',
        endStr: '2026-06-07T00:00:00.000Z',
      },
      {
        search: 'java',
        status: ['PLANNED', 'SCHEDULED'],
        classGroupId: 'cg-1',
        professorId: 'prof-1',
        roomId: 'room-1',
        subjectId: 'subj-1',
      },
    );

    expect(params.get('search')).toBe('java');
    expect(params.getAll('status')).toEqual(['PLANNED', 'SCHEDULED']);
    expect(params.get('classGroupId')).toBe('cg-1');
    expect(params.get('professorId')).toBe('prof-1');
    expect(params.get('roomId')).toBe('room-1');
    expect(params.get('subjectId')).toBe('subj-1');
  });
});

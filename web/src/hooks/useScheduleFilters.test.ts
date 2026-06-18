import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useScheduleFilters } from './useScheduleFilters';

const apiGet = vi.fn();

vi.mock('../services/api', () => ({
  default: {
    get: (...args: unknown[]) => apiGet(...args),
  },
}));

function mockFilterResponses() {
  apiGet.mockImplementation(
    (endpoint: string, config?: { params?: unknown }) => {
      if (endpoint === '/subjects') {
        const scoped = config?.params;
        return Promise.resolve({
          data: {
            data: scoped
              ? [{ id: 's-scoped', name: 'UC Turma' }]
              : [{ id: 's1', name: 'UC Global' }],
          },
        });
      }
      if (endpoint === '/rooms') {
        return Promise.resolve({
          data: { data: [{ id: 'r1', name: 'Lab 1' }] },
        });
      }
      if (endpoint === '/professors') {
        return Promise.resolve({
          data: { data: [{ id: 'p1', name: 'Prof. Silva' }] },
        });
      }
      if (endpoint === '/class-groups') {
        return Promise.resolve({
          data: { data: [{ id: 'cg-1', name: 'ENF24-1N3R' }] },
        });
      }
      return Promise.resolve({ data: { data: [] } });
    },
  );
}

describe('useScheduleFilters', () => {
  beforeEach(() => {
    localStorage.clear();
    apiGet.mockReset();
  });

  it('deve buscar opções de filtro no mount (modo cronograma geral)', async () => {
    mockFilterResponses();

    const { result } = renderHook(() =>
      useScheduleFilters({ storagePrefix: 'schedule_test_1' }),
    );

    await waitFor(() => {
      expect(result.current.subjects).toHaveLength(1);
    });

    expect(apiGet).toHaveBeenCalledWith('/subjects', undefined);
    expect(apiGet).toHaveBeenCalledWith('/rooms');
    expect(apiGet).toHaveBeenCalledWith('/professors');
    expect(apiGet).toHaveBeenCalledWith('/class-groups');
    expect(result.current.showClassGroupFilter).toBe(true);
    expect(result.current.classGroups).toHaveLength(1);
  });

  it('deve usar turma fixa e não buscar class-groups', async () => {
    mockFilterResponses();

    const { result } = renderHook(() =>
      useScheduleFilters({
        storagePrefix: 'schedule_test_2',
        fixedClassGroupId: 'cg-fixed',
      }),
    );

    await waitFor(() => {
      expect(result.current.rooms).toHaveLength(1);
    });

    expect(result.current.effectiveClassGroupId).toBe('cg-fixed');
    expect(result.current.showClassGroupFilter).toBe(false);
    expect(apiGet).not.toHaveBeenCalledWith('/class-groups');
    expect(result.current.listFilters.classGroupId).toBe('cg-fixed');
  });

  it('deve escopar disciplinas pela turma quando configurado', async () => {
    mockFilterResponses();

    const { result } = renderHook(() =>
      useScheduleFilters({
        storagePrefix: 'schedule_test_3',
        fixedClassGroupId: 'cg-fixed',
        scopeSubjectsToClassGroup: true,
      }),
    );

    await waitFor(() => {
      expect(result.current.subjects[0]?.id).toBe('s-scoped');
    });

    expect(apiGet).toHaveBeenCalledWith('/subjects', {
      params: { classGroupId: 'cg-fixed' },
    });
  });

  it('deve alternar status e montar calendarFilters com refresh', async () => {
    mockFilterResponses();

    const { result } = renderHook(() =>
      useScheduleFilters({ storagePrefix: 'schedule_test_4' }),
    );

    await waitFor(() => {
      expect(result.current.rooms).toHaveLength(1);
    });

    expect(result.current.status).toEqual([
      'PLANNED',
      'SCHEDULED',
      'COMPLETED',
    ]);

    act(() => {
      result.current.toggleStatus('PLANNED');
    });
    expect(result.current.status).toEqual(['SCHEDULED', 'COMPLETED']);

    act(() => {
      result.current.toggleStatus('CANCELLED');
    });
    expect(result.current.status).toEqual([
      'SCHEDULED',
      'COMPLETED',
      'CANCELLED',
    ]);

    const refreshBefore = result.current.calendarFilters._refresh;

    act(() => {
      result.current.bumpRefresh();
    });

    expect(result.current.calendarFilters._refresh).toBe(refreshBefore + 1);
    expect(result.current.calendarFilters.status).toEqual([
      'SCHEDULED',
      'COMPLETED',
      'CANCELLED',
    ]);
    expect(result.current.listFilters).not.toHaveProperty('_refresh');
    expect(result.current.listFilters.status).toEqual([
      'SCHEDULED',
      'COMPLETED',
      'CANCELLED',
    ]);
  });

  it('deve persistir busca no localStorage', async () => {
    mockFilterResponses();

    const { result } = renderHook(() =>
      useScheduleFilters({ storagePrefix: 'schedule_test_5' }),
    );

    await waitFor(() => {
      expect(result.current.rooms).toHaveLength(1);
    });

    act(() => {
      result.current.setSearch('laboratório');
    });

    expect(localStorage.getItem('schedule_test_5_search')).toBe(
      JSON.stringify('laboratório'),
    );
    expect(result.current.calendarFilters.search).toBe('laboratório');
  });
});

import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useDashboardStats } from './useDashboardStats';

const apiGet = vi.fn();

vi.mock('../services/api', () => ({
  default: {
    get: (...args: unknown[]) => apiGet(...args),
  },
}));

describe('useDashboardStats', () => {
  beforeEach(() => {
    apiGet.mockReset();
  });

  it('deve agregar contagens e turmas por turno', async () => {
    apiGet.mockImplementation((endpoint: string) => {
      if (endpoint === '/courses') {
        return Promise.resolve({
          data: { data: [{ id: 'c1', name: 'Enfermagem' }] },
        });
      }
      if (endpoint === '/class-groups') {
        return Promise.resolve({
          data: {
            data: [
              { id: 'g1', shift: 'Manhã', curriculumId: 'cur1' },
              { id: 'g2', shift: 'Noite', curriculumId: 'cur1' },
            ],
          },
        });
      }
      if (endpoint === '/professors') {
        return Promise.resolve({ data: { data: [{ id: 'p1' }] } });
      }
      if (endpoint === '/rooms') {
        return Promise.resolve({
          data: { data: [{ id: 'r1' }, { id: 'r2' }] },
        });
      }
      if (endpoint === '/curriculums') {
        return Promise.resolve({
          data: {
            data: [
              {
                id: 'cur1',
                courseId: 'c1',
                course: { id: 'c1', name: 'Enfermagem' },
              },
            ],
          },
        });
      }
      return Promise.resolve({ data: { data: [] } });
    });

    const { result } = renderHook(() => useDashboardStats());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.stats).toEqual({
      courses: 1,
      classGroups: 2,
      professors: 1,
      rooms: 2,
    });
    expect(result.current.shiftData).toEqual({
      Manhã: 1,
      Tarde: 0,
      Noite: 1,
    });
    expect(result.current.topCourses).toEqual([
      { name: 'Enfermagem', count: 2 },
    ]);
  });
});

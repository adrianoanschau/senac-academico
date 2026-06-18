import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useClassGroup, useFetchedList } from './useFetchedList';

const apiGet = vi.fn();

vi.mock('../services/api', () => ({
  default: {
    get: (...args: unknown[]) => apiGet(...args),
  },
}));

describe('useFetchedList', () => {
  beforeEach(() => {
    apiGet.mockReset();
  });

  it('deve buscar itens no mount e preencher a lista', async () => {
    apiGet.mockResolvedValue({
      data: { data: [{ id: '1', name: 'UC A' }] },
    });

    const { result } = renderHook(() =>
      useFetchedList<{ id: string; name: string }>({
        endpoint: '/subjects',
        params: { includeCurriculums: true },
      }),
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(apiGet).toHaveBeenCalledWith('/subjects', {
      params: { includeCurriculums: true },
    });
    expect(result.current.items).toEqual([{ id: '1', name: 'UC A' }]);
  });

  it('deve refazer o fetch manualmente', async () => {
    apiGet
      .mockResolvedValueOnce({ data: [{ id: '1' }] })
      .mockResolvedValueOnce({ data: [{ id: '1' }, { id: '2' }] });

    const { result } = renderHook(() =>
      useFetchedList<{ id: string }>({ endpoint: '/courses' }),
    );

    await waitFor(() => {
      expect(result.current.items).toHaveLength(1);
    });

    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.items).toHaveLength(2);
    });
  });
});

describe('useClassGroup', () => {
  beforeEach(() => {
    apiGet.mockReset();
  });

  it('deve carregar a turma pelo id', async () => {
    apiGet.mockResolvedValue({
      data: { data: { id: 'cg-1', code: 'ENF24-1N3R' } },
    });

    const { result } = renderHook(() =>
      useClassGroup<{ id: string; code: string }>('cg-1'),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(apiGet).toHaveBeenCalledWith('/class-groups/cg-1');
    expect(result.current.classGroup).toEqual({
      id: 'cg-1',
      code: 'ENF24-1N3R',
    });
    expect(result.current.notFound).toBe(false);
  });

  it('deve marcar notFound quando a API falha', async () => {
    apiGet.mockRejectedValue(new Error('not found'));

    const { result } = renderHook(() =>
      useClassGroup<{ id: string; code: string }>('missing'),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.classGroup).toBeNull();
    expect(result.current.notFound).toBe(true);
  });

  it('não deve buscar quando classGroupId é indefinido', async () => {
    const { result } = renderHook(() =>
      useClassGroup<{ id: string; code: string }>(undefined),
    );

    expect(result.current.isLoading).toBe(false);
    expect(apiGet).not.toHaveBeenCalled();
  });
});

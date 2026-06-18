import { useCallback, useEffect, useState } from 'react';

import api from '../services/api';
import { extractEntityData, extractListData } from '../utils/apiResponse';

export interface UseFetchedListOptions<T> {
  endpoint: string;
  params?: Record<string, unknown>;
  fetchOnMount?: boolean;
  mapListResponse?: (response: { data: unknown }) => T[];
}

export function useFetchedList<T>({
  endpoint,
  params,
  fetchOnMount = true,
  mapListResponse = extractListData<T>,
}: UseFetchedListOptions<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(fetchOnMount);

  const paramsKey = params ? JSON.stringify(params) : '';

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(endpoint, params ? { params } : undefined);
      setItems(mapListResponse(response));
    } catch (error) {
      console.error(`Erro ao buscar ${endpoint}:`, error);
    } finally {
      setIsLoading(false);
    }
    // paramsKey keeps the callback stable when params content is unchanged
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, mapListResponse, paramsKey]);

  useEffect(() => {
    if (!fetchOnMount) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refetch();
  }, [fetchOnMount, refetch]);

  return { items, isLoading, refetch };
}

export function useClassGroup<T>(classGroupId: string | undefined) {
  const [classGroup, setClassGroup] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(classGroupId));
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!classGroupId) return;

    const fetchClassGroup = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/class-groups/${classGroupId}`);
        setClassGroup(extractEntityData<T>(response));
        setNotFound(false);
      } catch {
        setClassGroup(null);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchClassGroup();
  }, [classGroupId]);

  return { classGroup, isLoading, notFound };
}

import { useCallback, useEffect, useState } from 'react';

import api from '../services/api';
import { extractListData } from '../utils/apiResponse';
import { alertDialog, confirmDialog } from '../utils/dialog';

export interface UseResourceListOptions<T> {
  endpoint: string;
  confirmDeleteMessage: string;
  deleteErrorMessage?: string;
  fetchOnMount?: boolean;
  mapListResponse?: (response: { data: unknown }) => T[];
  onDeleted?: () => void | Promise<void>;
}

export function useResourceList<T extends { id?: string | number }>({
  endpoint,
  confirmDeleteMessage,
  deleteErrorMessage = 'Erro ao excluir o registro.',
  fetchOnMount = true,
  mapListResponse = extractListData<T>,
  onDeleted,
}: UseResourceListOptions<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(fetchOnMount);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(endpoint);
      setItems(mapListResponse(response));
    } catch (error) {
      console.error(`Erro ao buscar ${endpoint}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, mapListResponse]);

  useEffect(() => {
    if (!fetchOnMount) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refetch();
  }, [fetchOnMount, refetch]);

  const handleDelete = useCallback(
    async (id: string | number | undefined) => {
      if (id === undefined || id === null) return;
      if (!(await confirmDialog(confirmDeleteMessage))) return;

      try {
        await api.delete(`${endpoint}/${id}`);
        await refetch();
        await onDeleted?.();
      } catch (error) {
        console.error(`Erro ao excluir ${endpoint}/${id}:`, error);
        alertDialog(deleteErrorMessage);
      }
    },
    [confirmDeleteMessage, deleteErrorMessage, endpoint, onDeleted, refetch],
  );

  return { items, isLoading, refetch, handleDelete };
}

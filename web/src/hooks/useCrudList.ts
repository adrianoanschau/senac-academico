import { useCallback, useEffect, useState } from 'react';

import api from '../services/api';
import { extractEntityData, extractListData } from '../utils/apiResponse';
import { alertDialog, confirmDialog } from '../utils/dialog';

interface SaveResult {
  closeModal?: boolean;
  refetch?: boolean;
}

interface SaveContext<T> {
  formData: T;
  isEditing: boolean;
  endpoint: string;
}

export interface UseCrudListOptions<T extends { id?: string | number }> {
  endpoint: string;
  initialFormState: T;
  confirmDeleteMessage: string;
  deleteErrorMessage?: string;
  saveErrorMessage?: string;
  fetchOnMount?: boolean;
  mapListResponse?: (response: { data: unknown }) => T[];
  preparePayload?: (formData: T, isEditing: boolean) => unknown;
  onSave?: (context: SaveContext<T>) => Promise<SaveResult | void>;
  onDeleted?: () => void | Promise<void>;
}

export interface UseCrudListReturn<T extends { id?: string | number }> {
  items: T[];
  isLoading: boolean;
  isSaving: boolean;
  isModalOpen: boolean;
  isEditing: boolean;
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  openNew: () => void;
  openEdit: (item: T) => void;
  closeModal: () => void;
  refetch: () => Promise<void>;
  handleDelete: (id: string | number | undefined) => Promise<void>;
  handleSave: (e: React.FormEvent) => Promise<void>;
}

export function useCrudList<T extends { id?: string | number }>({
  endpoint,
  initialFormState,
  confirmDeleteMessage,
  deleteErrorMessage = 'Erro ao excluir o registro.',
  saveErrorMessage = 'Erro ao salvar os dados.',
  fetchOnMount = true,
  mapListResponse = extractListData<T>,
  preparePayload,
  onSave,
  onDeleted,
}: UseCrudListOptions<T>): UseCrudListReturn<T> {
  const [items, setItems] = useState<T[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(fetchOnMount);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<T>(initialFormState);

  const isEditing = formData.id !== undefined && formData.id !== null;

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

  const openNew = useCallback(() => {
    setFormData(initialFormState);
    setIsModalOpen(true);
  }, [initialFormState]);

  const openEdit = useCallback((item: T) => {
    setFormData(item);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

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

  const defaultSave = useCallback(
    async (data: T, editing: boolean) => {
      const payload = preparePayload
        ? preparePayload(data, editing)
        : (() => {
            const next = { ...data } as Record<string, unknown>;
            if (!editing) delete next.id;
            return next;
          })();

      if (editing) {
        await api.patch(`${endpoint}/${data.id}`, payload);
      } else {
        await api.post(endpoint, payload);
      }
    },
    [endpoint, preparePayload],
  );

  const handleSave = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);

      try {
        let result: SaveResult | void;

        if (onSave) {
          result = await onSave({
            formData,
            isEditing,
            endpoint,
          });
        } else {
          await defaultSave(formData, isEditing);
          result = { closeModal: true, refetch: true };
        }

        if (result?.closeModal !== false) {
          setIsModalOpen(false);
        }

        if (result?.refetch !== false) {
          await refetch();
        }
      } catch (error) {
        console.error(`Erro ao salvar ${endpoint}:`, error);
        alertDialog(saveErrorMessage);
      } finally {
        setIsSaving(false);
      }
    },
    [
      defaultSave,
      endpoint,
      formData,
      isEditing,
      onSave,
      refetch,
      saveErrorMessage,
    ],
  );

  return {
    items,
    isLoading,
    isSaving,
    isModalOpen,
    isEditing,
    formData,
    setFormData,
    openNew,
    openEdit,
    closeModal,
    refetch,
    handleDelete,
    handleSave,
  };
}

export { extractEntityData };

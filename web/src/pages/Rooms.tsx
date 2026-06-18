import React, { useEffect, useMemo, useState } from 'react';

import { Info, MapPin, Plus } from 'lucide-react';

import { CanAccess } from '../components/CanAccess';
import { ContextPanel } from '../components/ContextPanel';
import { Select } from '../components/Select';
import {
  ContextSummaryCard,
  DataTable,
  type DataTableColumn,
  FormActions,
  FormField,
  FormInput,
  FormModal,
  getFormControlClass,
  ListFooter,
  ListToolbar,
  PageCard,
  PageHeader,
  PageLayout,
  PrimaryButton,
  SearchInput,
  SegmentControl,
  TableRowActions,
} from '../components/ui';
import { usePersistentState } from '../hooks/usePersistentState';
import api from '../services/api';
import { alertDialog, confirmDialog } from '../utils/dialog';
import { Role } from '../utils/roles';

interface Room {
  id?: string | number;
  name: string;
  type: string;
  capacity: number;
}

const ACCENT = 'salas' as const;

const initialFormState: Room = {
  name: '',
  type: 'Sala Teórica',
  capacity: 0,
};

const TYPE_OPTIONS = [
  { id: 'all', label: 'Todos' },
  { id: 'lab', label: 'Laboratórios' },
  { id: 'sala', label: 'Salas Teóricas' },
];

export const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Room>(initialFormState);
  const [typeFilter, setTypeFilter] = usePersistentState('rooms_type', 'all');
  const [search, setSearch] = usePersistentState('rooms_search', '');

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/rooms');
      setRooms(response.data.data || []);
    } catch (error) {
      console.error('Erro ao buscar salas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchRooms();
    })();
  }, []);

  const handleOpenNewModal = () => {
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (room: Room) => {
    setFormData(room);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string | number | undefined) => {
    if (!id) return;
    if (!(await confirmDialog('Tem certeza que deseja excluir esta sala?')))
      return;

    try {
      await api.delete(`/rooms/${id}`);
      fetchRooms();
    } catch (error) {
      console.error('Erro ao excluir sala:', error);
      alertDialog('Erro ao excluir a sala. Verifique dependências.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const isEditing = !!formData.id;
      const url = isEditing ? `/rooms/${formData.id}` : '/rooms';

      const payload: Partial<Room> = { ...formData };
      if (!isEditing) delete payload.id;

      if (isEditing) {
        await api.patch(url, payload);
      } else {
        await api.post(url, payload);
      }

      setIsModalOpen(false);
      fetchRooms();
    } catch (error) {
      console.error('Erro ao salvar sala:', error);
      alertDialog('Erro ao salvar os dados da sala.');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredRooms = rooms.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      typeFilter === 'all' ||
      (typeFilter === 'lab' && r.type.includes('Laboratório')) ||
      (typeFilter === 'sala' && r.type === 'Sala Teórica');
    return matchesSearch && matchesType;
  });

  const columns = useMemo<DataTableColumn<Room>[]>(
    () => [
      {
        key: 'name',
        header: 'Nome/Número',
        cellClassName: 'font-bold text-slate-800',
        render: (room) => room.name,
      },
      {
        key: 'type',
        header: 'Tipo',
        cellClassName: 'text-slate-500 font-medium',
        render: (room) => room.type,
      },
      {
        key: 'capacity',
        header: 'Capacidade',
        cellClassName: 'text-slate-500 font-medium',
        render: (room) => `${room.capacity} alunos`,
      },
    ],
    [],
  );

  const selectClassName = `${getFormControlClass(ACCENT)} cursor-pointer`;

  return (
    <PageLayout>
      <PageHeader
        accent={ACCENT}
        icon={<MapPin size={28} />}
        title="Salas e Ambientes"
        description="Gerencie os espaços físicos e alocações."
        action={
          <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
            <PrimaryButton accent={ACCENT} onClick={handleOpenNewModal}>
              <Plus size={20} />
              Nova Sala
            </PrimaryButton>
          </CanAccess>
        }
      />

      <PageCard isLoading={isLoading} loadingMessage="Buscando ambientes...">
        <ListToolbar>
          <SearchInput
            accent={ACCENT}
            placeholder="Buscar ambiente..."
            value={search}
            onChange={setSearch}
          />
          <SegmentControl
            accent={ACCENT}
            label="Tipo:"
            options={TYPE_OPTIONS}
            value={typeFilter}
            onChange={setTypeFilter}
          />
        </ListToolbar>

        <DataTable
          columns={columns}
          data={filteredRooms}
          rowKey={(room) => String(room.id)}
          emptyMessage="Nenhuma sala cadastrada."
          isLoading={isLoading}
          actionsColumn={{
            render: (room) => (
              <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
                <TableRowActions
                  accent={ACCENT}
                  onEdit={() => handleOpenEditModal(room)}
                  onDelete={() => handleDelete(room.id)}
                />
              </CanAccess>
            ),
          }}
        />

        <ListFooter summary={`Mostrando ${rooms.length} sala(s)`}>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
              Anterior
            </button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-800 font-bold">
              1
            </button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
              2
            </button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
              Próxima
            </button>
          </div>
        </ListFooter>
      </PageCard>

      <FormModal
        open={isModalOpen}
        title="Sala / Ambiente"
        onClose={() => setIsModalOpen(false)}
        isSaving={isSaving}
        savingMessage="Salvando ambiente..."
      >
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <FormField label="Nome ou Número">
            <FormInput
              accent={ACCENT}
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ex: Laboratório 203"
            />
          </FormField>
          <FormField label="Tipo de Ambiente">
            <Select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className={selectClassName}
            >
              <option value="Laboratório de TI">Laboratório de TI</option>
              <option value="Sala Teórica">Sala Teórica</option>
              <option value="Laboratório Prático">Laboratório Prático</option>
              <option value="Auditório">Auditório</option>
            </Select>
          </FormField>
          <FormField label="Capacidade Máxima (Alunos)">
            <FormInput
              accent={ACCENT}
              type="number"
              required
              value={formData.capacity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  capacity: Number(e.target.value),
                })
              }
              placeholder="Ex: 30"
            />
          </FormField>
          <FormActions
            accent={ACCENT}
            isSaving={isSaving}
            onCancel={() => setIsModalOpen(false)}
          />
        </form>
      </FormModal>

      <ContextPanel
        title="Salas e Ambientes"
        description="Cadastre as salas, laboratórios e auditórios. Verifique sempre a capacidade máxima para evitar conflitos com o número de alunos das turmas."
        icon={<Info className="text-menu-salas" size={24} />}
        tips={[
          'Diferencie bem as Salas Teóricas dos Laboratórios Práticos.',
          'Fique atento à capacidade do ambiente, ela deverá ser suficiente para abrigar a turma alocada lá.',
        ]}
      >
        <ContextSummaryCard
          title="Resumo"
          icon={<MapPin size={16} className="text-menu-salas" />}
          rows={[
            { label: 'Total de Ambientes:', value: rooms.length },
            {
              label: 'Salas Teóricas:',
              value: rooms.filter((r) => r.type === 'Sala Teórica').length,
            },
            {
              label: 'Laboratórios:',
              value: rooms.filter((r) => r.type.includes('Laboratório')).length,
            },
            {
              label: 'Capacidade Total:',
              value: `${rooms.reduce((acc, curr) => acc + (curr.capacity || 0), 0)} vagas`,
            },
          ]}
        />
      </ContextPanel>
    </PageLayout>
  );
};

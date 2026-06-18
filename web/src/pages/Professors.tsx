import React, { useEffect, useMemo, useState } from 'react';

import { Info, Plus, Users } from 'lucide-react';

import { CanAccess } from '../components/CanAccess';
import { ContextPanel } from '../components/ContextPanel';
import {
  ContextSummaryCard,
  DataTable,
  type DataTableColumn,
  FormActions,
  FormField,
  FormInput,
  FormModal,
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

interface Professor {
  id?: string | number;
  name: string;
  email: string;
  degree: string;
}

const ACCENT = 'professores' as const;

const initialFormState: Professor = {
  name: '',
  email: '',
  degree: '',
};

const STATUS_OPTIONS = [
  { id: 'all', label: 'Todos' },
  { id: 'ativo', label: 'Ativos' },
  { id: 'inativo', label: 'Inativos' },
];

export const Professors: React.FC = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Professor>(initialFormState);
  const [statusFilter, setStatusFilter] = usePersistentState(
    'professors_status',
    'all',
  );
  const [search, setSearch] = usePersistentState('professors_search', '');

  const fetchProfessors = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/professors');
      setProfessors(response.data.data || []);
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfessors();
  }, []);

  const handleOpenNewModal = () => {
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (professor: Professor) => {
    setFormData(professor);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string | number) => {
    if (
      !(await confirmDialog('Tem certeza que deseja excluir este professor?'))
    )
      return;

    try {
      await api.delete(`/professors/${id}`);
      fetchProfessors();
    } catch (error) {
      console.error('Erro ao excluir professor:', error);
      alertDialog(
        'Erro ao excluir professor. Verifique se ele está vinculado a alguma turma.',
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const isEditing = !!formData.id;
      const url = isEditing ? `/professors/${formData.id}` : '/professors';

      const payload = { ...formData };
      if (!isEditing) delete payload.id;

      if (isEditing) {
        await api.patch(url, payload);
      } else {
        await api.post(url, payload);
      }

      setIsModalOpen(false);
      fetchProfessors();
    } catch (error) {
      console.error('Erro ao salvar professor:', error);
      alertDialog('Erro ao salvar os dados do professor.');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredProfessors = professors.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.degree.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const columns = useMemo<DataTableColumn<Professor>[]>(
    () => [
      {
        key: 'name',
        header: 'Nome',
        render: (prof) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
              {prof.name ? prof.name.charAt(0).toUpperCase() : 'P'}
            </div>
            <span className="font-bold text-slate-800">{prof.name}</span>
          </div>
        ),
      },
      {
        key: 'email',
        header: 'E-mail',
        cellClassName: 'text-slate-500 font-medium',
        render: (prof) => prof.email,
      },
      {
        key: 'degree',
        header: 'Especialidade',
        cellClassName: 'text-slate-500 font-medium',
        render: (prof) => prof.degree,
      },
    ],
    [],
  );

  return (
    <PageLayout>
      <PageHeader
        accent={ACCENT}
        icon={<Users size={28} />}
        title="Professores"
        description="Gerencie o corpo docente da instituição."
        action={
          <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
            <PrimaryButton accent={ACCENT} onClick={handleOpenNewModal}>
              <Plus size={20} />
              Novo Professor
            </PrimaryButton>
          </CanAccess>
        }
      />

      <PageCard isLoading={isLoading} loadingMessage="Buscando professores...">
        <ListToolbar>
          <SearchInput
            accent={ACCENT}
            placeholder="Buscar professor..."
            value={search}
            onChange={setSearch}
          />
          <SegmentControl
            accent={ACCENT}
            label="Filtros:"
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </ListToolbar>

        <DataTable
          columns={columns}
          data={filteredProfessors}
          rowKey={(prof) => String(prof.id)}
          emptyMessage="Nenhum professor cadastrado."
          isLoading={isLoading}
          actionsColumn={{
            render: (prof) => (
              <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
                <TableRowActions
                  accent={ACCENT}
                  onEdit={() => handleOpenEditModal(prof)}
                  onDelete={() => prof.id && handleDelete(prof.id)}
                />
              </CanAccess>
            ),
          }}
        />

        <ListFooter summary={`Mostrando ${professors.length} professor(es)`}>
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
        title="Professor"
        onClose={() => setIsModalOpen(false)}
        isSaving={isSaving}
        savingMessage="Salvando professor..."
      >
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <FormField label="Nome Completo">
            <FormInput
              accent={ACCENT}
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ex: João da Silva"
            />
          </FormField>
          <FormField label="E-mail Institucional">
            <FormInput
              accent={ACCENT}
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="joao.silva@senac.br"
            />
          </FormField>
          <FormField label="Especialidade Técnica">
            <FormInput
              accent={ACCENT}
              required
              value={formData.degree}
              onChange={(e) =>
                setFormData({ ...formData, degree: e.target.value })
              }
              placeholder="Ex: Programação Web"
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
        title="Corpo Docente"
        description="Mantenha as especialidades e contatos dos professores sempre atualizados. Professores inativos não poderão ser alocados no calendário."
        icon={<Info className="text-menu-professores" size={24} />}
        tips={[
          'Garanta que as informações de contato estejam corretas.',
          'Professores cadastrados aqui poderão ser alocados para ministrar aulas no Cronograma.',
        ]}
      >
        <ContextSummaryCard
          title="Resumo"
          icon={<Users size={16} className="text-menu-professores" />}
          rows={[{ label: 'Total de Professores:', value: professors.length }]}
        />
      </ContextPanel>
    </PageLayout>
  );
};

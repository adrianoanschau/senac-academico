import React, { useMemo } from 'react';

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
import { useCrudList } from '../hooks/useCrudList';
import { usePersistentState } from '../hooks/usePersistentState';
import type { Professor } from '../types/entities';
import { Role } from '../utils/roles';

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
  const [statusFilter, setStatusFilter] = usePersistentState(
    'professors_status',
    'all',
  );
  const [search, setSearch] = usePersistentState('professors_search', '');

  const {
    items: professors,
    isLoading,
    isSaving,
    isModalOpen,
    formData,
    setFormData,
    openNew,
    openEdit,
    closeModal,
    handleDelete,
    handleSave,
  } = useCrudList<Professor>({
    endpoint: '/professors',
    initialFormState,
    confirmDeleteMessage: 'Tem certeza que deseja excluir este professor?',
    deleteErrorMessage:
      'Erro ao excluir professor. Verifique se ele está vinculado a alguma turma.',
    saveErrorMessage: 'Erro ao salvar os dados do professor.',
  });

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
            <PrimaryButton accent={ACCENT} onClick={openNew}>
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
                  onEdit={() => openEdit(prof)}
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
        onClose={closeModal}
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
            onCancel={closeModal}
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

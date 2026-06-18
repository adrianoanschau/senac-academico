import React, { useEffect, useMemo, useState } from 'react';

import { GraduationCap, Info, Plus } from 'lucide-react';

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

interface Course {
  id?: string | number;
  name: string;
  code: string;
}

const ACCENT = 'cursos' as const;

const initialFormState: Course = {
  name: '',
  code: '',
};

const MODALITY_OPTIONS = [
  { id: 'all', label: 'Todas' },
  { id: 'Técnico', label: 'Técnico' },
  { id: 'Livre', label: 'Livre' },
  { id: 'Graduação', label: 'Graduação' },
  { id: 'Pós-graduação', label: 'Pós-graduação' },
];

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Course>(initialFormState);
  const [modalityFilter, setModalityFilter] = usePersistentState(
    'courses_modality',
    'all',
  );
  const [search, setSearch] = usePersistentState('courses_search', '');

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/courses');
      setCourses(response.data.data || []);
    } catch (error) {
      console.error('Erro ao buscar cursos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchCourses();
    })();
  }, []);

  const handleOpenNewModal = () => {
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course: Course) => {
    setFormData(course);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string | number | undefined) => {
    if (!id) return;
    if (!(await confirmDialog('Tem certeza que deseja excluir este curso?')))
      return;

    try {
      await api.delete(`/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Erro ao excluir curso:', error);
      alertDialog(
        'Erro ao excluir o curso. Verifique dependências (ex: turmas ativas).',
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const isEditing = !!formData.id;
      const url = isEditing ? `/courses/${formData.id}` : '/courses';

      const payload: Partial<Course> = { ...formData };
      if (!isEditing) delete payload.id;

      if (isEditing) {
        await api.patch(url, payload);
      } else {
        await api.post(url, payload);
      }

      setIsModalOpen(false);
      fetchCourses();
    } catch (error) {
      console.error('Erro ao salvar curso:', error);
      alertDialog('Erro ao salvar os dados do curso.');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const columns = useMemo<DataTableColumn<Course>[]>(
    () => [
      {
        key: 'name',
        header: 'Nome do Curso',
        cellClassName: 'font-bold text-slate-800',
        render: (course) => course.name,
      },
      {
        key: 'code',
        header: 'Código',
        render: (course) => (
          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
            {course.code}
          </span>
        ),
      },
    ],
    [],
  );

  return (
    <PageLayout>
      <PageHeader
        accent={ACCENT}
        icon={<GraduationCap size={28} />}
        title="Cursos"
        description="Gerencie os cursos oferecidos pela instituição."
        action={
          <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
            <PrimaryButton accent={ACCENT} onClick={handleOpenNewModal}>
              <Plus size={20} />
              Novo Curso
            </PrimaryButton>
          </CanAccess>
        }
      />

      <PageCard isLoading={isLoading} loadingMessage="Buscando cursos...">
        <ListToolbar>
          <SearchInput
            accent={ACCENT}
            placeholder="Buscar curso..."
            value={search}
            onChange={setSearch}
          />
          <SegmentControl
            accent={ACCENT}
            label="Modalidade:"
            options={MODALITY_OPTIONS}
            value={modalityFilter}
            onChange={setModalityFilter}
          />
        </ListToolbar>

        <DataTable
          columns={columns}
          data={filteredCourses}
          rowKey={(course) => String(course.id)}
          emptyMessage="Nenhum curso cadastrado."
          isLoading={isLoading}
          actionsColumn={{
            render: (course) => (
              <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
                <TableRowActions
                  accent={ACCENT}
                  onEdit={() => handleOpenEditModal(course)}
                  onDelete={() => handleDelete(course.id)}
                />
              </CanAccess>
            ),
          }}
        />

        <ListFooter summary={`Mostrando ${courses.length} curso(s)`}>
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
        title="Curso"
        onClose={() => setIsModalOpen(false)}
        isSaving={isSaving}
        savingMessage="Salvando curso..."
      >
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <FormField label="Nome do Curso">
            <FormInput
              accent={ACCENT}
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ex: Técnico em Informática"
            />
          </FormField>
          <FormField label="Código">
            <FormInput
              accent={ACCENT}
              required
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              placeholder="Ex: TI"
            />
          </FormField>
          <FormActions
            accent={ACCENT}
            isSaving={isSaving}
            savingLabel="Salvando..."
            onCancel={() => setIsModalOpen(false)}
          />
        </form>
      </FormModal>

      <ContextPanel
        title="Cursos"
        description="Cadastre os cursos oferecidos. A criação de cursos é o primeiro passo para poder estruturar as grades curriculares do semestre."
        icon={<Info className="text-menu-cursos" size={24} />}
        tips={[
          'O cadastro de cursos é a base para organizar as formações da instituição.',
          'Após criar um curso, o próximo passo é acessar "Matriz Curricular" para montar a grade de disciplinas.',
        ]}
      >
        <ContextSummaryCard
          title="Resumo"
          icon={<GraduationCap size={16} className="text-menu-cursos" />}
          rows={[{ label: 'Cursos Cadastrados:', value: courses.length }]}
        />
      </ContextPanel>
    </PageLayout>
  );
};

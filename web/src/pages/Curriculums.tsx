import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Edit2, ExternalLink, Info, Library, Plus, Trash2 } from 'lucide-react';

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
  ListToolbar,
  PageCard,
  PageHeader,
  PageLayout,
  PrimaryButton,
  SearchInput,
} from '../components/ui';
import { usePersistentState } from '../hooks/usePersistentState';
import api from '../services/api';
import type { Course, Curriculum } from '../types/subject.types';
import { alertDialog, confirmDialog } from '../utils/dialog';
import { Role } from '../utils/roles';

const ACCENT = 'matriz' as const;

const initialFormState = {
  name: '',
  active: true,
  courseId: '',
};

export const Curriculums: React.FC = () => {
  const navigate = useNavigate();
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormState);
  const [search, setSearch] = usePersistentState('curriculums_search', '');

  const fetchCurriculums = async () => {
    try {
      const response = await api.get('/curriculums');
      setCurriculums(response.data.data || response.data || []);
    } catch (error) {
      console.error('Erro ao buscar grades curriculares:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data.data || response.data || []);
    } catch (error) {
      console.error('Erro ao buscar cursos:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCurriculums(), fetchCourses()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleOpenNewModal = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (curriculum: Curriculum) => {
    setEditingId(curriculum.id);
    setFormData({
      name: curriculum.name,
      active: curriculum.active,
      courseId: curriculum.courseId,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (
      !(await confirmDialog(
        'Tem certeza que deseja excluir esta grade curricular?',
      ))
    )
      return;

    try {
      await api.delete(`/curriculums/${id}`);
      fetchCurriculums();
    } catch (error) {
      console.error('Erro ao excluir grade curricular:', error);
      alertDialog(
        'Erro ao excluir. Verifique se existem turmas vinculadas a ela.',
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        name: formData.name,
        active: formData.active,
        courseId: formData.courseId,
      };

      if (editingId) {
        await api.patch(`/curriculums/${editingId}`, payload);
        setIsModalOpen(false);
        fetchCurriculums();
      } else {
        const response = await api.post('/curriculums', payload);
        const created = response.data.data || response.data;
        setIsModalOpen(false);
        navigate(`/curriculums/${created.id}`);
      }
    } catch (error) {
      console.error('Erro ao salvar grade curricular:', error);
      alertDialog('Erro ao salvar os dados.');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredCurriculums = curriculums.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.course?.name &&
        c.course.name.toLowerCase().includes(search.toLowerCase())),
  );

  const selectClassName = `${getFormControlClass(ACCENT)} cursor-pointer`;

  const columns = useMemo<DataTableColumn<Curriculum>[]>(
    () => [
      {
        key: 'name',
        header: 'Nome da Grade',
        render: (curriculum) => (
          <button
            type="button"
            onClick={() => navigate(`/curriculums/${curriculum.id}`)}
            className="font-bold text-slate-800 hover:text-menu-matriz transition-colors text-left"
          >
            {curriculum.name}
          </button>
        ),
      },
      {
        key: 'course',
        header: 'Curso Associado',
        cellClassName: 'text-slate-500 font-medium',
        render: (curriculum) => curriculum.course?.name || '-',
      },
      {
        key: 'subjects',
        header: 'Disciplinas',
        headerClassName: 'text-center',
        cellClassName: 'text-center font-bold text-menu-matriz',
        render: (curriculum) => `${curriculum.subjects?.length || 0} UCs`,
      },
      {
        key: 'status',
        header: 'Status',
        render: (curriculum) => (
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              curriculum.active
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {curriculum.active ? 'Ativa' : 'Inativa'}
          </span>
        ),
      },
    ],
    [navigate],
  );

  return (
    <PageLayout>
      <PageHeader
        accent={ACCENT}
        icon={<Library size={28} />}
        title="Grades Curriculares"
        description="Gerencie as grades e adicione disciplinas diretamente em cada matriz."
        action={
          <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
            <PrimaryButton accent={ACCENT} onClick={handleOpenNewModal}>
              <Plus size={20} />
              Nova Grade
            </PrimaryButton>
          </CanAccess>
        }
      />

      <PageCard isLoading={isLoading} loadingMessage="Buscando grades...">
        <ListToolbar>
          <SearchInput
            accent={ACCENT}
            placeholder="Buscar grade..."
            value={search}
            onChange={setSearch}
          />
        </ListToolbar>

        <DataTable
          columns={columns}
          data={filteredCurriculums}
          rowKey={(curriculum) => curriculum.id}
          emptyMessage="Nenhuma grade cadastrada."
          isLoading={isLoading}
          actionsColumn={{
            render: (curriculum) => (
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/curriculums/${curriculum.id}`)}
                  className="p-2 text-slate-400 hover:text-menu-matriz hover:bg-menu-matriz/10 rounded-lg transition-colors"
                  title="Abrir grade"
                >
                  <ExternalLink size={18} />
                </button>
                <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(curriculum)}
                    className="p-2 text-slate-400 hover:text-menu-matriz hover:bg-menu-matriz/10 rounded-lg transition-colors"
                    title="Editar metadados"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(curriculum.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 size={18} />
                  </button>
                </CanAccess>
              </div>
            ),
          }}
        />
      </PageCard>

      <FormModal
        open={isModalOpen}
        title={editingId ? 'Editar Grade' : 'Nova Grade'}
        onClose={() => setIsModalOpen(false)}
        isSaving={isSaving}
        savingMessage="Salvando grade..."
      >
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <FormField label="Nome da Grade">
            <FormInput
              accent={ACCENT}
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ex: Grade 2024 - Manhã"
            />
          </FormField>

          <FormField label="Curso Vinculado">
            <Select
              required
              value={formData.courseId}
              onChange={(e) =>
                setFormData({ ...formData, courseId: e.target.value })
              }
              className={selectClassName}
            >
              <option value="">Selecione um curso...</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Status">
            <Select
              value={formData.active ? 'true' : 'false'}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  active: e.target.value === 'true',
                })
              }
              className={selectClassName}
            >
              <option value="true">Ativa</option>
              <option value="false">Inativa</option>
            </Select>
          </FormField>

          {!editingId && (
            <p className="text-sm text-slate-500 bg-slate-50 rounded-xl p-3">
              Após criar, você será direcionado para adicionar as disciplinas da
              grade.
            </p>
          )}

          <FormActions
            accent={ACCENT}
            isSaving={isSaving}
            submitLabel={editingId ? 'Salvar' : 'Criar e Continuar'}
            onCancel={() => setIsModalOpen(false)}
          />
        </form>
      </FormModal>

      <ContextPanel
        title="Matriz Curricular"
        description="A matriz vincula um curso às suas disciplinas. Adicione UCs diretamente dentro de cada grade — o sistema as cadastra no dicionário global automaticamente."
        icon={<Info className="text-menu-matriz" size={24} />}
        tips={[
          'Abra uma grade para gerenciar suas disciplinas por módulo.',
          'Uma matriz precisa estar "Ativa" para que você possa vinculá-la a uma nova turma.',
          'Consulte o Dicionário de UCs para ver em quais grades cada disciplina está vinculada.',
        ]}
      >
        <ContextSummaryCard
          title="Resumo"
          icon={<Library size={16} className="text-menu-matriz" />}
          rows={[
            { label: 'Total de Grades:', value: curriculums.length },
            {
              label: 'Grades Ativas:',
              value: curriculums.filter((c) => c.active).length,
              valueClassName: 'text-emerald-600',
            },
          ]}
        />
      </ContextPanel>
    </PageLayout>
  );
};

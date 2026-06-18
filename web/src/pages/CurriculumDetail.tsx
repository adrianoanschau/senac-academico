import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ArrowLeft, CheckCircle2, Edit2, Library, Plus } from 'lucide-react';

import { CanAccess } from '../components/CanAccess';
import { AddSubjectDrawer } from '../components/Curriculum/AddSubjectDrawer';
import { CurriculumMetadataForm } from '../components/Curriculum/CurriculumMetadataForm';
import { ModuleSection } from '../components/Curriculum/ModuleSection';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { FormModal } from '../components/ui';
import api from '../services/api';
import type { CurriculumForm } from '../types/entities';
import type { Course, Curriculum } from '../types/subject.types';
import { alertDialog, confirmDialog } from '../utils/dialog';
import { Role } from '../utils/roles';

export const CurriculumDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMetadataModalOpen, setIsMetadataModalOpen] = useState(false);
  const [isSavingMetadata, setIsSavingMetadata] = useState(false);
  const [metadataForm, setMetadataForm] = useState<CurriculumForm>({
    name: '',
    active: true,
    courseId: '',
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerModule, setDrawerModule] = useState(1);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchCurriculum = useCallback(async () => {
    if (!id) return;
    try {
      const response = await api.get(`/curriculums/${id}`);
      const data = response.data.data || response.data;
      setCurriculum(data);
    } catch (error) {
      console.error('Erro ao buscar grade:', error);
      alertDialog('Grade não encontrada.');
      navigate('/curriculums');
    }
  }, [id, navigate]);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [, coursesRes] = await Promise.all([
          fetchCurriculum(),
          api.get('/courses'),
        ]);
        setCourses(coursesRes.data.data || coursesRes.data || []);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [fetchCurriculum]);

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const modules = useMemo(() => {
    if (!curriculum?.subjects) return [];
    const moduleNumbers = [
      ...new Set(curriculum.subjects.map((s) => s.module)),
    ].sort((a, b) => a - b);
    return moduleNumbers.map((n) => ({
      number: n,
      subjects: curriculum.subjects!.filter((s) => s.module === n),
    }));
  }, [curriculum]);

  const maxModule =
    modules.length > 0 ? Math.max(...modules.map((m) => m.number)) : 0;

  const handleOpenDrawer = (module: number) => {
    setDrawerModule(module);
    setDrawerOpen(true);
  };

  const handleRemoveSubject = async (curriculumSubjectId: string) => {
    if (!id) return;
    if (
      !(await confirmDialog(
        'Remover esta disciplina da grade? A UC permanecerá no dicionário global.',
      ))
    )
      return;

    try {
      await api.delete(`/curriculums/${id}/subjects/${curriculumSubjectId}`);
      setSuccessMessage('Disciplina removida da grade.');
      await fetchCurriculum();
    } catch (error) {
      console.error('Erro ao remover disciplina:', error);
      alertDialog('Erro ao remover a disciplina.');
    }
  };

  const handleOpenMetadataModal = () => {
    if (!curriculum) return;
    setMetadataForm({
      name: curriculum.name,
      active: curriculum.active,
      courseId: curriculum.courseId,
    });
    setIsMetadataModalOpen(true);
  };

  const handleSaveMetadata = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setIsSavingMetadata(true);
    try {
      await api.patch(`/curriculums/${id}`, metadataForm);
      setIsMetadataModalOpen(false);
      await fetchCurriculum();
      setSuccessMessage('Dados da grade atualizados.');
    } catch (error) {
      console.error('Erro ao salvar metadados:', error);
      alertDialog('Erro ao salvar os dados.');
    } finally {
      setIsSavingMetadata(false);
    }
  };

  const handleSubjectAdded = async (message: string) => {
    setSuccessMessage(message);
    await fetchCurriculum();
  };

  if (isLoading || !curriculum) {
    return (
      <div className="w-full max-w-4xl mx-auto pb-10 relative min-h-[400px]">
        <LoadingOverlay visible message="Carregando grade..." />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto pb-10">
      <Link
        to="/curriculums"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-menu-matriz mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        Voltar para Grades
      </Link>

      {successMessage && (
        <div className="mb-6 flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-3 rounded-xl text-sm font-bold border border-emerald-100">
          <CheckCircle2 size={18} />
          {successMessage}
        </div>
      )}

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-menu-matriz/10 text-menu-matriz rounded-xl">
              <Library size={28} />
            </div>
            {curriculum.name}
          </h1>
          <p className="text-slate-500 mt-2">
            Curso:{' '}
            <span className="font-bold text-slate-700">
              {curriculum.course?.name ?? '—'}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              curriculum.active
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {curriculum.active ? 'Ativa' : 'Inativa'}
          </span>
          <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
            <button
              onClick={handleOpenMetadataModal}
              className="p-2 text-slate-400 hover:text-menu-matriz hover:bg-menu-matriz/10 rounded-lg transition-colors"
              title="Editar metadados"
            >
              <Edit2 size={20} />
            </button>
          </CanAccess>
        </div>
      </div>

      <div className="bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100">
        <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            Disciplinas da Grade
          </h2>
          <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
            <button
              onClick={() => handleOpenDrawer(maxModule > 0 ? maxModule : 1)}
              className="bg-menu-matriz hover:opacity-90 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md shadow-menu-matriz/30 text-sm"
            >
              <Plus size={18} />
              Adicionar Disciplina
            </button>
          </CanAccess>
        </div>

        {modules.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 font-medium mb-4">
              Nenhuma disciplina adicionada a esta grade ainda.
            </p>
            <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
              <button
                onClick={() => handleOpenDrawer(1)}
                className="bg-menu-matriz hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-bold inline-flex items-center gap-2 transition-colors shadow-md shadow-menu-matriz/30"
              >
                <Plus size={20} />
                Adicionar primeira disciplina
              </button>
            </CanAccess>
          </div>
        ) : (
          modules.map((mod) => (
            <ModuleSection
              key={mod.number}
              moduleNumber={mod.number}
              subjects={mod.subjects}
              onAddSubject={handleOpenDrawer}
              onRemoveSubject={handleRemoveSubject}
            />
          ))
        )}

        {modules.length > 0 && (
          <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
            <button
              onClick={() => handleOpenDrawer(maxModule + 1)}
              className="w-full mt-2 py-3 text-sm font-bold text-menu-matriz bg-menu-matriz/5 hover:bg-menu-matriz/10 rounded-xl transition-colors border border-dashed border-menu-matriz/30"
            >
              + Adicionar disciplina em novo módulo ({maxModule + 1})
            </button>
          </CanAccess>
        )}
      </div>

      {curriculum && (
        <AddSubjectDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          curriculum={curriculum}
          defaultModule={drawerModule}
          onSuccess={handleSubjectAdded}
        />
      )}

      <FormModal
        open={isMetadataModalOpen}
        title="Editar Grade"
        onClose={() => setIsMetadataModalOpen(false)}
        isSaving={isSavingMetadata}
        savingMessage="Salvando..."
      >
        <CurriculumMetadataForm
          formData={metadataForm}
          onChange={setMetadataForm}
          courses={courses}
          isEditing
          isSaving={isSavingMetadata}
          onSubmit={handleSaveMetadata}
          onCancel={() => setIsMetadataModalOpen(false)}
        />
      </FormModal>
    </div>
  );
};

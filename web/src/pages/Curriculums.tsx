import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Edit2,
  ExternalLink,
  Info,
  Library,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';

import { CanAccess } from '../components/CanAccess';
import { ContextPanel } from '../components/ContextPanel';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { Select } from '../components/Select';
import { usePersistentState } from '../hooks/usePersistentState';
import api from '../services/api';
import type { Course, Curriculum } from '../types/subject.types';
import { alertDialog, confirmDialog } from '../utils/dialog';
import { Role } from '../utils/roles';

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

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-menu-matriz/10 text-menu-matriz rounded-xl">
              <Library size={28} />
            </div>
            Grades Curriculares
          </h1>
          <p className="text-slate-500 mt-1">
            Gerencie as grades e adicione disciplinas diretamente em cada
            matriz.
          </p>
        </div>
        <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
          <button
            onClick={handleOpenNewModal}
            className="bg-menu-matriz hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md shadow-menu-matriz/30"
          >
            <Plus size={20} />
            Nova Grade
          </button>
        </CanAccess>
      </div>

      <div className="bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden">
        <LoadingOverlay visible={isLoading} message="Buscando grades..." />

        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              className="w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-matriz outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
              placeholder="Buscar grade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">
                  Nome da Grade
                </th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">
                  Curso Associado
                </th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-center">
                  Disciplinas
                </th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">
                  Status
                </th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCurriculums.length === 0 && !isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-slate-500 font-medium"
                  >
                    Nenhuma grade cadastrada.
                  </td>
                </tr>
              ) : (
                filteredCurriculums.map((curriculum) => (
                  <tr
                    key={curriculum.id}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <button
                        onClick={() =>
                          navigate(`/curriculums/${curriculum.id}`)
                        }
                        className="font-bold text-slate-800 hover:text-menu-matriz transition-colors text-left"
                      >
                        {curriculum.name}
                      </button>
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-medium">
                      {curriculum.course?.name || '-'}
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-menu-matriz">
                      {curriculum.subjects?.length || 0} UCs
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${curriculum.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}
                      >
                        {curriculum.active ? 'Ativa' : 'Inativa'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            navigate(`/curriculums/${curriculum.id}`)
                          }
                          className="p-2 text-slate-400 hover:text-menu-matriz hover:bg-menu-matriz/10 rounded-lg transition-colors"
                          title="Abrir grade"
                        >
                          <ExternalLink size={18} />
                        </button>
                        <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
                          <button
                            onClick={() => handleOpenEditModal(curriculum)}
                            className="p-2 text-slate-400 hover:text-menu-matriz hover:bg-menu-matriz/10 rounded-lg transition-colors"
                            title="Editar metadados"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(curriculum.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                        </CanAccess>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-4xl p-8 w-full max-w-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                {editingId ? 'Editar Grade' : 'Nova Grade'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <LoadingOverlay visible={isSaving} message="Salvando grade..." />

            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Nome da Grade
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-matriz outline-none transition-all text-slate-800"
                  placeholder="Ex: Grade 2024 - Manhã"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Curso Vinculado
                </label>
                <Select
                  required
                  value={formData.courseId}
                  onChange={(e) =>
                    setFormData({ ...formData, courseId: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-matriz outline-none transition-all text-slate-800 cursor-pointer"
                >
                  <option value="">Selecione um curso...</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Status
                </label>
                <Select
                  value={formData.active ? 'true' : 'false'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      active: e.target.value === 'true',
                    })
                  }
                  className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-matriz outline-none transition-all text-slate-800 cursor-pointer"
                >
                  <option value="true">Ativa</option>
                  <option value="false">Inativa</option>
                </Select>
              </div>

              {!editingId && (
                <p className="text-sm text-slate-500 bg-slate-50 rounded-xl p-3">
                  Após criar, você será direcionado para adicionar as
                  disciplinas da grade.
                </p>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-menu-matriz hover:opacity-90 disabled:opacity-70 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md shadow-menu-matriz/30"
                >
                  {isSaving
                    ? 'Salvando...'
                    : editingId
                      ? 'Salvar'
                      : 'Criar e Continuar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mt-4">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Library size={16} className="text-menu-matriz" /> Resumo
          </h4>
          <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
            <span>Total de Grades:</span>
            <span className="font-bold">{curriculums.length}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-600">
            <span>Grades Ativas:</span>
            <span className="font-bold text-emerald-600">
              {curriculums.filter((c) => c.active).length}
            </span>
          </div>
        </div>
      </ContextPanel>
    </div>
  );
};

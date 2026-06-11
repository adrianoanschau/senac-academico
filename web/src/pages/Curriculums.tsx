import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Library, X, Info } from 'lucide-react';
import { Select } from '../components/Select';
import { confirmDialog, alertDialog } from '../utils/dialog';
import { ContextPanel } from '../components/ContextPanel';
import { usePersistentState } from '../hooks/usePersistentState';
import api from '../services/api';

interface Course {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  name: string;
  hours: number;
  code?: string;
}

interface CurriculumSubject {
  subjectId: string;
  module: number;
}

interface Curriculum {
  id?: string;
  name: string;
  active: boolean;
  courseId: string;
  subjects: CurriculumSubject[];
  course?: Course;
}

const initialFormState: Curriculum = {
  name: '',
  active: true,
  courseId: '',
  subjects: [],
};

export const Curriculums: React.FC = () => {
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Curriculum>(initialFormState);
  const [search, setSearch] = usePersistentState('curriculums_search', '');

  const fetchCurriculums = async () => {
    try {
      const response = await api.get('/curriculums');
      setCurriculums(response.data.data || response.data || []);
    } catch (error) {
      console.error('Erro ao buscar grades curriculares:', error);
    }
  };

  const fetchDependencies = async () => {
    try {
      const [coursesRes, subjectsRes] = await Promise.all([
        api.get('/courses'),
        api.get('/subjects')
      ]);
      setCourses(coursesRes.data.data || coursesRes.data || []);
      setSubjects(subjectsRes.data.data || subjectsRes.data || []);
    } catch (error) {
      console.error('Erro ao buscar dependências (cursos e disciplinas):', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCurriculums(), fetchDependencies()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleOpenNewModal = () => {
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = async (curriculum: Curriculum) => {
    try {
      // A listagem não retorna 'subjects', então buscamos a matriz completa pelo ID
      const response = await api.get(`/curriculums/${curriculum.id}`);
      const fullCurriculum = response.data.data || response.data;

      setFormData({
        ...fullCurriculum,
        // Garante que array de subjects seja mapeado de forma plana para o form
        subjects: fullCurriculum.subjects?.map((s: CurriculumSubject) => ({
          subjectId: s.subjectId,
          module: s.module
        })) || []
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes da grade:', error);
      alertDialog('Erro ao carregar os dados da grade.');
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!(await confirmDialog('Tem certeza que deseja excluir esta grade curricular?'))) return;

    try {
      await api.delete(`/curriculums/${id}`);
      fetchCurriculums();
    } catch (error) {
      console.error('Erro ao excluir grade curricular:', error);
      alertDialog('Erro ao excluir. Verifique se existem turmas vinculadas a ela.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const isEditing = !!formData.id;
      const url = isEditing ? `/api/curriculums/${formData.id}` : '/api/curriculums';

      // Constrói o payload de forma explícita para evitar envio de 'id' ou campos de timestamp do backend
      const payload = {
        name: formData.name,
        active: formData.active,
        courseId: formData.courseId,
        subjects: formData.subjects,
      };

      if (isEditing) {
        await api.patch(url, payload);
      } else {
        await api.post(url, payload);
      }

      setIsModalOpen(false);
      fetchCurriculums();
    } catch (error) {
      console.error('Erro ao salvar grade curricular:', error);
      alertDialog('Erro ao salvar os dados.');
    } finally {
      setIsSaving(false);
    }
  };

  // --- Funções de Sub-formulário (Disciplinas da Grade) ---
  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { subjectId: '', module: 1 }]
    });
  };

  const updateSubject = (index: number, field: keyof CurriculumSubject, value: string | number) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setFormData({ ...formData, subjects: newSubjects });
  };

  const removeSubject = (index: number) => {
    const newSubjects = [...formData.subjects];
    newSubjects.splice(index, 1);
    setFormData({ ...formData, subjects: newSubjects });
  };

  const filteredCurriculums = curriculums.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.course?.name && c.course.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-menu-matriz/10 text-menu-matriz rounded-xl">
              <Library size={28} />
            </div>
            Grades Curriculares
          </h1>
          <p className="text-slate-500 mt-1">Gerencie as grades, relacionando cursos e unidades curriculares.</p>
        </div>
        <button 
          onClick={handleOpenNewModal}
          className="bg-menu-matriz hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md shadow-menu-matriz/30"
        >
          <Plus size={20} />
          Nova Grade
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100">
        
        {/* Toolbar */}
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Nome da Grade</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Curso Associado</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-center">Disciplinas</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Status</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 font-medium">Carregando grades...</td>
                </tr>
              ) : filteredCurriculums.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 font-medium">Nenhuma grade cadastrada.</td>
                </tr>
              ) : (
                filteredCurriculums.map((curriculum) => (
                  <tr key={curriculum.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-800">{curriculum.name}</td>
                    <td className="py-4 px-4 text-slate-500 font-medium">{curriculum.course?.name || '-'}</td>
                    <td className="py-4 px-4 text-center font-bold text-menu-matriz">{curriculum.subjects?.length || 0} UCs</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${curriculum.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {curriculum.active ? 'Ativa' : 'Inativa'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEditModal(curriculum)}
                          className="p-2 text-slate-400 hover:text-menu-matriz hover:bg-menu-matriz/10 rounded-lg transition-colors"
                          title="Editar"
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
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Cadastro/Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 py-10">
          {/* max-w-2xl para acomodar a lista de disciplinas adequadamente */}
          <div className="bg-white rounded-4xl p-8 w-full max-w-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Grade Curricular</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nome da Grade</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-matriz outline-none transition-all text-slate-800" placeholder="Ex: Grade 2024 - Manhã" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Curso Vinculado</label>
                  <Select required value={formData.courseId} onChange={(e) => setFormData({...formData, courseId: e.target.value})} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-matriz outline-none transition-all text-slate-800 cursor-pointer">
                    <option value="">Selecione um curso...</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                  <Select value={formData.active ? 'true' : 'false'} onChange={(e) => setFormData({...formData, active: e.target.value === 'true'})} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-matriz outline-none transition-all text-slate-800 cursor-pointer">
                    <option value="true">Ativa</option>
                    <option value="false">Inativa</option>
                  </Select>
                </div>
              </div>

              {/* Seção de Unidades Curriculares */}
              <div className="mt-6 border-t border-slate-100 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-bold text-slate-700">Disciplinas da Grade</label>
                  <button type="button" onClick={addSubject} className="text-sm bg-menu-matriz/10 text-menu-matriz px-3 py-1.5 rounded-lg font-bold hover:bg-menu-matriz/20 transition-colors flex items-center gap-1">
                    <Plus size={16} /> Adicionar UC
                  </button>
                </div>

                {formData.subjects.map((sub, index) => (
                  <div key={index} className="flex items-center gap-3 mb-3 bg-slate-50 p-3 rounded-xl">
                    <div className="flex-1">
                      <Select required value={sub.subjectId} onChange={(e) => updateSubject(index, 'subjectId', e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-menu-matriz outline-none text-slate-800 text-sm cursor-pointer">
                        <option value="">Selecione a disciplina...</option>
                        {subjects.map(s => (
                          <option key={s.id} value={s.id}>{s.code ? `${s.code}: ${s.name}` : s.name} ({s.hours}h)</option>
                        ))}
                      </Select>
                    </div>
                    <div className="w-24">
                      <input required type="number" min="1" value={sub.module} onChange={(e) => updateSubject(index, 'module', parseInt(e.target.value))} placeholder="Módulo" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-menu-matriz outline-none text-slate-800 text-sm" title="Módulo/Semestre" />
                    </div>
                    <button type="button" onClick={() => removeSubject(index)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                
                {formData.subjects.length === 0 && (
                  <p className="text-sm text-slate-400 text-center py-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    Nenhuma disciplina adicionada a esta grade ainda.
                  </p>
                )}
              </div>

              <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={isSaving} className="bg-menu-matriz hover:opacity-90 disabled:opacity-70 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md shadow-menu-matriz/30">
                  {isSaving ? 'Salvando...' : 'Salvar Grade'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ContextPanel
        title="Matriz Curricular"
        description="A matriz (ou grade) vincula um curso às suas disciplinas. Ela é o molde que será aplicado nas turmas."
        icon={<Info className="text-menu-matriz" size={24} />}
        tips={[
          'Antes de criar uma matriz, você precisa ter o Curso e as Unidades Curriculares (UCs) cadastrados.',
          'Uma matriz precisa estar "Ativa" para que você possa vinculá-la a uma nova turma.',
          'Agrupe as disciplinas informando a qual módulo/semestre pertencem.'
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
            <span className="font-bold text-emerald-600">{curriculums.filter(c => c.active).length}</span>
          </div>
        </div>
      </ContextPanel>
    </div>
  );
};
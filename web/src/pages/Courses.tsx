import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, GraduationCap, X, Info } from 'lucide-react';
import { confirmDialog, alertDialog } from '../utils/dialog';
import { ContextPanel } from '../components/ContextPanel';
import { usePersistentState } from '../hooks/usePersistentState';
import api from '../services/api';

interface Course {
  id?: string | number;
  name: string;
  code: string;
}

const initialFormState: Course = {
  name: '',
  code: '',
};

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Course>(initialFormState);
  const [modalityFilter, setModalityFilter] = usePersistentState('courses_modality', 'all');
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
    (async () => { await fetchCourses(); })();
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
    if (!(await confirmDialog('Tem certeza que deseja excluir este curso?'))) return;

    try {
      await api.delete(`/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Erro ao excluir curso:', error);
      alertDialog('Erro ao excluir o curso. Verifique dependências (ex: turmas ativas).');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const isEditing = !!formData.id;
      const url = isEditing ? `/api/courses/${formData.id}` : '/api/courses';

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
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-menu-cursos/10 text-menu-cursos rounded-xl">
              <GraduationCap size={28} />
            </div>
            Cursos
          </h1>
          <p className="text-slate-500 mt-1">Gerencie os cursos oferecidos pela instituição.</p>
        </div>
        <button 
          onClick={handleOpenNewModal}
          className="bg-menu-cursos hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md shadow-menu-cursos/30"
        >
          <Plus size={20} />
          Novo Curso
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
              className="w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-cursos outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
              placeholder="Buscar curso..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
            <span>Modalidade:</span>
            <div className="flex bg-[#f8f9fc] rounded-xl p-1 gap-1">
              {[
                { id: 'all', label: 'Todas' },
                { id: 'Técnico', label: 'Técnico' },
                { id: 'Livre', label: 'Livre' },
                { id: 'Graduação', label: 'Graduação' },
                { id: 'Pós-graduação', label: 'Pós-graduação' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setModalityFilter(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${modalityFilter === s.id ? 'bg-menu-cursos text-white shadow-md' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Nome do Curso</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Código</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500 font-medium">Carregando cursos...</td>
                </tr>
              ) : filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500 font-medium">Nenhum curso cadastrado.</td>
                </tr>
              ) : (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-800">{course.name}</td>
                    <td className="py-4 px-4">
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                        {course.code}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEditModal(course)}
                          className="p-2 text-slate-400 hover:text-menu-cursos hover:bg-menu-cursos/10 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(course.id)} 
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

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100 text-sm font-medium text-slate-400">
          <span>Mostrando {courses.length} curso(s)</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">Anterior</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-800 font-bold">1</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">2</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">Próxima</button>
          </div>
        </div>
      </div>

      {/* Modal de Cadastro/Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-4xl p-8 w-full max-w-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Curso</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nome do Curso</label>
                <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-cursos outline-none transition-all text-slate-800" placeholder="Ex: Técnico em Informática" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Código</label>
                <input required value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} type="text" className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-cursos outline-none transition-all text-slate-800" placeholder="Ex: TI" />
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={isSaving} className="bg-menu-cursos hover:opacity-90 disabled:opacity-70 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md shadow-menu-cursos/30">
                  {isSaving ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ContextPanel
        title="Cursos"
        description="Cadastre os cursos oferecidos. A criação de cursos é o primeiro passo para poder estruturar as grades curriculares do semestre."
        icon={<Info className="text-menu-cursos" size={24} />}
        tips={[
          'O cadastro de cursos é a base para organizar as formações da instituição.',
          'Após criar um curso, o próximo passo é acessar "Matriz Curricular" para montar a grade de disciplinas.'
        ]}
      >
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mt-4">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <GraduationCap size={16} className="text-menu-cursos" /> Resumo
          </h4>
          <div className="flex justify-between items-center text-xs text-slate-600">
            <span>Cursos Cadastrados:</span>
            <span className="font-bold">{courses.length}</span>
          </div>
        </div>
      </ContextPanel>
    </div>
  );
};
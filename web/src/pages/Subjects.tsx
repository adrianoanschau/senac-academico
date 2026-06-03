import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, BookOpen, X } from 'lucide-react';
import axios from 'axios';

interface Subject {
  id?: string | number;
  name: string;
  code: string;
  hours: number;
}

const initialFormState: Subject = {
  name: '',
  hours: 0,
  code: '',
};

export const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Subject>(initialFormState);

  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/subjects');
      setSubjects(response.data.data || []);
    } catch (error) {
      console.error('Erro ao buscar unidades curriculares:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => { await fetchSubjects(); })();
  }, []);

  const handleOpenNewModal = () => {
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (subject: Subject) => {
    setFormData(subject);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string | number | undefined) => {
    if (!id) return;
    if (!window.confirm('Tem certeza que deseja excluir esta unidade curricular?')) return;

    try {
      await axios.delete(`/api/subjects/${id}`);
      fetchSubjects();
    } catch (error) {
      console.error('Erro ao excluir unidade curricular:', error);
      alert('Erro ao excluir. Verifique dependências antes de remover.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const isEditing = !!formData.id;
      const url = isEditing ? `/api/subjects/${formData.id}` : '/api/subjects';

      const payload: Partial<Subject> = { ...formData };
      if (!isEditing) delete payload.id;

      if (isEditing) {
        await axios.patch(url, payload);
      } else {
        await axios.post(url, payload);
      }

      setIsModalOpen(false);
      fetchSubjects();
    } catch (error) {
      console.error('Erro ao salvar unidade curricular:', error);
      alert('Erro ao salvar os dados.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-500 rounded-xl">
              <BookOpen size={28} />
            </div>
            Unidades Curriculares
          </h1>
          <p className="text-slate-500 mt-1">Gerencie a base de disciplinas e suas cargas horárias.</p>
        </div>
        <button 
          onClick={handleOpenNewModal}
          className="bg-[#004a8d] hover:bg-[#00386b] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-[0_4px_14px_rgb(0,74,141,0.3)]"
        >
          <Plus size={20} />
          Nova Disciplina
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100">
        
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              className="w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
              placeholder="Buscar unidade curricular..."
            />
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
            <span>Eixo Tecnológico:</span>
            <select className="bg-[#f8f9fc] border-none rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#004a8d] cursor-pointer">
              <option value="all">Todos os Eixos</option>
              <option value="ti">Tecnologia</option>
              <option value="design">Design</option>
              <option value="comum">Base Comum</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Nome da UC</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Código</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-center">Carga Horária Total</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500 font-medium">Carregando disciplinas...</td>
                </tr>
              ) : subjects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500 font-medium">Nenhuma disciplina cadastrada.</td>
                </tr>
              ) : (
                subjects.map((subject) => (
                  <tr key={subject.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-800">{subject.name}</td>
                    <td className="py-4 px-4 text-slate-500 font-medium">{subject.code}</td>
                    <td className="py-4 px-4 text-center font-bold text-[#f37021]">{subject.hours} horas</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEditModal(subject)}
                          className="p-2 text-slate-400 hover:text-[#004a8d] hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(subject.id)}
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
          <span>Mostrando {subjects.length} disciplina(s)</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">Anterior</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-800 font-bold">1</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">2</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">3</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">Próxima</button>
          </div>
        </div>

      </div>

      {/* Modal de Cadastro/Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Unidade Curricular</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nome da UC</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" placeholder="Ex: Lógica de Programação" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Código da UC</label>
                <input required type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" placeholder="Ex: LP" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Carga Horária Total</label>
                <input required type="number" value={formData.hours} onChange={(e) => setFormData({...formData, hours: Number(e.target.value)})} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" placeholder="Ex: 60" />
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={isSaving} className="bg-[#004a8d] hover:bg-[#00386b] disabled:opacity-70 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-[0_4px_14px_rgb(0,74,141,0.3)]">
                  {isSaving ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

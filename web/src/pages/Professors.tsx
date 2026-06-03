import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2, Users, X } from 'lucide-react';
import axios from 'axios';

interface Professor {
  id?: string | number;
  name: string;
  email: string;
  degree: string;
}

const initialFormState: Professor = {
  name: '',
  email: '',
  degree: '',
};

export const Professors: React.FC = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Professor>(initialFormState);

  const fetchProfessors = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/professors');
      setProfessors(response.data.data || []);
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
      console.log('Erro ao carregar a lista de professores.');
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
    if (!window.confirm('Tem certeza que deseja excluir este professor?')) return;
    
    try {
      await axios.delete(`/api/professors/${id}`);
      
      fetchProfessors();
    } catch (error) {
      console.error('Erro ao excluir professor:', error);
      alert('Erro ao excluir professor. Verifique se ele está vinculado a alguma turma.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const isEditing = !!formData.id;
      const url = isEditing 
        ? `/api/professors/${formData.id}`
        : '/api/professors';
        
      const payload = { ...formData };
      if (!isEditing) delete payload.id;

      if (isEditing) {
        await axios.patch(url, payload);
      } else {
        await axios.post(url, payload);
      }
      
      setIsModalOpen(false);
      fetchProfessors();
    } catch (error) {
      console.error('Erro ao salvar professor:', error);
      alert('Erro ao salvar os dados do professor.');
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
            <div className="p-2 bg-blue-50 text-[#004a8d] rounded-xl">
              <Users size={28} />
            </div>
            Professores
          </h1>
          <p className="text-slate-500 mt-1">Gerencie o corpo docente da instituição.</p>
        </div>
        <button 
          onClick={handleOpenNewModal}
          className="bg-[#f37021] hover:bg-[#d96017] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-[0_4px_14px_rgb(243,112,33,0.3)]"
        >
          <Plus size={20} />
          Novo Professor
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
              placeholder="Buscar professor..."
            />
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
            <span>Filtros:</span>
            <select className="bg-[#f8f9fc] border-none rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#004a8d] cursor-pointer">
              <option value="all">Todos os Status</option>
              <option value="ativo">Ativos</option>
              <option value="inativo">Inativos</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Nome</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">E-mail</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Especialidade</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Status</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 font-medium">Carregando professores...</td>
                </tr>
              ) : professors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 font-medium">Nenhum professor cadastrado.</td>
                </tr>
              ) : (professors.map((prof) => (
                <tr key={prof.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                        {prof.name ? prof.name.charAt(0).toUpperCase() : 'P'}
                      </div>
                      <span className="font-bold text-slate-800">{prof.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-medium">{prof.email}</td>
                  <td className="py-4 px-4 text-slate-500 font-medium">{prof.degree}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenEditModal(prof)}
                        className="p-2 text-slate-400 hover:text-[#004a8d] hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => prof.id && handleDelete(prof.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100 text-sm font-medium text-slate-400">
          <span>Mostrando {professors.length} professor(es)</span>
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
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Professor</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nome Completo</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" placeholder="Ex: João da Silva" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">E-mail Institucional</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" placeholder="joao.silva@senac.br" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Especialidade Técnica</label>
                <input type="text" required value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" placeholder="Ex: Programação Web" />
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={isSaving} className="bg-[#f37021] hover:bg-[#d96017] disabled:opacity-70 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-[0_4px_14px_rgb(243,112,33,0.3)]">
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

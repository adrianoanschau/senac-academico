import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, MapPin, X, Info } from 'lucide-react';
import axios from 'axios';
import { Select } from '../components/Select';
import { confirmDialog, alertDialog } from '../utils/dialog';
import { ContextPanel } from '../components/ContextPanel';

interface Room {
  id?: string | number;
  name: string;
  type: string;
  capacity: number;
}

const initialFormState: Room = {
  name: '',
  type: 'Sala Teórica',
  capacity: 0,
};

export const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Room>(initialFormState);
  const [typeFilter, setTypeFilter] = useState('all');

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/rooms');
      setRooms(response.data.data || []);
    } catch (error) {
      console.error('Erro ao buscar salas:', error);
      // keep existing empty state
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => { await fetchRooms(); })();
  }, []);

  const handleOpenNewModal = () => {
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (room: Room) => {
    setFormData(room);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string | number | undefined) => {
    if (!id) return;
    if (!(await confirmDialog('Tem certeza que deseja excluir esta sala?'))) return;

    try {
      await axios.delete(`/api/rooms/${id}`);
      fetchRooms();
    } catch (error) {
      console.error('Erro ao excluir sala:', error);
      alertDialog('Erro ao excluir a sala. Verifique dependências.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const isEditing = !!formData.id;
      const url = isEditing ? `/api/rooms/${formData.id}` : '/api/rooms';

  const payload: Partial<Room> = { ...formData };
      if (!isEditing) delete payload.id;

      if (isEditing) {
        await axios.patch(url, payload);
      } else {
        await axios.post(url, payload);
      }

      setIsModalOpen(false);
      fetchRooms();
    } catch (error) {
      console.error('Erro ao salvar sala:', error);
      alertDialog('Erro ao salvar os dados da sala.');
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
            <div className="p-2 bg-menu-salas/10 text-menu-salas rounded-xl">
              <MapPin size={28} />
            </div>
            Salas e Ambientes
          </h1>
          <p className="text-slate-500 mt-1">Gerencie os espaços físicos e alocações.</p>
        </div>
        <button 
          onClick={handleOpenNewModal}
          className="bg-menu-salas hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md shadow-menu-salas/30"
        >
          <Plus size={20} />
          Nova Sala
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
              className="w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-salas outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
              placeholder="Buscar ambiente..."
            />
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
             <span>Tipo:</span>
             <div className="flex bg-[#f8f9fc] rounded-xl p-1 gap-1">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'lab', label: 'Laboratórios' },
                { id: 'sala', label: 'Salas Teóricas' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setTypeFilter(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${typeFilter === s.id ? 'bg-menu-salas text-white shadow-md' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'}`}
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
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Nome/Número</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Tipo</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Capacidade</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500 font-medium">Carregando salas...</td>
                </tr>
              ) : rooms.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500 font-medium">Nenhuma sala cadastrada.</td>
                </tr>
              ) : (
                rooms.map((sala) => (
                  <tr key={sala.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-800">{sala.name}</td>
                    <td className="py-4 px-4 text-slate-500 font-medium">{sala.type}</td>
                    <td className="py-4 px-4 text-slate-500 font-medium">{sala.capacity} alunos</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEditModal(sala)}
                          className="p-2 text-slate-400 hover:text-menu-salas hover:bg-menu-salas/10 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(sala.id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Excluir">
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
          <span>Mostrando {rooms.length} sala(s)</span>
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
              <h2 className="text-2xl font-bold text-slate-800">Sala / Ambiente</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nome ou Número</label>
                <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-salas outline-none transition-all text-slate-800" placeholder="Ex: Laboratório 203" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tipo de Ambiente</label>
                <Select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-salas outline-none transition-all text-slate-800 cursor-pointer">
                  <option value="Laboratório de TI">Laboratório de TI</option>
                  <option value="Sala Teórica">Sala Teórica</option>
                  <option value="Laboratório Prático">Laboratório Prático</option>
                  <option value="Auditório">Auditório</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Capacidade Máxima (Alunos)</label>
                <input required value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})} type="number" className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-salas outline-none transition-all text-slate-800" placeholder="Ex: 30" />
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={isSaving} className="bg-menu-salas hover:opacity-90 disabled:opacity-70 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md shadow-menu-salas/30">
                  {isSaving ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ContextPanel
        title="Salas e Ambientes"
        description="Cadastre as salas, laboratórios e auditórios. Verifique sempre a capacidade máxima para evitar conflitos com o número de alunos das turmas."
        icon={<Info className="text-menu-salas" size={24} />}
        tips={[
          'Diferencie bem as Salas Teóricas dos Laboratórios Práticos.',
          'Fique atento à capacidade do ambiente, ela deverá ser suficiente para abrigar a turma alocada lá.'
        ]}
      >
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mt-4">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <MapPin size={16} className="text-menu-salas" /> Resumo
          </h4>
          <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
            <span>Total de Ambientes:</span>
            <span className="font-bold">{rooms.length}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
            <span>Salas Teóricas:</span>
            <span className="font-bold">{rooms.filter(r => r.type === 'Sala Teórica').length}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
            <span>Laboratórios:</span>
            <span className="font-bold">{rooms.filter(r => r.type.includes('Laboratório')).length}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-600">
            <span>Capacidade Total:</span>
            <span className="font-bold">{rooms.reduce((acc, curr) => acc + (curr.capacity || 0), 0)} vagas</span>
          </div>
        </div>
      </ContextPanel>
    </div>
  );
};

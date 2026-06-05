import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, CalendarDays, X } from 'lucide-react';
import axios from 'axios';

interface ScheduleOverride {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  type: string;
}

export const CalendarReserves: React.FC = () => {
  const [feriados, setFeriados] = useState<ScheduleOverride[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    type: 'BLOCK',
  });

  const fetchOverrides = async () => {
    try {
      const response = await axios.get('/api/schedule-overrides');
      setFeriados(response.data.data || response.data);
    } catch (error) {
      console.error('Erro ao buscar feriados/reservas:', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOverrides();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      startTime: new Date(formData.startTime).toISOString(),
      endTime: new Date(formData.endTime).toISOString(),
      type: formData.type,
    };

    try {
      await axios.post('/api/schedule-overrides', payload);
      alert('Reserva/Bloqueio salvo com sucesso!');
      setFormData({ title: '', startTime: '', endTime: '', type: 'BLOCK' });
      setIsModalOpen(false);
      fetchOverrides();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Ocorreu um erro ao conectar com a API.';
        alert(`Erro ao criar a reserva: ${errorMessage}`);
      } else {
        alert('Ocorreu um erro inesperado ao salvar a reserva.');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja remover esta reserva/bloqueio?')) return;
    try {
      await axios.delete(`/api/schedule-overrides/${id}`);
      alert('Removido com sucesso!');
      fetchOverrides();
    } catch (error) {
      console.error(error);
      alert('Erro ao remover.');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-rose-50 text-rose-500 rounded-xl">
              <CalendarDays size={28} />
            </div>
            Calendário Base
          </h1>
          <p className="text-slate-500 mt-1">Gerencie reservas de calendário (sobrescrita do padrão de dias letivos e não letivos).</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#f37021] hover:bg-[#d96017] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-[0_4px_14px_rgb(243,112,33,0.3)]"
        >
          <Plus size={20} />
          Adicionar Feriado
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
              className="w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#f37021] outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
              placeholder="Buscar feriado..."
            />
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
            <span>Ano Base:</span>
            <select className="bg-[#f8f9fc] border-none rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#f37021] cursor-pointer font-bold text-slate-800">
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Título</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Início</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Término</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Tipo</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {feriados.map((feriado) => (
                <tr key={feriado.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-800">{feriado.title}</td>
                  <td className="py-4 px-4 font-bold text-[#004a8d]">{new Date(feriado.startTime).toLocaleString()}</td>
                  <td className="py-4 px-4 font-bold text-[#004a8d]">{new Date(feriado.endTime).toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                      {feriado.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="p-2 text-slate-400 hover:text-[#004a8d] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(feriado.id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Cadastro/Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Feriado / Recesso</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Título</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#f37021] outline-none transition-all text-slate-800" placeholder="Ex: Paixão de Cristo" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Data de Início</label>
                  <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleInputChange} required className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#f37021] outline-none transition-all text-slate-800" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Data de Término</label>
                  <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleInputChange} required className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#f37021] outline-none transition-all text-slate-800" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tipo</label>
                <select name="type" value={formData.type} onChange={handleInputChange} required className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#f37021] outline-none transition-all text-slate-800 cursor-pointer">
                  <option value="BLOCK">BLOCK (Bloqueio / Feriado)</option>
                  <option value="RESERVE">RESERVE (Reserva)</option>
                </select>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="bg-[#f37021] hover:bg-[#d96017] text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-[0_4px_14px_rgb(243,112,33,0.3)]">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

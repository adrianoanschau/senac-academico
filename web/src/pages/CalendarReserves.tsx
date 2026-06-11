import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, CalendarDays, X, Calendar, Clock, Check, Info } from 'lucide-react';
import axios from 'axios';
import { Select } from '../components/Select';
import { DateSelect } from '../components/DateSelect';
import { TimeSelect } from '../components/TimeSelect';
import { confirmDialog, alertDialog } from '../utils/dialog';
import { ContextPanel } from '../components/ContextPanel';
import { usePersistentState } from '../hooks/usePersistentState';
import api from '../services/api';

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
  const [isAllDay, setIsAllDay] = useState(true);
  const [yearFilter, setYearFilter] = usePersistentState('reserves_year', '2026');
  const [search, setSearch] = usePersistentState('reserves_search', '');

  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    type: 'BLOCK',
  });

  const fetchOverrides = async () => {
    try {
      const response = await api.get('/schedule-overrides');
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
    
    const finalStartTime = isAllDay ? '00:00' : formData.startTime;
    const finalEndTime = isAllDay ? '23:59' : formData.endTime;

    if (!formData.startDate || !finalStartTime || !formData.endDate || !finalEndTime) {
      alertDialog('Preencha as datas e horários corretamente.');
      return;
    }

    const payload = {
      title: formData.title,
      startTime: new Date(`${formData.startDate}T${finalStartTime}:00`).toISOString(),
      endTime: new Date(`${formData.endDate}T${finalEndTime}:00`).toISOString(),
      type: formData.type,
    };

    try {
      await api.post('/schedule-overrides', payload);
      alertDialog('Período Especial salvo com sucesso!');
      setFormData({ title: '', startDate: '', startTime: '', endDate: '', endTime: '', type: 'BLOCK' });
      setIsAllDay(true);
      setIsModalOpen(false);
      fetchOverrides();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Ocorreu um erro ao conectar com a API.';
        alertDialog(`Erro ao criar a reserva: ${errorMessage}`);
      } else {
        alertDialog('Ocorreu um erro inesperado ao salvar a reserva.');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!(await confirmDialog('Tem certeza que deseja remover esta reserva/bloqueio?'))) return;
    try {
      await api.delete(`/schedule-overrides/${id}`);
      alertDialog('Removido com sucesso!');
      fetchOverrides();
    } catch (error) {
      console.error(error);
      alertDialog('Erro ao remover.');
    }
  };

  const filteredFeriados = feriados.filter((f) => {
    const matchesSearch = f.title.toLowerCase().includes(search.toLowerCase());
    const matchesYear = yearFilter === 'all' || new Date(f.startTime).getFullYear().toString() === yearFilter;
    return matchesSearch && matchesYear;
  });

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-menu-especiais/10 text-menu-especiais rounded-xl">
              <CalendarDays size={28} />
            </div>
            Períodos Especiais
          </h1>
          <p className="text-slate-500 mt-1">Gerencie períodos especiais (sobrescrita do padrão de dias letivos e não letivos).</p>
        </div>
        <button 
          onClick={() => {
            setFormData({ title: '', startDate: '', startTime: '', endDate: '', endTime: '', type: 'BLOCK' });
            setIsAllDay(true);
            setIsModalOpen(true);
          }}
          className="bg-menu-especiais hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md shadow-menu-especiais/30"
        >
          <Plus size={20} />
          Adicionar Período Especial
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
              className="w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-especiais outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
              placeholder="Buscar feriado..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
            <span>Ano Base:</span>
            <div className="flex bg-[#f8f9fc] rounded-xl p-1 gap-1">
              {[
                { id: 'all', label: 'Todos' },
                { id: '2026', label: '2026' },
                { id: '2025', label: '2025' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setYearFilter(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${yearFilter === s.id ? 'bg-menu-especiais text-white shadow-md' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'}`}
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
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Título</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Início</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Término</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Tipo</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right"></th>
              </tr>
            </thead>
            <tbody>
              {filteredFeriados.map((feriado) => (
                <tr key={feriado.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-800">{feriado.title}</td>
                  <td className="py-4 px-4 font-bold text-menu-especiais">{new Date(feriado.startTime).toLocaleString()}</td>
                  <td className="py-4 px-4 font-bold text-menu-especiais">{new Date(feriado.endTime).toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                      {feriado.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="p-2 text-slate-400 hover:text-menu-especiais hover:bg-menu-especiais/10 rounded-lg transition-colors"
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
          <div className="bg-white rounded-4xl p-8 w-full max-w-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Períodos Especiais</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Título</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-especiais outline-none transition-all text-slate-800" placeholder="Ex: Paixão de Cristo" />
              </div>
              
              <label className="flex items-center gap-3 cursor-pointer select-none w-fit">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={isAllDay}
                    onChange={(e) => setIsAllDay(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-menu-especiais peer-focus-visible:ring-offset-2 ${isAllDay ? 'bg-menu-especiais border-menu-especiais' : 'bg-[#f8f9fc] border-slate-300'}`}>
                    {isAllDay && <Check size={14} className="text-white" strokeWidth={3} />}
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-700">
                  Dia todo
                </span>
              </label>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Início</label>
                <div className="flex gap-3">
                  <div className="relative group flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-menu-especiais transition-colors z-10">
                      <Calendar size={18} strokeWidth={2.5} />
                    </div>
                    <DateSelect 
                      value={formData.startDate} 
                      onChange={(val) => setFormData(prev => ({
                        ...prev, 
                        startDate: val,
                        endDate: !prev.endDate || prev.endDate < val ? val : prev.endDate
                      }))} 
                      placeholder="DD/MM/AAAA" 
                    />
                  </div>
                  <div className={`relative group w-36 transition-opacity ${isAllDay ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-menu-especiais transition-colors z-10">
                      <Clock size={18} strokeWidth={2.5} />
                    </div>
                    <TimeSelect value={isAllDay ? '00:00' : formData.startTime} onChange={(val) => setFormData({...formData, startTime: val})} placeholder="--:--" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Término</label>
                <div className="flex gap-3">
                  <div className="relative group flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-menu-especiais transition-colors z-10">
                      <Calendar size={18} strokeWidth={2.5} />
                    </div>
                    <DateSelect value={formData.endDate} onChange={(val) => setFormData({...formData, endDate: val})} placeholder="DD/MM/AAAA" />
                  </div>
                  <div className={`relative group w-36 transition-opacity ${isAllDay ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-menu-especiais transition-colors z-10">
                      <Clock size={18} strokeWidth={2.5} />
                    </div>
                    <TimeSelect value={isAllDay ? '23:59' : formData.endTime} onChange={(val) => setFormData({...formData, endTime: val})} placeholder="--:--" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tipo</label>
                <Select name="type" value={formData.type} onChange={handleInputChange} required className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-especiais outline-none transition-all text-slate-800 cursor-pointer">
                  <option value="BLOCK">Período Não Letivo / Feriado</option>
                  <option value="EXTRA_DAY">Período Letivo Extraordinário</option>
                </Select>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="bg-menu-especiais hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md shadow-menu-especiais/30">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ContextPanel
        title="Períodos Especiais"
        description="Configure feriados e dias não letivos. Eles influenciam a geração automática, impedindo que aulas caiam em datas bloqueadas."
        icon={<Info className="text-menu-especiais" size={24} />}
        tips={[
          'Dias configurados como bloqueios evitam o agendamento automático de aulas.',
          'Você pode configurar bloqueios de dia inteiro ou para horários muito específicos.',
          'Mantenha o calendário escolar atualizado para maior precisão do Cronograma.'
        ]}
      >
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mt-4">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <CalendarDays size={16} className="text-menu-especiais" /> Resumo
          </h4>
          <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
            <span>Total de Períodos:</span>
            <span className="font-bold">{feriados.length}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-600">
            <span>Feriados/Bloqueios:</span>
            <span className="font-bold text-rose-500">{feriados.filter(f => f.type === 'BLOCK').length}</span>
          </div>
        </div>
      </ContextPanel>
    </div>
  );
};

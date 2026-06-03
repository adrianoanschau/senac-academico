import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, CalendarClock, X } from 'lucide-react';

export const Aulas: React.FC = () => {
  const [aulas] = useState([
    { id: 1, turma: 'TIN24-1M', disciplina: 'Lógica de Programação', professor: 'Carlos Silva', sala: 'Lab 01', data: '2026-06-02', inicio: '08:00', fim: '12:00', status: 'Realizado' },
    { id: 2, turma: 'ENF24-1N', disciplina: 'Anatomia', professor: 'Maria Souza', sala: 'Sala 102', data: '2026-06-02', inicio: '19:00', fim: '22:30', status: 'Previsto' },
    { id: 3, turma: 'DSG24-2T', disciplina: 'Design Thinking', professor: 'Ana Clara', sala: 'Lab Mac', data: '2026-06-03', inicio: '13:30', fim: '17:30', status: 'Cancelado' },
    { id: 4, turma: 'ADM25-1M', disciplina: 'Gestão de Pessoas', professor: 'Roberto Alves', sala: 'Sala 205', data: '2026-06-03', inicio: '08:00', fim: '12:00', status: 'Substituído' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-[#004a8d] rounded-xl">
              <CalendarClock size={28} />
            </div>
            Aulas / Encontros
          </h1>
          <p className="text-slate-500 mt-1">Gerencie os encontros (aulas) de cada turma.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#004a8d] hover:bg-[#00386b] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-[0_4px_14px_rgb(0,74,141,0.3)]"
        >
          <Plus size={20} />
          Nova Aula
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
              placeholder="Buscar aula..."
            />
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
            <span>Status:</span>
            <select className="bg-[#f8f9fc] border-none rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#004a8d] cursor-pointer">
              <option value="all">Todos os Status</option>
              <option value="Previsto">Previsto</option>
              <option value="Realizado">Realizado</option>
              <option value="Cancelado">Cancelado</option>
              <option value="Substituído">Substituído</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Turma / Disciplina</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Data & Horário</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Professor / Sala</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Status</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {aulas.map((aula) => (
                <tr key={aula.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-800">
                    <div className="text-[#004a8d]">{aula.turma}</div>
                    <div className="text-sm font-medium text-slate-500">{aula.disciplina}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-slate-800 font-bold">{aula.data}</div>
                    <div className="text-sm font-medium text-slate-500">{aula.inicio} - {aula.fim}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-slate-800 font-medium">{aula.professor}</div>
                    <div className="text-sm text-slate-500">{aula.sala}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      aula.status === 'Previsto' ? 'bg-blue-100 text-blue-700' :
                      aula.status === 'Realizado' ? 'bg-emerald-100 text-emerald-700' :
                      aula.status === 'Cancelado' ? 'bg-rose-100 text-rose-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {aula.status}
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
                      <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
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
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Aula / Encontro</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form className="flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Turma</label>
                  <select className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 cursor-pointer">
                    <option value="">Selecione uma turma...</option>
                    <option value="1">TIN24-1M</option>
                    <option value="2">ENF24-1N</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Disciplina (UC)</label>
                  <select className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 cursor-pointer">
                    <option value="">Selecione uma disciplina...</option>
                    <option value="1">Lógica de Programação</option>
                    <option value="2">Anatomia</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Professor</label>
                  <select className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 cursor-pointer">
                    <option value="">Selecione um professor...</option>
                    <option value="1">Carlos Silva</option>
                    <option value="2">Maria Souza</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Sala</label>
                  <select className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 cursor-pointer">
                    <option value="">Selecione uma sala...</option>
                    <option value="1">Lab 01</option>
                    <option value="2">Sala 102</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Data da Aula</label>
                  <input type="date" className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Início</label>
                  <input type="time" className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Fim</label>
                  <input type="time" className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                  <select className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 cursor-pointer">
                    <option value="Previsto">Previsto</option>
                    <option value="Realizado">Realizado</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Substituído">Substituído</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Conteúdo Previsto (Opcional)</label>
                <textarea 
                  rows={3} 
                  className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 resize-none placeholder-slate-400"
                  placeholder="Descreva brevemente o conteúdo a ser ministrado..."
                ></textarea>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">
                  Cancelar
                </button>
                <button type="button" className="bg-[#004a8d] hover:bg-[#00386b] text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-[0_4px_14px_rgb(0,74,141,0.3)]">
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

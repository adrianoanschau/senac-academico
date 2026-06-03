import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Layers, X } from 'lucide-react';

export const Turmas: React.FC = () => {
  const [turmas] = useState([
    { id: 1, codigo: 'TIN24-1M', inicio: '05/02/2024', fim: '15/12/2025', turno: 'Manhã' },
    { id: 2, codigo: 'ENF24-1N', inicio: '05/02/2024', fim: '20/12/2026', turno: 'Noite' },
    { id: 3, codigo: 'DSG24-2T', inicio: '12/08/2024', fim: '10/12/2025', turno: 'Tarde' },
    { id: 4, codigo: 'ADM25-1M', inicio: '03/02/2025', fim: '15/12/2026', turno: 'Manhã' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Layers size={28} />
            </div>
            Turmas
          </h1>
          <p className="text-slate-500 mt-1">Gerencie os grupos de alunos e seus períodos letivos.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#004a8d] hover:bg-[#00386b] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-[0_4px_14px_rgb(0,74,141,0.3)]"
        >
          <Plus size={20} />
          Nova Turma
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
              placeholder="Buscar turma..."
            />
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
            <span>Turno:</span>
            <select className="bg-[#f8f9fc] border-none rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#004a8d] cursor-pointer">
              <option value="all">Todos os Turnos</option>
              <option value="Manhã">Manhã</option>
              <option value="Tarde">Tarde</option>
              <option value="Noite">Noite</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Código da Turma</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Data de Início</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Data de Término</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Turno</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map((turma) => (
                <tr key={turma.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                        {turma.codigo.substring(0, 2)}
                      </div>
                      <span className="font-bold text-[#004a8d]">{turma.codigo}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-medium">{turma.inicio}</td>
                  <td className="py-4 px-4 text-slate-500 font-medium">{turma.fim}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      turma.turno === 'Manhã' ? 'bg-amber-100 text-amber-700' :
                      turma.turno === 'Tarde' ? 'bg-orange-100 text-orange-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {turma.turno}
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
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Turma</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Código da Turma</label>
                <input type="text" className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 uppercase" placeholder="Ex: ENF24-1N3R" />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Data de Início</label>
                  <input type="date" className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Término Previsto</label>
                  <input type="date" className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Turno</label>
                <select className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 cursor-pointer">
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                  <option value="Integral">Integral</option>
                </select>
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

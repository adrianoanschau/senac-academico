import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, CalendarDays } from 'lucide-react';

export const Feriados: React.FC = () => {
  const [feriados] = useState([
    { id: 1, data: '01/01/2026', descricao: 'Confraternização Universal', abrangencia: 'Nacional' },
    { id: 2, data: '17/02/2026', descricao: 'Carnaval', abrangencia: 'Nacional' },
    { id: 3, data: '03/04/2026', descricao: 'Paixão de Cristo', abrangencia: 'Nacional' },
    { id: 4, data: '21/04/2026', descricao: 'Tiradentes', abrangencia: 'Nacional' },
    { id: 5, data: '15/10/2026', descricao: 'Dia do Professor', abrangencia: 'Recesso Escolar' },
  ]);

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
          <p className="text-slate-500 mt-1">Gerencie feriados e recessos (dias não letivos).</p>
        </div>
        <button className="bg-[#f37021] hover:bg-[#d96017] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-[0_4px_14px_rgb(243,112,33,0.3)]">
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
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Data</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Descrição</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Abrangência</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {feriados.map((feriado) => (
                <tr key={feriado.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#004a8d]">{feriado.data}</td>
                  <td className="py-4 px-4 font-bold text-slate-800">{feriado.descricao}</td>
                  <td className="py-4 px-4">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                      {feriado.abrangencia}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-[#004a8d] hover:bg-blue-50 rounded-lg transition-colors">
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
    </div>
  );
};

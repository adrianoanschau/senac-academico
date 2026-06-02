import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, MapPin } from 'lucide-react';

export const Salas: React.FC = () => {
  const [salas] = useState([
    { id: 1, nome: 'Laboratório 203', tipo: 'Laboratório de TI', capacidade: 30, status: 'Livre' },
    { id: 2, nome: 'Sala 101', tipo: 'Sala Teórica', capacidade: 45, status: 'Em uso' },
    { id: 3, nome: 'Laboratório Maker', tipo: 'Laboratório Prático', capacidade: 20, status: 'Livre' },
    { id: 4, nome: 'Auditório Principal', tipo: 'Auditório', capacidade: 150, status: 'Manutenção' },
  ]);

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-orange-50 text-[#f37021] rounded-xl">
              <MapPin size={28} />
            </div>
            Salas e Ambientes
          </h1>
          <p className="text-slate-500 mt-1">Gerencie os espaços físicos e alocações.</p>
        </div>
        <button className="bg-[#004a8d] hover:bg-[#00386b] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-[0_4px_14px_rgb(0,74,141,0.3)]">
          <Plus size={20} />
          Nova Sala
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
              placeholder="Buscar ambiente..."
            />
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
             <span>Tipo:</span>
             <select className="bg-[#f8f9fc] border-none rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#f37021] cursor-pointer">
              <option value="all">Todos os tipos</option>
              <option value="lab">Laboratórios</option>
              <option value="sala">Salas Teóricas</option>
            </select>
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
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Status</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {salas.map((sala) => (
                <tr key={sala.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-800">{sala.nome}</td>
                  <td className="py-4 px-4 text-slate-500 font-medium">{sala.tipo}</td>
                  <td className="py-4 px-4 text-slate-500 font-medium">{sala.capacidade} alunos</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      sala.status === 'Livre' ? 'bg-green-100 text-green-700' : 
                      sala.status === 'Em uso' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {sala.status}
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

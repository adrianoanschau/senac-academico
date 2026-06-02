import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2, Users } from 'lucide-react';

export const Professores: React.FC = () => {
  const [professores] = useState([
    { id: 1, nome: 'Ana Paula Silva', email: 'ana.silva@senac.br', especialidade: 'Programação Web', status: 'Ativo' },
    { id: 2, nome: 'Carlos Eduardo Souza', email: 'carlos.souza@senac.br', especialidade: 'Banco de Dados', status: 'Ativo' },
    { id: 3, nome: 'Mariana Costa', email: 'mariana.costa@senac.br', especialidade: 'Design Gráfico', status: 'Inativo' },
    { id: 4, nome: 'Roberto Alves', email: 'roberto.alves@senac.br', especialidade: 'Redes de Computadores', status: 'Ativo' },
  ]);

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
        <button className="bg-[#f37021] hover:bg-[#d96017] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-[0_4px_14px_rgb(243,112,33,0.3)]">
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
              {professores.map((prof) => (
                <tr key={prof.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                        {prof.nome.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800">{prof.nome}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-medium">{prof.email}</td>
                  <td className="py-4 px-4 text-slate-500 font-medium">{prof.especialidade}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      prof.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {prof.status}
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
                      <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100 text-sm font-medium text-slate-400">
          <span>Mostrando 1 a 4 de 24 professores</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">Anterior</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-800 font-bold">1</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">2</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">Próxima</button>
          </div>
        </div>

      </div>
    </div>
  );
};

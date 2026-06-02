import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, BookOpen } from 'lucide-react';

export const Disciplinas: React.FC = () => {
  const [disciplinas] = useState([
    { id: 1, nome: 'Lógica de Programação', ch: 60, eixo: 'Tecnologia' },
    { id: 2, nome: 'Banco de Dados', ch: 80, eixo: 'Tecnologia' },
    { id: 3, nome: 'Comunicação Empresarial', ch: 40, eixo: 'Comum' },
    { id: 4, nome: 'Design de Interfaces (UI)', ch: 60, eixo: 'Design' },
    { id: 5, nome: 'Desenvolvimento Web Front-end', ch: 120, eixo: 'Tecnologia' },
  ]);

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
        <button className="bg-[#004a8d] hover:bg-[#00386b] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-[0_4px_14px_rgb(0,74,141,0.3)]">
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
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Eixo Tecnológico</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-center">Carga Horária Total</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {disciplinas.map((disc) => (
                <tr key={disc.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-800">{disc.nome}</td>
                  <td className="py-4 px-4 text-slate-500 font-medium">{disc.eixo}</td>
                  <td className="py-4 px-4 text-center font-bold text-[#f37021]">{disc.ch} horas</td>
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

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100 text-sm font-medium text-slate-400">
          <span>Mostrando 1 a 5 de 42 disciplinas</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-800 font-bold">1</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">2</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">3</button>
          </div>
        </div>

      </div>
    </div>
  );
};

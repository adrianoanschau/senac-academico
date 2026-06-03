import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Network, X } from 'lucide-react';

export const Curriculum: React.FC = () => {
  const [vinculos] = useState([
    { id: 1, turma: 'TIN24-1M', disciplina: 'Lógica de Programação', professor: 'Ana Paula Silva' },
    { id: 2, turma: 'TIN24-1M', disciplina: 'Banco de Dados', professor: 'Carlos Eduardo Souza' },
    { id: 3, turma: 'ENF24-1N', disciplina: 'Anatomia Humana', professor: 'Juliana Mendes' },
    { id: 4, turma: 'DSG24-2T', disciplina: 'Design de Interfaces (UI)', professor: 'Mariana Costa' },
    { id: 5, turma: 'ADM25-1M', disciplina: 'Comunicação Empresarial', professor: 'Roberto Alves' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Network size={28} />
            </div>
            Matriz Curricular da Turma
          </h1>
          <p className="text-slate-500 mt-1">Vincule as Unidades Curriculares (UCs) e Professores às Turmas.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#f37021] hover:bg-[#d96017] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-[0_4px_14px_rgb(243,112,33,0.3)]"
        >
          <Plus size={20} />
          Novo Vínculo
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
              placeholder="Buscar vínculo..."
            />
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
            <span>Turma:</span>
            <select className="bg-[#f8f9fc] border-none rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#f37021] cursor-pointer font-bold text-slate-800">
              <option value="all">Todas as Turmas</option>
              <option value="TIN24-1M">TIN24-1M</option>
              <option value="ENF24-1N">ENF24-1N</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Turma</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Unidade Curricular (UC)</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">Professor Responsável</th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {vinculos.map((v) => (
                <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-bold text-[#f37021] bg-orange-50 px-3 py-1.5 rounded-lg">
                      {v.turma}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800">{v.disciplina}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                        {v.professor.charAt(0)}
                      </div>
                      <span className="text-slate-600 font-medium">{v.professor}</span>
                    </div>
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
              <h2 className="text-2xl font-bold text-slate-800">Vínculo Curricular</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Turma</label>
                <select className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#f37021] outline-none transition-all text-slate-800 cursor-pointer">
                  <option value="">Selecione a Turma...</option>
                  <option value="TIN24-1M">TIN24-1M</option>
                  <option value="ENF24-1N">ENF24-1N</option>
                  <option value="DSG24-2T">DSG24-2T</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Unidade Curricular (UC)</label>
                <select className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#f37021] outline-none transition-all text-slate-800 cursor-pointer">
                  <option value="">Selecione a UC...</option>
                  <option value="1">Lógica de Programação</option>
                  <option value="2">Banco de Dados</option>
                  <option value="3">Design de Interfaces (UI)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Professor Responsável</label>
                <select className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#f37021] outline-none transition-all text-slate-800 cursor-pointer">
                  <option value="">Selecione o Professor...</option>
                  <option value="1">Ana Paula Silva</option>
                  <option value="2">Carlos Eduardo Souza</option>
                  <option value="3">Mariana Costa</option>
                </select>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">
                  Cancelar
                </button>
                <button type="button" className="bg-[#f37021] hover:bg-[#d96017] text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-[0_4px_14px_rgb(243,112,33,0.3)]">
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

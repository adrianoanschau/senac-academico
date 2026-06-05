import React, { useState, useEffect } from 'react';
import { Search, Plus, CalendarClock, Maximize, Minimize } from 'lucide-react';
import ScheduleCalendar from '../components/ScheduleCalendar';
import { BulkGenerateModal } from '../components/BulkGenerateModal';

export const Schedule: React.FC = () => {
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const handleEventClick = (eventId: string) => {
    // TODO: (Passo 3) Abrir modal de detalhes/reagendamento da aula clicada
    console.log("Clicou no evento para inspecionar:", eventId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-[#004a8d] rounded-xl">
              <CalendarClock size={28} />
            </div>
            Cronograma
          </h1>
          <p className="text-slate-500 mt-1">Visualizar o cronograma de aulas de cada turma.</p>
        </div>
        <button 
          onClick={() => setIsBulkModalOpen(true)}
          className="bg-[#004a8d] hover:bg-[#00386b] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-[0_4px_14px_rgb(0,74,141,0.3)]"
        >
          <Plus size={20} />
          Novo Agendamento
        </button>
      </div>

      {/* Main Card */}
      <div className={
        isFullscreen 
          ? "fixed inset-0 z-50 bg-white p-8 overflow-y-auto" 
          : "bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100"
      }>
        
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              className="w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
              placeholder="Buscar cronograma..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
            <span>Status:</span>
            <select 
              className="bg-[#f8f9fc] border-none rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#004a8d] cursor-pointer"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">Todos os Status</option>
              <option value="SCHEDULED">Agendado</option>
              <option value="COMPLETED">Concluído</option>
              <option value="CANCELLED">Cancelado</option>
            </select>
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors ml-2"
              title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>

        {/* Calendário */}
        <ScheduleCalendar 
          filters={{ search, status }} 
          onEventClick={handleEventClick}
          isFullscreen={isFullscreen}
        />
      </div>

      <BulkGenerateModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onSuccess={() => {
          setIsBulkModalOpen(false);
          // Aqui futuramente podemos acionar a função de recarregar a view do calendário
        }}
      />
    </div>
  );
};

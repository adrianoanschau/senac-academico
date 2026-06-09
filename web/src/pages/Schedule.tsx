import React, { useState, useEffect } from 'react';
import { Search, Plus, CalendarClock, Maximize, Minimize, Info } from 'lucide-react';
import axios from 'axios';
import ScheduleCalendar from '../components/ScheduleCalendar';
import { BulkGenerateModal } from '../components/BulkGenerateModal';
import { ScheduleDetailsModal } from '../components/ScheduleDetailsModal';
import { MiniCalendar } from '../components/MiniCalendar';
import { ContextPanel } from '../components/ContextPanel';
import { Select } from '../components/Select';

interface Subject {
  id: string;
  name: string;
}

export const Schedule: React.FC = () => {
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string[]>(['SCHEDULED', 'COMPLETED']);
  const [subjectId, setSubjectId] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [professorId, setProfessorId] = useState<string>('');
  const [classGroupId, setClassGroupId] = useState<string>('');

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [rooms, setRooms] = useState<{ id: string; name: string }[]>([]);
  const [professors, setProfessors] = useState<{ id: string; name: string }[]>([]);
  const [classGroups, setClassGroups] = useState<{ id: string; code?: string; name?: string }[]>([]);

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const [subjectsRes, roomsRes, professorsRes, classGroupsRes] = await Promise.all([
          axios.get('/api/subjects'),
          axios.get('/api/rooms'),
          axios.get('/api/professors'),
          axios.get('/api/class-groups')
        ]);
        setSubjects(subjectsRes.data?.data || subjectsRes.data || []);
        setRooms(roomsRes.data?.data || roomsRes.data || []);
        setProfessors(professorsRes.data?.data || professorsRes.data || []);
        setClassGroups(classGroupsRes.data?.data || classGroupsRes.data || []);
      } catch (error) {
        console.error('Erro ao buscar dados para os filtros:', error);
      }
    };
    fetchFiltersData();
  }, []);

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-senac-blue/10 text-senac-blue rounded-xl">
              <CalendarClock size={28} />
            </div>
            Cronograma
          </h1>
          <p className="text-slate-500 mt-1">Visualizar o cronograma de aulas de cada turma.</p>
        </div>
        <button 
          onClick={() => setIsBulkModalOpen(true)}
          className="bg-senac-blue hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md shadow-senac-blue/30"
        >
          <Plus size={20} />
          Novo Agendamento
        </button>
      </div>

      {/* Main Card */}
      <div className={
        isFullscreen 
          ? "fixed inset-0 z-50 bg-white p-8 overflow-y-auto" 
          : "bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100"
      }>
        
        {/* Toolbar */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="relative w-72">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                className="w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-senac-blue outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
                placeholder="Buscar cronograma..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
            <span>Status:</span>
            <div className="flex bg-[#f8f9fc] rounded-xl p-1 gap-1">
              {[
                { id: 'SCHEDULED', label: 'Agendados' },
                { id: 'COMPLETED', label: 'Concluídos' },
                { id: 'CANCELLED', label: 'Cancelados' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setStatus((prev) =>
                      prev.includes(s.id) ? prev.filter((st) => st !== s.id) : [...prev, s.id]
                    );
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${status.includes(s.id) ? 'bg-senac-blue text-white shadow-md' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors ml-2"
              title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-xl">
            <div className="flex-1 min-w-[200px]">
              <Select 
                value={classGroupId} 
                onChange={(e) => setClassGroupId(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-senac-blue outline-none transition-all text-slate-800 cursor-pointer font-medium text-sm"
              >
                <option value="">Todas as Turmas...</option>
                {classGroups.map(cg => (
                  <option key={cg.id} value={cg.id}>{cg.code || cg.name}</option>
                ))}
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Select 
                value={professorId} 
                onChange={(e) => setProfessorId(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-senac-blue outline-none transition-all text-slate-800 cursor-pointer font-medium text-sm"
              >
                <option value="">Todos os Professores...</option>
                {professors.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Select 
                value={roomId} 
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-senac-blue outline-none transition-all text-slate-800 cursor-pointer font-medium text-sm"
              >
                <option value="">Todas as Salas...</option>
                {rooms.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Select 
                value={subjectId} 
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-senac-blue outline-none transition-all text-slate-800 cursor-pointer font-medium text-sm"
              >
                <option value="">Todas as Disciplinas...</option>
                {subjects.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        {/* Calendário */}
        <ScheduleCalendar 
          filters={{ search, status, subjectId, roomId, professorId, classGroupId, _refresh: refreshTrigger }} 
          onEventClick={handleEventClick}
          isFullscreen={isFullscreen}
          selectedDate={selectedDate}
        />
      </div>

      <BulkGenerateModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onSuccess={() => {
          setIsBulkModalOpen(false);
          setRefreshTrigger(prev => prev + 1);
        }}
      />

      <ScheduleDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedEventId(null);
        }}
        eventId={selectedEventId}
        onSuccess={() => {
          setRefreshTrigger(prev => prev + 1);
        }}
      />
      
      <ContextPanel
        title="Cronograma"
        description="Visualize e aloque aulas no calendário geral. Utilize a geração em massa para preencher as rotinas de um semestre inteiro rapidamente."
        icon={<Info className="text-senac-blue" size={24} />}
        tips={[
          'Use o botão "Novo Agendamento" (ou a Geração em Massa) para preencher os horários das turmas.',
          'Você pode filtrar os eventos por status (Agendados, Concluídos, Cancelados).',
          'O sistema respeita os Períodos Especiais (Feriados) para não agendar aulas em dias não letivos.'
        ]}
      >
        <MiniCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      </ContextPanel>
    </div>
  );
};

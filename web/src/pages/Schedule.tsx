import React, { useState, useEffect } from 'react';
import { Search, Plus, CalendarClock, X, Maximize, Minimize } from 'lucide-react';
import axios from 'axios';
import ScheduleCalendar from '../components/ScheduleCalendar';

interface ClassGroup {
  id: string;
  name?: string;
  code?: string;
}

interface Subject {
  id: string;
  name: string;
}

interface Professor {
  id: string;
  name: string;
}

interface Room {
  id: string;
  name: string;
}

export const Schedule: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const [formData, setFormData] = useState({
    classGroupId: '',
    subjectId: '',
    professorId: '',
    roomId: '',
    startDate: '',
    daysOfWeek: [] as number[],
    startTimeStr: '',
    endTimeStr: '',
  });

  const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    if (isModalOpen) {
      const fetchFormData = async () => {
        try {
          const [classGroupsRes, subjectsRes, professorsRes, roomsRes] = await Promise.all([
            axios.get('/api/class-groups'),
            axios.get('/api/subjects'),
            axios.get('/api/professors'),
            axios.get('/api/rooms'),
          ]);
          setClassGroups(classGroupsRes.data.data || classGroupsRes.data);
          setSubjects(subjectsRes.data.data || subjectsRes.data);
          setProfessors(professorsRes.data.data || professorsRes.data);
          setRooms(roomsRes.data.data || roomsRes.data);
        } catch (error) {
          console.error('Erro ao carregar listas do formulário:', error);
        }
      };
      fetchFormData();
    }
  }, [isModalOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDaysChange = (day: number) => {
    setFormData((prev) => {
      const days = prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter((d) => d !== day)
        : [...prev.daysOfWeek, day];
      return { ...prev, daysOfWeek: days };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.daysOfWeek.length === 0) {
      alert('Por favor, selecione ao menos um dia da semana.');
      return;
    }
    const payload = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
    };
    try {
      await axios.post('/api/schedules/generate', payload);
      alert('Cronograma gerado com sucesso!');
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Ocorreu um erro ao conectar com a API.';
        alert(`Erro ao gerar cronograma: ${errorMessage}`);
      } else {
        alert('Ocorreu um erro inesperado.');
      }
    }
  };

  const handleEventClick = (eventId: string) => {
    setIsModalOpen(true);
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
          onClick={() => setIsModalOpen(true)}
          className="bg-[#004a8d] hover:bg-[#00386b] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-[0_4px_14px_rgb(0,74,141,0.3)]"
        >
          <Plus size={20} />
          New Meeting
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
              placeholder="Search schedule..."
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
              <option value="all">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
              <option value="Substituted">Substituted</option>
            </select>
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors ml-2"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
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

      {/* Modal de Cadastro/Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Schedule Meeting</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Turma</label>
                  <select name="classGroupId" value={formData.classGroupId} onChange={handleInputChange} required className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 cursor-pointer">
                    <option value="">Selecione uma turma...</option>
                    {classGroups.map((cg) => (
                      <option key={cg.id} value={cg.id}>{cg.name || cg.code}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Disciplina</label>
                  <select name="subjectId" value={formData.subjectId} onChange={handleInputChange} required className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 cursor-pointer">
                    <option value="">Selecione uma disciplina...</option>
                    {subjects.map((sub) => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Professor</label>
                  <select name="professorId" value={formData.professorId} onChange={handleInputChange} required className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 cursor-pointer">
                    <option value="">Selecione um professor...</option>
                    {professors.map((prof) => (
                      <option key={prof.id} value={prof.id}>{prof.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Sala</label>
                  <select name="roomId" value={formData.roomId} onChange={handleInputChange} required className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 cursor-pointer">
                    <option value="">Selecione uma sala...</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>{room.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Data de Início</label>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Horário de Início</label>
                  <input type="time" name="startTimeStr" value={formData.startTimeStr} onChange={handleInputChange} required className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Horário de Término</label>
                  <input type="time" name="endTimeStr" value={formData.endTimeStr} onChange={handleInputChange} required className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Dias da Semana</label>
                <div className="flex flex-wrap gap-4 bg-[#f8f9fc] p-4 rounded-xl">
                  {[
                    { label: 'Dom', value: 0 },
                    { label: 'Seg', value: 1 },
                    { label: 'Ter', value: 2 },
                    { label: 'Qua', value: 3 },
                    { label: 'Qui', value: 4 },
                    { label: 'Sex', value: 5 },
                    { label: 'Sáb', value: 6 },
                  ].map((day) => (
                    <label key={day.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        value={day.value}
                        checked={formData.daysOfWeek.includes(day.value)}
                        onChange={() => handleDaysChange(day.value)}
                        className="w-4 h-4 text-[#004a8d] focus:ring-[#004a8d] rounded"
                      />
                      <span className="text-sm font-medium text-slate-700">{day.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="bg-[#004a8d] hover:bg-[#00386b] text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-[0_4px_14px_rgb(0,74,141,0.3)]">
                  Gerar Cronograma
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

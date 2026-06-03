import { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

export interface ScheduleResponse {
  id: string;
  startTime: string;
  endTime: string;
  subject: { name: string };
  professor: { name: string };
  room: { name: string };
  classGroup: { code: string };
}

export interface Room {
  id: string;
  name: string;
}

export interface Professor {
  id: string;
  name: string;
}

export interface ClassGroup {
  id: string;
  code?: string;
  name?: string;
}

interface ScheduleCalendarProps {
  filters?: {
    search?: string;
    status?: string;
  };
  onEventClick?: (eventId: string) => void;
  isFullscreen?: boolean;
}

export default function ScheduleCalendar({ filters, onEventClick, isFullscreen }: ScheduleCalendarProps) {
  const calendarRef = useRef<FullCalendar>(null);

  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [selectedClassGroup, setSelectedClassGroup] = useState('');

  const [rooms, setRooms] = useState<Room[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);

  useEffect(() => {
    Promise.all([
      axios.get('/api/rooms'),
      axios.get('/api/professors'),
      axios.get('/api/class-groups')
    ]).then(([roomsRes, professorsRes, classGroupsRes]) => {
      setRooms(roomsRes.data?.data || roomsRes.data || []);
      setProfessors(professorsRes.data?.data || professorsRes.data || []);
      setClassGroups(classGroupsRes.data?.data || classGroupsRes.data || []);
    }).catch(err => console.error("Failed to load filter options:", err));
  }, []);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().refetchEvents();
    }
  }, [filters, selectedRoom, selectedProfessor, selectedClassGroup]);

  return (
    <div className={isFullscreen ? "h-[calc(100vh-140px)] flex flex-col" : "h-[800px] flex flex-col"}> 
      <div className="bg-gray-50 p-4 rounded-xl mb-4 flex flex-col sm:flex-row gap-4 shrink-0">
        <select
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#004a8d] cursor-pointer text-sm font-medium text-slate-700"
          value={selectedClassGroup}
          onChange={(e) => setSelectedClassGroup(e.target.value)}
        >
          <option value="">Todas as Turmas...</option>
          {classGroups.map((cg) => (
            <option key={cg.id} value={cg.id}>{cg.code || cg.name}</option>
          ))}
        </select>
        <select
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#004a8d] cursor-pointer text-sm font-medium text-slate-700"
          value={selectedProfessor}
          onChange={(e) => setSelectedProfessor(e.target.value)}
        >
          <option value="">Todos os Professores...</option>
          {professors.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <select
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#004a8d] cursor-pointer text-sm font-medium text-slate-700"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          <option value="">Todas as Salas...</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-h-0">
        <FullCalendar
          ref={calendarRef}
          height="100%"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        locale="en"
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="23:00:00"
        
        events={async (info) => {
          try {
            const params = new URLSearchParams();
            params.append('startDate', info.startStr);
            params.append('endDate', info.endStr);
            
            if (filters?.search) params.append('search', filters.search);
            if (filters?.status && filters.status !== 'all') params.append('status', filters.status);

            if (selectedRoom) params.append('roomId', selectedRoom);
            if (selectedProfessor) params.append('professorId', selectedProfessor);
            if (selectedClassGroup) params.append('classGroupId', selectedClassGroup);

            const response = await axios.get(`/api/schedules?${params.toString()}`);
            const data: ScheduleResponse[] = response.data?.data || response.data || [];

            const calendarEvents = data.map((schedule) => ({
              id: schedule.id,
              title: `${schedule.subject?.name || 'N/A'} - ${schedule.classGroup?.code || 'N/A'}`,
              start: schedule.startTime,
              end: schedule.endTime,
              extendedProps: {
                professor: schedule.professor?.name || 'N/A',
                room: schedule.room?.name || 'N/A',
              },
            }));

            return calendarEvents;
          } catch (error) {
            console.error('Failed to load schedule:', error);
            return [];
          }
        }}
        eventClick={(info) => {
          if (onEventClick) {
            onEventClick(info.event.id);
          }
        }}
        eventContent={(eventInfo) => (
          <div className="p-1 text-xs leading-tight overflow-hidden cursor-pointer hover:opacity-90">
            <div className="font-bold">{eventInfo.event.title}</div>
            <div className="italic">{eventInfo.event.extendedProps.professor}</div>
            <div>{eventInfo.event.extendedProps.room}</div>
          </div>
        )}
      />
      </div>
    </div>
  );
}

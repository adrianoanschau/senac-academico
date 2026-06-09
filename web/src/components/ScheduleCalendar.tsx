import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { Select } from './Select';

// Google Calendar-like color palette
const subjectColors = [
  '#039be5', '#33b679', '#d60000', '#e67c73', '#f4511e', '#f6bf26',
  '#3f51b5', '#7986cb', '#8e24aa', '#616161', '#0b8043', '#d50000',
  '#e4a147', '#b39ddb', '#ad1457', '#795548', '#a79b8e', '#616161'
];

const stringToColorHash = (str: string): number => {
  if (!str) return 0;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};
export interface ScheduleResponse {
  id: string;
  startTime: string;
  endTime: string;
  subject: { name: string };
  professor: { name: string };
  room: { name: string };
  classGroup: { code: string };
  status?: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  cancelReason?: string;
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
    status?: string | string[];
    _refresh?: number;
  };
  onEventClick?: (eventId: string) => void;
  isFullscreen?: boolean;
  selectedDate?: Date;
}

export default function ScheduleCalendar({ filters, onEventClick, isFullscreen, selectedDate }: ScheduleCalendarProps) {
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

  useEffect(() => {
    if (calendarRef.current && selectedDate) {
      calendarRef.current.getApi().gotoDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className={isFullscreen ? "h-[calc(100vh-140px)] flex flex-col" : "h-[800px] flex flex-col"}> 
      <div className="bg-gray-50 p-4 rounded-xl mb-4 flex flex-col sm:flex-row gap-4 shrink-0">
        <Select
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#004a8d] cursor-pointer text-sm font-medium text-slate-700"
          value={selectedClassGroup}
          onChange={(e) => setSelectedClassGroup(e.target.value)}
        >
          <option value="">Todas as Turmas...</option>
          {classGroups.map((cg) => (
            <option key={cg.id} value={cg.id}>{cg.code || cg.name}</option>
          ))}
        </Select>
        <Select
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#004a8d] cursor-pointer text-sm font-medium text-slate-700"
          value={selectedProfessor}
          onChange={(e) => setSelectedProfessor(e.target.value)}
        >
          <option value="">Todos os Professores...</option>
          {professors.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </Select>
        <Select
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#004a8d] cursor-pointer text-sm font-medium text-slate-700"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          <option value="">Todas as Salas...</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </Select>
      </div>

      <div className="flex-1 min-h-0 senac-calendar">
        <style>{`
          .senac-calendar .fc-toolbar-title {
            font-size: 1.5rem;
            font-weight: 500;
            color: #3c4043;
          }
          .senac-calendar .fc-button-group {
            border-radius: var(--radius-xl) !important;
            overflow: hidden;
          }
          .senac-calendar .fc-button {
            background-color: #004a8d !important;
            border: 1px solid #dadce0 !important;
            color: white !important;
            box-shadow: none !important;
            text-transform: capitalize !important;
            font-weight: 500 !important;
            padding: 0.5rem 1rem;
          }
          .senac-calendar .fc-button:hover {
            background-color: #00386b !important;
          }
          .senac-calendar .fc-button-primary:not(:disabled).fc-button-active,
          .senac-calendar .fc-button-primary:not(:disabled):active {
            background-color: #00386b !important;
            color: #e8f0fe !important;
            border-color: #e8f0fe !important;
          }
          .senac-calendar .fc-today-button {
            border-radius: var(--radius-xl) !important;
          }
          .senac-calendar .fc-day-today {
            background-color: #f8f9fa !important;
          }
          .senac-calendar .fc-day-today .fc-daygrid-day-number {
            background-color: #1a73e8;
            color: white;
            border-radius: 9999px;
            width: 28px;
            height: 28px;
            line-height: 20px;
            text-align: center;
            display: inline-block;
            margin-top: 2px;
          }
          .senac-calendar .fc-daygrid-day-number,
          .senac-calendar .fc-col-header-cell-cushion {
            color: #3c4043;
            text-decoration: none;
          }
          .senac-calendar .fc-event {
            border: none !important;
            border-radius: 4px !important;
            font-weight: 500;
            cursor: pointer;
          }
          .senac-calendar .fc-event-main {
            color: white;
          }
          .senac-calendar .fc-daygrid-event-harness .fc-event-main {
            padding: 1px 4px;
          }
          .senac-calendar .fc-event-cancelled {
            background-color: #fef2f2 !important; /* bg-red-50 */
            border-color: #fca5a5 !important; /* border-red-300 */
            border-width: 1px !important;
            border-style: solid !important;
            opacity: 0.7 !important;
          }
          .senac-calendar .fc-event-cancelled .fc-event-main {
            color: #ef4444 !important; /* text-red-500 */
          }
        `}</style>
        <FullCalendar
          ref={calendarRef}
          height="100%"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listYear'
          }}
          locales={[ptBrLocale]}
          locale="pt-br"
          allDaySlot={false}
          slotMinTime="08:00:00"
          slotMaxTime="23:00:00"
          
          events={async (info: { startStr: string; endStr: string }) => {
            try {
              if (filters?.status && Array.isArray(filters.status) && filters.status.length === 0) {
                return [];
              }

              const params = new URLSearchParams();
              params.append('startDate', info.startStr);
              params.append('endDate', info.endStr);
              
              if (filters?.search) params.append('search', filters.search);
              
              if (filters?.status) {
                if (Array.isArray(filters.status)) {
                  filters.status.forEach((s) => params.append('status', s));
                } else if (filters.status !== 'all') {
                  params.append('status', filters.status);
                }
              }

              if (selectedRoom) params.append('roomId', selectedRoom);
              if (selectedProfessor) params.append('professorId', selectedProfessor);
              if (selectedClassGroup) params.append('classGroupId', selectedClassGroup);

              const response = await axios.get(`/api/schedules?${params.toString()}`);
              const data: ScheduleResponse[] = response.data?.data || response.data || [];

              const calendarEvents = data.map((schedule) => {
                const isCancelled = schedule.status === 'CANCELLED';
                const color = subjectColors[stringToColorHash(schedule.subject?.name || '') % subjectColors.length];
                return {
                id: String(schedule.id),
                  title: `${schedule.subject?.name || 'N/D'} - ${schedule.classGroup?.code || 'N/D'}`,
                  start: schedule.startTime,
                  end: schedule.endTime,
                  extendedProps: {
                    professor: schedule.professor?.name || 'N/D',
                    room: schedule.room?.name || 'N/D',
                    status: schedule.status,
                    cancelReason: schedule.cancelReason,
                  },
                  backgroundColor: color,
                  borderColor: color,
                  className: isCancelled ? 'fc-event-cancelled' : '',
                };
              });

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
          eventContent={(eventInfo) => {
            const isCancelled = eventInfo.event.extendedProps.status === 'CANCELLED';
            const tooltipTitle = isCancelled ? `Motivo do cancelamento: ${eventInfo.event.extendedProps.cancelReason || 'Não informado'}` : undefined;

            if (eventInfo.view.type === 'dayGridMonth') {
              return (
                <div className={`px-1 overflow-hidden whitespace-nowrap text-xs ${isCancelled ? 'line-through' : ''}`} title={tooltipTitle}>
                  <b>{eventInfo.timeText}</b>
                  <span className="ml-1">{eventInfo.event.title.split(' - ')[0]}</span>
                </div>
              )
            }
            return (
              <div className={`p-1 text-xs leading-tight overflow-hidden h-full flex flex-col ${isCancelled ? 'line-through' : ''}`} title={tooltipTitle}>
                <div className="font-bold">{eventInfo.event.title}</div>
                <div className="opacity-90 italic">{eventInfo.event.extendedProps.professor}</div>
                <div className="opacity-90">{eventInfo.event.extendedProps.room}</div>
              </div>
            )
          }}
        />
      </div>
    </div>
  );
}

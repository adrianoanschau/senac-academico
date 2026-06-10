import { useEffect, useRef } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { Check } from 'lucide-react';
import { usePersistentState } from '../hooks/usePersistentState';

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
  status?: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'PLANNED';
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
    subjectId?: string;
    roomId?: string;
    professorId?: string;
    classGroupId?: string;
    _refresh?: number;
  };
  onEventClick?: (eventId: string) => void;
  isFullscreen?: boolean;
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}

export default function ScheduleCalendar({ filters, onEventClick, isFullscreen, selectedDate, onDateChange }: ScheduleCalendarProps) {
  const calendarRef = useRef<FullCalendar>(null);
  const [calendarView, setCalendarView] = usePersistentState('schedule_calendar_view', 'timeGridWeek');

  const filtersJson = JSON.stringify(filters);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().refetchEvents();
    }
  }, [filtersJson]);

  useEffect(() => {
    if (calendarRef.current && selectedDate) {
      const calendarDate = calendarRef.current.getApi().getDate();
      if (calendarDate.toISOString() !== selectedDate.toISOString()) {
        calendarRef.current.getApi().gotoDate(selectedDate);
      }
    }
  }, [selectedDate]);

  return (
    <div className={isFullscreen ? "h-[calc(100vh-140px)] flex flex-col" : "h-200 flex flex-col"}> 

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
        `}</style>
        <FullCalendar
          ref={calendarRef}
          height="100%"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialDate={selectedDate}
          initialView={calendarView}
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
          datesSet={(arg) => {
            if (calendarView !== arg.view.type) {
              setCalendarView(arg.view.type);
            }
            if (onDateChange && calendarRef.current) {
              const calendarDate = calendarRef.current.getApi().getDate();
              if (selectedDate && calendarDate.toISOString() !== selectedDate.toISOString()) {
                onDateChange(calendarDate);
              }
            }
          }}
          
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

              if (filters?.subjectId) params.append('subjectId', filters.subjectId);

              if (filters?.roomId) params.append('roomId', filters.roomId);
              if (filters?.professorId) params.append('professorId', filters.professorId);
              if (filters?.classGroupId) params.append('classGroupId', filters.classGroupId);

              const response = await axios.get(`/api/schedules?${params.toString()}`);
              const data: ScheduleResponse[] = response.data?.data || response.data || [];

              const calendarEvents = data.map((schedule) => {
                const status = schedule.status || 'SCHEDULED';
                const color = subjectColors[stringToColorHash(schedule.subject?.name || '') % subjectColors.length];
                
                let bgColor = color;
                let borderColor = color;
                let textColor = '#ffffff';
                const classNames: string[] = [];

                if (status === 'PLANNED') {
                  bgColor = `${color}20`; // Cor clara (com 20% de opacidade no formato hex)
                  textColor = '#334155'; // text-slate-700
                  classNames.push('!border-dashed', '!border-2', 'opacity-80');
                } else if (status === 'CANCELLED') {
                  bgColor = '#fef2f2'; // bg-rose-50
                  borderColor = '#fca5a5'; // border-rose-300
                  textColor = '#e11d48'; // text-rose-600
                  classNames.push('opacity-70');
                } else if (status === 'COMPLETED') {
                  classNames.push('opacity-80', 'saturate-50');
                }

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
                  backgroundColor: bgColor,
                  borderColor: borderColor,
                  textColor: textColor,
                  className: classNames.join(' '),
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
            const status = eventInfo.event.extendedProps.status;
            const isCancelled = status === 'CANCELLED';
            const isCompleted = status === 'COMPLETED';
            
            const tooltipTitle = isCancelled ? `Motivo do cancelamento: ${eventInfo.event.extendedProps.cancelReason || 'Não informado'}` : undefined;

            const baseClasses = isCancelled ? 'line-through' : '';

            if (eventInfo.view.type === 'dayGridMonth') {
              return (
                <div className={`px-1 overflow-hidden whitespace-nowrap text-xs ${baseClasses}`} title={tooltipTitle}>
                  <b>{eventInfo.timeText}</b>
                  <span className="ml-1">{eventInfo.event.title.split(' - ')[0]}</span>
                  {isCompleted && <Check size={12} className="inline ml-1 opacity-80" />}
                </div>
              )
            }
            return (
              <div className={`p-1 text-xs leading-tight overflow-hidden h-full flex flex-col ${baseClasses}`} title={tooltipTitle}>
                <div className="font-bold flex items-start justify-between gap-1">
                  <span className="truncate">{eventInfo.event.title}</span>
                  {isCompleted && <Check size={14} className="shrink-0 opacity-80" />}
                </div>
                <div className="opacity-90 italic truncate mt-auto">{eventInfo.event.extendedProps.professor}</div>
                <div className="opacity-90 truncate">{eventInfo.event.extendedProps.room}</div>
              </div>
            )
          }}
        />
      </div>
    </div>
  );
}

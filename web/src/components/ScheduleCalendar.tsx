import { useEffect, useRef, useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { Check } from "lucide-react";
import { usePersistentState } from "../hooks/usePersistentState";
import api from "../services/api";
import { LoadingOverlay } from "./LoadingOverlay";

// Google Calendar-like color palette
const subjectColors = [
  "#039be5",
  "#33b679",
  "#d60000",
  "#e67c73",
  "#f4511e",
  "#f6bf26",
  "#3f51b5",
  "#7986cb",
  "#8e24aa",
  "#616161",
  "#0b8043",
  "#d50000",
  "#e4a147",
  "#b39ddb",
  "#ad1457",
  "#795548",
  "#a79b8e",
  "#616161",
];

const stringToColorHash = (str: string): number => {
  if (!str) return 0;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return Math.abs(hash);
};

function getSubjectColorKey(schedule: {
  id: string;
  subject?: { code?: string; name?: string };
}): string {
  return schedule.subject?.code || schedule.subject?.name || schedule.id;
}

function getSubjectAccentColor(subjectKey: string): string {
  return subjectColors[stringToColorHash(subjectKey) % subjectColors.length];
}

function getEventColors(subjectKey: string, status: string) {
  const accent = getSubjectAccentColor(subjectKey);

  if (status === "PLANNED") {
    return {
      bg: `${accent}28`,
      border: accent,
      text: "#334155",
    };
  }

  if (status === "CANCELLED") {
    return {
      bg: "#fef2f2",
      border: "#fca5a5",
      text: "#e11d48",
    };
  }

  if (status === "COMPLETED") {
    return {
      bg: `${accent}99`,
      border: accent,
      text: "#ffffff",
    };
  }

  return {
    bg: accent,
    border: accent,
    text: "#ffffff",
  };
}

export interface ScheduleResponse {
  id: string;
  startTime: string;
  endTime: string;
  subject: { id?: string; name: string; code: string };
  professor: { name: string };
  room: { name: string };
  classGroup: { code: string };
  status?: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "PLANNED";
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

export default function ScheduleCalendar({
  filters,
  onEventClick,
  isFullscreen,
  selectedDate,
  onDateChange,
}: ScheduleCalendarProps) {
  const calendarRef = useRef<FullCalendar>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [calendarView, setCalendarView] = usePersistentState(
    "schedule_calendar_view",
    "timeGridWeek",
  );

  const filtersRef = useRef(filters);
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  const filtersJson = JSON.stringify(filters);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().refetchEvents();
    }
  }, [filtersJson]);

  const selectedDateMs = selectedDate?.getTime();
  useEffect(() => {
    if (calendarRef.current && selectedDate) {
      const calendarDate = calendarRef.current.getApi().getDate();
      if (calendarDate.getTime() !== selectedDate.getTime()) {
        calendarRef.current.getApi().gotoDate(selectedDate);
      }
    }
  }, [selectedDate, selectedDateMs]);

  const fetchEvents = useCallback(
    async (info: { startStr: string; endStr: string }) => {
      try {
        const currentFilters = filtersRef.current;
        if (
          currentFilters?.status &&
          Array.isArray(currentFilters.status) &&
          currentFilters.status.length === 0
        ) {
          return [];
        }

        const params = new URLSearchParams();
        params.append("start", info.startStr);
        params.append("end", info.endStr);

        if (currentFilters?.search)
          params.append("search", currentFilters.search);

        if (currentFilters?.status) {
          if (Array.isArray(currentFilters.status)) {
            currentFilters.status.forEach((s) => params.append("status", s));
          } else if (currentFilters.status !== "all") {
            params.append("status", String(currentFilters.status));
          }
        }

        if (currentFilters?.subjectId)
          params.append("subjectId", currentFilters.subjectId);

        if (currentFilters?.roomId)
          params.append("roomId", currentFilters.roomId);
        if (currentFilters?.professorId)
          params.append("professorId", currentFilters.professorId);
        if (currentFilters?.classGroupId)
          params.append("classGroupId", currentFilters.classGroupId);

        const response = await api.get(`/schedules?${params.toString()}`);
        const data: ScheduleResponse[] =
          response.data?.data || response.data || [];

        const calendarEvents = data.map((schedule) => {
          const status = schedule.status || "SCHEDULED";
          const subjectKey = getSubjectColorKey(schedule);
          const colors = getEventColors(subjectKey, status);
          const classNames: string[] = [];

          if (status === "PLANNED") {
            classNames.push("!border-dashed", "!border-2", "opacity-90");
          } else if (status === "CANCELLED") {
            classNames.push("opacity-70");
          } else if (status === "COMPLETED") {
            classNames.push("opacity-90");
          }

          return {
            id: String(schedule.id),
            title: `${schedule.subject ? schedule.subject.code + ": " + schedule.subject.name : "N/D"}`,
            start: schedule.startTime,
            end: schedule.endTime,
            extendedProps: {
              professor: schedule.professor?.name || "N/D",
              room: schedule.room?.name || "N/D",
              classGroup: schedule.classGroup?.code || "N/D",
              subjectCode: schedule.subject?.code || "N/D",
              subjectName: schedule.subject?.name || "N/D",
              subjectColor: colors.border,
              status: schedule.status,
              cancelReason: schedule.cancelReason,
            },
            backgroundColor: colors.bg,
            borderColor: colors.border,
            textColor: colors.text,
            className: classNames.join(" "),
          };
        });

        return calendarEvents;
      } catch (error) {
        console.error("Failed to load schedule:", error);
        return [];
      }
    },
    [],
  );

  return (
    <div
      className={
        isFullscreen
          ? "h-[calc(100vh-140px)] flex flex-col relative overflow-hidden"
          : "h-200 flex flex-col relative overflow-hidden"
      }
    >
      <LoadingOverlay
        visible={isFetching}
        message="Carregando agendamentos..."
      />
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
          .senac-calendar .fc-dayGridMonth-view .fc-event-main {
            color: inherit;
          }
          .senac-calendar .fc-daygrid-event-harness .fc-event-main {
            padding: 1px 4px;
          }
          .senac-calendar .fc-dayGridMonth-view .fc-daygrid-block-event .fc-event {
            border: none !important;
            border-radius: 4px !important;
            overflow: hidden;
          }
          .senac-calendar .fc-dayGridMonth-view .schedule-month-event {
            width: 100%;
            min-height: 100%;
            border-radius: 4px;
            box-sizing: border-box;
          }
        `}</style>
        <FullCalendar
          ref={calendarRef}
          loading={(isLoading) => setIsFetching(isLoading)}
          height="100%"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialDate={selectedDate}
          initialView={calendarView}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listYear",
          }}
          locales={[ptBrLocale]}
          locale="pt-br"
          allDaySlot={false}
          slotMinTime="08:00:00"
          slotMaxTime="23:00:00"
          views={{
            dayGridMonth: {
              eventDisplay: "block",
              dayMaxEvents: 5,
            },
          }}
          datesSet={(arg) => {
            if (calendarView !== arg.view.type) {
              setCalendarView(arg.view.type);
            }
            if (onDateChange && calendarRef.current) {
              const calendarDate = calendarRef.current.getApi().getDate();
              if (
                selectedDate &&
                calendarDate.getTime() !== selectedDate.getTime()
              ) {
                onDateChange(calendarDate);
              }
            }
          }}
          events={fetchEvents}
          eventClick={(info) => {
            if (onEventClick) {
              onEventClick(info.event.id);
            }
          }}
          eventContent={(eventInfo) => {
            const status = eventInfo.event.extendedProps.status;
            const isCancelled = status === "CANCELLED";
            const isCompleted = status === "COMPLETED";

            const tooltipTitle = [
              `Disciplina: ${eventInfo.event.extendedProps.subjectCode} - ${eventInfo.event.extendedProps.subjectName}`,
              `Turma: ${eventInfo.event.extendedProps.classGroup}`,
              `Professor(a): ${eventInfo.event.extendedProps.professor}`,
              `Sala: ${eventInfo.event.extendedProps.room}`,
              isCancelled
                ? `\nMotivo do cancelamento: ${eventInfo.event.extendedProps.cancelReason || "Não informado"}`
                : null,
            ]
              .filter(Boolean)
              .join("\n");

            const baseClasses = isCancelled ? "line-through" : "";

            if (eventInfo.view.type === "dayGridMonth") {
              const subjectKey =
                eventInfo.event.extendedProps.subjectCode || eventInfo.event.id;
              const colors = getEventColors(subjectKey, status || "SCHEDULED");

              return (
                <div
                  className={`schedule-month-event px-1.5 py-1 overflow-hidden text-xs flex flex-col gap-0.5 ${baseClasses}`}
                  style={{
                    backgroundColor: colors.bg,
                    borderLeft: `3px solid ${colors.border}`,
                    color: colors.text,
                  }}
                  title={tooltipTitle}
                >
                  <div className="font-bold flex items-start justify-between gap-1 leading-tight">
                    <span className="truncate">
                      {eventInfo.event.extendedProps.subjectCode} -{" "}
                      {eventInfo.event.extendedProps.subjectName}
                    </span>
                    {isCompleted && (
                      <Check size={12} className="shrink-0 opacity-80 mt-0.5" />
                    )}
                  </div>
                  <div className="opacity-90 truncate font-medium">
                    Turma: {eventInfo.event.extendedProps.classGroup}
                  </div>
                  <div className="opacity-90 truncate">
                    Prof: {eventInfo.event.extendedProps.professor}
                  </div>
                  <div className="opacity-90 truncate">
                    Sala: {eventInfo.event.extendedProps.room}
                  </div>
                </div>
              );
            }
            return (
              <div
                className={`p-1 text-xs leading-tight overflow-hidden h-full flex flex-col ${baseClasses}`}
                title={tooltipTitle}
              >
                <div className="font-bold flex items-start justify-between gap-1">
                  <div className="flex flex-col overflow-hidden">
                    <span className="opacity-80 text-[10px] mb-0.5 font-semibold">
                      {eventInfo.timeText}
                    </span>
                    <span className="truncate">{eventInfo.event.title}</span>
                  </div>
                  {isCompleted && (
                    <Check size={14} className="shrink-0 opacity-80 mt-1" />
                  )}
                </div>
                <div className="opacity-90 truncate font-medium mt-0.5">
                  Turma: {eventInfo.event.extendedProps.classGroup}
                </div>
                <div className="opacity-90 italic truncate mt-auto">
                  {eventInfo.event.extendedProps.professor}
                </div>
                <div className="opacity-90 truncate">
                  {eventInfo.event.extendedProps.room}
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}

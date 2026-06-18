import React, { lazy, Suspense, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CalendarClock, Info } from 'lucide-react';

import { ContextPanel } from '../components/ContextPanel';
import { MiniCalendar } from '../components/MiniCalendar';
import { ScheduleFilterBar } from '../components/schedule/ScheduleFilterBar';
import { PageHeader, PageLayout } from '../components/ui';
import { useScheduleFilters } from '../hooks/useScheduleFilters';
import api from '../services/api';
import type { ScheduleItem } from '../types/schedule-export.types';
import { extractListData } from '../utils/apiResponse';
import { buildScheduleListQueryParams } from '../utils/scheduleCalendarParams';

const ExportButtons = lazy(() =>
  import('../components/ExportButtons').then((m) => ({
    default: m.ExportButtons,
  })),
);

const ScheduleCalendar = lazy(() => import('../components/ScheduleCalendar'));
const ScheduleDetailsModal = lazy(() =>
  import('../components/ScheduleDetailsModal').then((m) => ({
    default: m.ScheduleDetailsModal,
  })),
);

export const Schedule: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialClassGroupId = searchParams.get('classGroupId') || '';

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const {
    search,
    setSearch,
    status,
    toggleStatus,
    subjectId,
    setSubjectId,
    roomId,
    setRoomId,
    professorId,
    setProfessorId,
    classGroupId,
    setClassGroupId,
    isFullscreen,
    setIsFullscreen,
    selectedDate,
    setSelectedDate,
    bumpRefresh,
    subjects,
    rooms,
    professors,
    classGroups,
    calendarFilters,
    listFilters,
    showClassGroupFilter,
  } = useScheduleFilters({
    storagePrefix: 'schedule',
    initialClassGroupId,
  });

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsDetailsModalOpen(true);
  };

  const fetchReportData = async (): Promise<ScheduleItem[]> => {
    const params = buildScheduleListQueryParams(listFilters);
    const response = await api.get(`/schedules?${params.toString()}`);
    const data = extractListData<ScheduleItem>(response);

    return data.map((item) => {
      if (!item.subject) return item;
      return {
        ...item,
        subject: {
          ...item.subject,
          name: `${item.subject.code}: ${item.subject.name} ${item.subject.hours}h`,
        },
      };
    });
  };

  return (
    <PageLayout>
      <PageHeader
        accent="senac"
        icon={<CalendarClock size={28} />}
        title="Cronograma"
        description="Visualize o cronograma de aulas de cada turma."
        action={
          <Suspense fallback={null}>
            <ExportButtons fetchData={fetchReportData} />
          </Suspense>
        }
      />

      <div
        className={
          isFullscreen
            ? 'fixed inset-0 z-50 bg-white p-8 overflow-y-auto'
            : 'bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100'
        }
      >
        <ScheduleFilterBar
          accent="senac"
          search={search}
          onSearchChange={setSearch}
          status={status}
          onToggleStatus={toggleStatus}
          isFullscreen={isFullscreen}
          onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
          showClassGroupFilter={showClassGroupFilter}
          classGroupId={classGroupId}
          onClassGroupIdChange={setClassGroupId}
          classGroups={classGroups}
          professorId={professorId}
          onProfessorIdChange={setProfessorId}
          professors={professors}
          roomId={roomId}
          onRoomIdChange={setRoomId}
          rooms={rooms}
          subjectId={subjectId}
          onSubjectIdChange={setSubjectId}
          subjects={subjects}
        />

        <Suspense
          fallback={
            <div className="h-200 flex items-center justify-center text-slate-500 font-medium">
              Carregando calendário...
            </div>
          }
        >
          <ScheduleCalendar
            filters={calendarFilters}
            onEventClick={handleEventClick}
            isFullscreen={isFullscreen}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        {isDetailsModalOpen && (
          <ScheduleDetailsModal
            isOpen={isDetailsModalOpen}
            readOnly
            onClose={() => {
              setIsDetailsModalOpen(false);
              setSelectedEventId(null);
            }}
            eventId={selectedEventId}
            onSuccess={bumpRefresh}
          />
        )}
      </Suspense>

      <ContextPanel
        title="Cronograma"
        description="Visualize o calendário de aulas de todas as turmas. Para planejar módulos ou gerenciar aulas, acesse a página de Turmas."
        icon={<Info className="text-senac-blue" size={24} />}
        tips={[
          'Esta tela é somente leitura — clique em uma aula para ver os detalhes.',
          'Use os filtros por turma, professor, sala ou status para refinar a visualização.',
          'O planejamento de módulos e a gestão operacional (adiar, efetivar) estão na página de Turmas.',
        ]}
      >
        <MiniCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </ContextPanel>
    </PageLayout>
  );
};

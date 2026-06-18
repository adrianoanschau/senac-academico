import React, { lazy, Suspense, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { CalendarClock, Settings2 } from 'lucide-react';

import { CanAccess } from '../components/CanAccess';
import { ClassGroupNotFound } from '../components/class-groups/ClassGroupNotFound';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { ScheduleFilterBar } from '../components/schedule/ScheduleFilterBar';
import { PageBackLink, PageHeader, PageLayout } from '../components/ui';
import { useClassGroup } from '../hooks/useFetchedList';
import { useScheduleFilters } from '../hooks/useScheduleFilters';
import type { ClassGroupInfo } from '../types/entities';
import { Role } from '../utils/roles';

const ScheduleCalendar = lazy(() => import('../components/ScheduleCalendar'));
const ScheduleDetailsModal = lazy(() =>
  import('../components/ScheduleDetailsModal').then((m) => ({
    default: m.ScheduleDetailsModal,
  })),
);

export const ScheduleOperations: React.FC = () => {
  const { classGroupId } = useParams<{ classGroupId: string }>();
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const {
    classGroup,
    isLoading: isLoadingClassGroup,
    notFound,
  } = useClassGroup<ClassGroupInfo>(classGroupId);

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
    isFullscreen,
    setIsFullscreen,
    selectedDate,
    setSelectedDate,
    bumpRefresh,
    subjects,
    rooms,
    professors,
    calendarFilters,
  } = useScheduleFilters({
    storagePrefix: 'schedule_ops',
    fixedClassGroupId: classGroupId,
    scopeSubjectsToClassGroup: true,
  });

  if (!classGroupId) {
    return <Navigate to="/class-groups" replace />;
  }

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsDetailsModalOpen(true);
  };

  return (
    <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
      <PageLayout>
        <PageBackLink
          to="/class-groups"
          label="Voltar para Turmas"
          accent="operacional"
        />

        <PageHeader
          accent="operacional"
          icon={<Settings2 size={28} />}
          title="Gestão Operacional"
          description={
            <>
              Adie, efetive ou altere padrões de aulas da turma{' '}
              <span className="font-bold text-slate-700">
                {classGroup?.code || '...'}
              </span>
              .
            </>
          }
          action={
            <Link
              to={`/schedule?classGroupId=${classGroupId}`}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors"
            >
              <CalendarClock size={18} />
              Ver Cronograma
            </Link>
          }
        />

        <div
          className={
            isFullscreen
              ? 'fixed inset-0 z-50 bg-white p-8 overflow-y-auto'
              : 'bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden'
          }
        >
          <LoadingOverlay
            visible={isLoadingClassGroup}
            message="Carregando turma..."
          />

          {notFound ? (
            <ClassGroupNotFound />
          ) : (
            <>
              <ScheduleFilterBar
                accent="operacional"
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Buscar aulas..."
                status={status}
                onToggleStatus={toggleStatus}
                isFullscreen={isFullscreen}
                onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
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
            </>
          )}
        </div>

        <Suspense fallback={null}>
          {isDetailsModalOpen && (
            <ScheduleDetailsModal
              isOpen={isDetailsModalOpen}
              readOnly={false}
              onClose={() => {
                setIsDetailsModalOpen(false);
                setSelectedEventId(null);
              }}
              eventId={selectedEventId}
              onSuccess={bumpRefresh}
            />
          )}
        </Suspense>
      </PageLayout>
    </CanAccess>
  );
};

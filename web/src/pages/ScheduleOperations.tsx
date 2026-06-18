import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { ArrowLeft, CalendarClock, Settings2 } from 'lucide-react';

import { CanAccess } from '../components/CanAccess';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { ScheduleFilterBar } from '../components/schedule/ScheduleFilterBar';
import { useScheduleFilters } from '../hooks/useScheduleFilters';
import api from '../services/api';
import { extractEntityData } from '../utils/apiResponse';
import { Role } from '../utils/roles';

const ScheduleCalendar = lazy(() => import('../components/ScheduleCalendar'));
const ScheduleDetailsModal = lazy(() =>
  import('../components/ScheduleDetailsModal').then((m) => ({
    default: m.ScheduleDetailsModal,
  })),
);

interface ClassGroupInfo {
  id: string;
  code: string;
}

export const ScheduleOperations: React.FC = () => {
  const { classGroupId } = useParams<{ classGroupId: string }>();
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [classGroup, setClassGroup] = useState<ClassGroupInfo | null>(null);
  const [isLoadingClassGroup, setIsLoadingClassGroup] = useState(true);
  const [notFound, setNotFound] = useState(false);

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

  useEffect(() => {
    if (!classGroupId) return;

    const fetchClassGroup = async () => {
      setIsLoadingClassGroup(true);
      try {
        const response = await api.get(`/class-groups/${classGroupId}`);
        setClassGroup(extractEntityData<ClassGroupInfo>(response));
        setNotFound(false);
      } catch {
        setNotFound(true);
      } finally {
        setIsLoadingClassGroup(false);
      }
    };

    void fetchClassGroup();
  }, [classGroupId]);

  if (!classGroupId) {
    return <Navigate to="/class-groups" replace />;
  }

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsDetailsModalOpen(true);
  };

  return (
    <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
      <div className="w-full max-w-6xl mx-auto pb-10">
        <div className="mb-8">
          <Link
            to="/class-groups"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-senac-blue transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            Voltar para Turmas
          </Link>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 text-[#f37021] rounded-xl">
                  <Settings2 size={28} />
                </div>
                Gestão Operacional
              </h1>
              <p className="text-slate-500 mt-1">
                Adie, efetive ou altere padrões de aulas da turma{' '}
                <span className="font-bold text-slate-700">
                  {classGroup?.code || '...'}
                </span>
                .
              </p>
            </div>
            <Link
              to={`/schedule?classGroupId=${classGroupId}`}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors"
            >
              <CalendarClock size={18} />
              Ver Cronograma
            </Link>
          </div>
        </div>

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
            <div className="text-center py-12">
              <p className="text-slate-600 font-medium mb-4">
                Turma não encontrada.
              </p>
              <Link
                to="/class-groups"
                className="text-senac-blue font-bold hover:underline"
              >
                Retornar para a lista de turmas
              </Link>
            </div>
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
      </div>
    </CanAccess>
  );
};

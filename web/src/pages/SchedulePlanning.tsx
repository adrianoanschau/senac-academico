import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import {
  AlertTriangle,
  CalendarClock,
  ChevronDown,
  ChevronUp,
  Maximize,
  Minimize,
  PanelLeftClose,
  PanelLeftOpen,
  Route,
} from 'lucide-react';

import { CanAccess } from '../components/CanAccess';
import { ClassGroupNotFound } from '../components/class-groups/ClassGroupNotFound';
import { GanttPlanner } from '../components/GanttPlanning/GanttPlanner';
import { SubjectConfigPanel } from '../components/GanttPlanning/SubjectConfigPanel';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { ModulePlanningForm } from '../components/ModulePlanning/ModulePlanningForm';
import { PageBackLink, PageHeader, PageLayout } from '../components/ui';
import { useClassGroup } from '../hooks/useFetchedList';
import { useGanttBlueprint } from '../hooks/useGanttBlueprint';
import { usePersistentState } from '../hooks/usePersistentState';
import type { ClassGroupInfo } from '../types/entities';
import { Role } from '../utils/roles';

export const SchedulePlanning: React.FC = () => {
  const { classGroupId } = useParams<{ classGroupId: string }>();
  const navigate = useNavigate();
  const { classGroup, isLoading, notFound } =
    useClassGroup<ClassGroupInfo>(classGroupId);
  const [showLegacyForm, setShowLegacyForm] = useState(false);
  const [isFullscreen, setIsFullscreen] = usePersistentState(
    'schedule_planning_fullscreen',
    false,
  );
  const [isSidebarExpanded, setIsSidebarExpanded] = usePersistentState(
    'schedule_planning_sidebar_expanded',
    false,
  );

  useEffect(() => {
    if (!isFullscreen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isFullscreen, setIsFullscreen]);

  const gantt = useGanttBlueprint(classGroupId ?? '');

  if (!classGroupId) {
    return <Navigate to="/class-groups" replace />;
  }

  const handlePublish = async () => {
    const ok = await gantt.publish();
    if (ok) navigate(`/schedules/operations/${classGroupId}`);
  };

  const plannerBody = classGroup ? (
    <>
      {isFullscreen ? (
        <div className="shrink-0 flex items-center justify-between gap-4 px-4 py-3 border-b border-slate-200 bg-white">
          <div className="min-w-0">
            <p className="font-bold text-slate-800 truncate">
              {classGroup.code}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {classGroup.curriculum?.name || 'Sem grade'} · Turno{' '}
              {classGroup.shift}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => navigate(`/schedule?classGroupId=${classGroupId}`)}
              className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-xl text-sm font-bold transition-colors"
            >
              <CalendarClock size={16} />
              Ver Cronograma
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
              title="Sair da tela cheia (Esc)"
            >
              <Minimize size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Turma
              </p>
              <p className="text-xl font-bold text-slate-800">
                {classGroup.code}
              </p>
              <p className="text-sm text-slate-500">
                {classGroup.curriculum?.name || 'Sem grade'} · Turno{' '}
                {classGroup.shift}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors shrink-0"
              title="Maximizar planejador"
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      )}

      <div
        className={`flex flex-col lg:flex-row ${isFullscreen ? 'flex-1 min-h-0' : 'min-h-[560px]'}`}
      >
        <aside
          className={`w-full shrink-0 border-b lg:border-b-0 border-slate-100 p-5 transition-[width] duration-200 ease-in-out ${
            isSidebarExpanded ? 'lg:w-[480px]' : 'lg:w-80'
          } ${isFullscreen ? 'overflow-y-auto' : ''}`}
        >
          <div className="flex lg:hidden justify-end mb-3">
            <button
              type="button"
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {isSidebarExpanded ? (
                <>
                  <PanelLeftClose size={14} />
                  Recolher painel
                </>
              ) : (
                <>
                  <PanelLeftOpen size={14} />
                  Expandir painel
                </>
              )}
            </button>
          </div>
          <SubjectConfigPanel
            classGroupId={classGroupId}
            moduleNumber={gantt.moduleNumber}
            setModuleNumber={gantt.setModuleNumber}
            startTimeStr={gantt.startTimeStr}
            setStartTimeStr={gantt.setStartTimeStr}
            endTimeStr={gantt.endTimeStr}
            setEndTimeStr={gantt.setEndTimeStr}
            subjectConfigs={gantt.subjectConfigs}
            initSubjectConfigs={gantt.initSubjectConfigs}
            updateSubjectConfig={gantt.updateSubjectConfig}
            toggleDay={gantt.toggleDay}
            onGenerate={gantt.generateBlueprint}
            isGenerating={gantt.isGenerating}
          />
        </aside>

        <div className="hidden lg:flex flex-col items-center justify-center w-9 shrink-0 border-r border-slate-100 bg-slate-50/80">
          <button
            type="button"
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="p-2 rounded-lg text-slate-500 hover:text-senac-blue hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
            title={
              isSidebarExpanded
                ? 'Recolher painel de disciplinas'
                : 'Expandir painel de disciplinas'
            }
          >
            {isSidebarExpanded ? (
              <PanelLeftClose size={18} />
            ) : (
              <PanelLeftOpen size={18} />
            )}
          </button>
        </div>

        <main
          className={`flex-1 p-5 flex flex-col gap-4 min-w-0 ${
            isFullscreen ? 'overflow-y-auto min-h-0' : ''
          }`}
        >
          {!gantt.blueprint ? (
            <div className="flex-1 flex items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-500 font-medium text-center px-6">
                Configure o módulo e clique em &quot;Gerar Rascunho&quot; para
                visualizar as barras no Gantt.
              </p>
            </div>
          ) : (
            <>
              {gantt.blueprint.conflicts.length > 0 && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex gap-3 shrink-0">
                  <AlertTriangle className="text-rose-500 shrink-0" size={20} />
                  <div>
                    <p className="font-bold text-rose-700 text-sm">
                      {gantt.blueprint.conflicts.length} conflito(s) —
                      publicação bloqueada
                    </p>
                    <ul className="mt-1 text-xs text-rose-600 space-y-1">
                      {gantt.blueprint.conflicts.slice(0, 5).map((c, i) => (
                        <li key={i}>{c.message}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <GanttPlanner
                blueprint={gantt.blueprint}
                isRecalculating={gantt.isRecalculating}
                onTaskDateChange={gantt.recalculate}
                isFullscreen={isFullscreen}
              />

              <div className="flex justify-end pt-2 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={
                    !gantt.blueprint.canPublish ||
                    gantt.isPublishing ||
                    gantt.isRecalculating
                  }
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-colors"
                >
                  {gantt.isPublishing ? 'Publicando...' : 'Publicar Cronograma'}
                </button>
              </div>
            </>
          )}
        </main>
      </div>

      {!isFullscreen && (
        <div className="border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={() => setShowLegacyForm((v) => !v)}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1"
          >
            {showLegacyForm ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
            Planejamento legado (trilhas) — fallback temporário
          </button>
          {showLegacyForm && (
            <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <ModulePlanningForm
                classGroupId={classGroupId}
                onSuccess={() =>
                  navigate(`/schedule?classGroupId=${classGroupId}`)
                }
              />
            </div>
          )}
        </div>
      )}
    </>
  ) : null;

  return (
    <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
      <PageLayout size={isFullscreen ? 'default' : 'wide'}>
        {!isFullscreen && (
          <>
            <PageBackLink
              to="/class-groups"
              label="Voltar para Turmas"
              accent="senac"
            />
            <PageHeader
              accent="senac"
              icon={<Route size={28} />}
              title="Planejador Gantt"
              description="Configure dias por UC, gere o rascunho e publique quando estiver sem conflitos."
              action={
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/schedule?classGroupId=${classGroupId}`)
                  }
                  className="shrink-0 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors"
                >
                  <CalendarClock size={18} />
                  Ver Cronograma
                </button>
              }
            />
          </>
        )}

        <div
          className={
            isFullscreen
              ? 'fixed inset-0 z-50 bg-white flex flex-col overflow-hidden'
              : 'bg-white rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden'
          }
        >
          <LoadingOverlay visible={isLoading} message="Carregando turma..." />

          {notFound ? <ClassGroupNotFound /> : plannerBody}
        </div>
      </PageLayout>
    </CanAccess>
  );
};

import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  Search,
  CalendarClock,
  Maximize,
  Minimize,
  Settings2,
  ArrowLeft,
} from "lucide-react";
import { CanAccess } from "../components/CanAccess";
import { Select } from "../components/Select";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { usePersistentState } from "../hooks/usePersistentState";
import { Role } from "../utils/roles";
import api from "../services/api";

const ScheduleCalendar = lazy(() => import("../components/ScheduleCalendar"));
const ScheduleDetailsModal = lazy(() =>
  import("../components/ScheduleDetailsModal").then((m) => ({
    default: m.ScheduleDetailsModal,
  })),
);

interface Subject {
  id: string;
  name: string;
  code?: string;
}

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

  const [isFullscreen, setIsFullscreen] = usePersistentState(
    "schedule_ops_fullscreen",
    false,
  );
  const [search, setSearch] = usePersistentState("schedule_ops_search", "");
  const [status, setStatus] = usePersistentState<string[]>("schedule_ops_status", [
    "PLANNED",
    "SCHEDULED",
    "COMPLETED",
  ]);
  const [subjectId, setSubjectId] = usePersistentState<string>(
    "schedule_ops_subjectId",
    "",
  );
  const [roomId, setRoomId] = usePersistentState<string>("schedule_ops_roomId", "");
  const [professorId, setProfessorId] = usePersistentState<string>(
    "schedule_ops_professorId",
    "",
  );

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [rooms, setRooms] = useState<{ id: string; name: string }[]>([]);
  const [professors, setProfessors] = useState<{ id: string; name: string }[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedDateStr, setSelectedDateStr] = usePersistentState<string>(
    "schedule_ops_selected_date",
    new Date().toISOString(),
  );
  const selectedDate = !isNaN(new Date(selectedDateStr).getTime())
    ? new Date(selectedDateStr)
    : new Date();

  useEffect(() => {
    if (!classGroupId) return;

    const fetchClassGroup = async () => {
      setIsLoadingClassGroup(true);
      try {
        const response = await api.get(`/class-groups/${classGroupId}`);
        setClassGroup(response.data?.data || response.data);
        setNotFound(false);
      } catch {
        setNotFound(true);
      } finally {
        setIsLoadingClassGroup(false);
      }
    };

    fetchClassGroup();
  }, [classGroupId]);

  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const [subjectsRes, roomsRes, professorsRes] = await Promise.all([
          api.get("/subjects", { params: { classGroupId } }),
          api.get("/rooms"),
          api.get("/professors"),
        ]);
        setSubjects(subjectsRes.data?.data || subjectsRes.data || []);
        setRooms(roomsRes.data?.data || roomsRes.data || []);
        setProfessors(professorsRes.data?.data || professorsRes.data || []);
      } catch (error) {
        console.error("Erro ao buscar dados para os filtros:", error);
      }
    };
    if (classGroupId) fetchFiltersData();
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
                Adie, efetive ou altere padrões de aulas da turma{" "}
                <span className="font-bold text-slate-700">{classGroup?.code || "..."}</span>.
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
              ? "fixed inset-0 z-50 bg-white p-8 overflow-y-auto"
              : "bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden"
          }
        >
          <LoadingOverlay visible={isLoadingClassGroup} message="Carregando turma..." />

          {notFound ? (
            <div className="text-center py-12">
              <p className="text-slate-600 font-medium mb-4">Turma não encontrada.</p>
              <Link to="/class-groups" className="text-senac-blue font-bold hover:underline">
                Retornar para a lista de turmas
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div className="relative w-72">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search size={18} className="text-slate-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#f37021] outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
                      placeholder="Buscar aulas..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
                    <span>Status:</span>
                    <div className="flex bg-[#f8f9fc] rounded-xl p-1 gap-1">
                      {[
                        { id: "PLANNED", label: "Planejados" },
                        { id: "SCHEDULED", label: "Agendados" },
                        { id: "COMPLETED", label: "Concluídos" },
                        { id: "CANCELLED", label: "Cancelados" },
                      ].map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setStatus((prev) =>
                              prev.includes(s.id)
                                ? prev.filter((st) => st !== s.id)
                                : [...prev, s.id],
                            );
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${status.includes(s.id) ? "bg-[#f37021] text-white shadow-md" : "text-slate-500 hover:bg-slate-200 hover:text-slate-800"}`}
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
                  <div className="flex-1 min-w-50">
                    <Select
                      value={professorId}
                      onChange={(e) => setProfessorId(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#f37021] outline-none transition-all text-slate-800 cursor-pointer font-medium text-sm"
                    >
                      <option value="">Todos os Professores...</option>
                      {professors.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex-1 min-w-50">
                    <Select
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#f37021] outline-none transition-all text-slate-800 cursor-pointer font-medium text-sm"
                    >
                      <option value="">Todas as Salas...</option>
                      {rooms.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex-1 min-w-50">
                    <Select
                      value={subjectId}
                      onChange={(e) => setSubjectId(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#f37021] outline-none transition-all text-slate-800 cursor-pointer font-medium text-sm"
                    >
                      <option value="">Todas as Disciplinas...</option>
                      {subjects.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.code ? `${sub.code}: ${sub.name}` : sub.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              <Suspense
                fallback={
                  <div className="h-200 flex items-center justify-center text-slate-500 font-medium">
                    Carregando calendário...
                  </div>
                }
              >
                <ScheduleCalendar
                  filters={{
                    search,
                    status,
                    subjectId,
                    roomId,
                    professorId,
                    classGroupId,
                    _refresh: refreshTrigger,
                  }}
                  onEventClick={handleEventClick}
                  isFullscreen={isFullscreen}
                  selectedDate={selectedDate}
                  onDateChange={(date) => setSelectedDateStr(date.toISOString())}
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
              onSuccess={() => {
                setRefreshTrigger((prev) => prev + 1);
              }}
            />
          )}
        </Suspense>
      </div>
    </CanAccess>
  );
};

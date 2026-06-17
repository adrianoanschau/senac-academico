import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Route, CalendarClock } from "lucide-react";
import { CanAccess } from "../components/CanAccess";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { ModulePlanningForm } from "../components/ModulePlanning/ModulePlanningForm";
import { Role } from "../utils/roles";
import api from "../services/api";

interface ClassGroupInfo {
  id: string;
  code: string;
  shift: string;
  curriculum?: { name: string };
}

export const SchedulePlanning: React.FC = () => {
  const { classGroupId } = useParams<{ classGroupId: string }>();
  const navigate = useNavigate();
  const [classGroup, setClassGroup] = useState<ClassGroupInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!classGroupId) return;

    const fetchClassGroup = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/class-groups/${classGroupId}`);
        setClassGroup(response.data?.data || response.data);
        setNotFound(false);
      } catch {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassGroup();
  }, [classGroupId]);

  if (!classGroupId) {
    return <Navigate to="/class-groups" replace />;
  }

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

          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-senac-blue/10 text-senac-blue rounded-xl">
                  <Route size={28} />
                </div>
                Planejamento de Módulo
              </h1>
              <p className="text-slate-500 mt-1">
                Configure trilhas simultâneas e sequências de disciplinas para a turma.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate(`/schedule?classGroupId=${classGroupId}`)}
              className="shrink-0 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors"
            >
              <CalendarClock size={18} />
              Ver Cronograma
            </button>
          </div>
        </div>

        <div className="bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden">
          <LoadingOverlay visible={isLoading} message="Carregando turma..." />

          {notFound ? (
            <div className="text-center py-12">
              <p className="text-slate-600 font-medium mb-4">Turma não encontrada.</p>
              <Link
                to="/class-groups"
                className="text-senac-blue font-bold hover:underline"
              >
                Retornar para a lista de turmas
              </Link>
            </div>
          ) : classGroup ? (
            <>
              <div className="mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Turma
                </p>
                <p className="text-xl font-bold text-slate-800">{classGroup.code}</p>
                <p className="text-sm text-slate-500 mt-1">
                  {classGroup.curriculum?.name || "Sem grade curricular"} · Turno {classGroup.shift}
                </p>
              </div>

              <ModulePlanningForm
                classGroupId={classGroupId}
                onSuccess={() => navigate(`/schedule?classGroupId=${classGroupId}`)}
              />
            </>
          ) : null}
        </div>
      </div>
    </CanAccess>
  );
};

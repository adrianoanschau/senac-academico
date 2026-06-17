import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, BookOpen, Info, Library } from "lucide-react";
import { Select } from "../components/Select";
import { ContextPanel } from "../components/ContextPanel";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { SubjectCurriculumBadges } from "../components/Curriculum/SubjectCurriculumBadges";
import { usePersistentState } from "../hooks/usePersistentState";
import api from "../services/api";
import type { Subject, Course } from "../types/subject.types";

type LinkFilter = "all" | "linked" | "orphan";

export const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = usePersistentState("subjects_search", "");
  const [linkFilter, setLinkFilter] = usePersistentState<LinkFilter>(
    "subjects_link_filter",
    "linked",
  );
  const [courseFilter, setCourseFilter] = usePersistentState(
    "subjects_course_filter",
    "all",
  );
  const [showOrphans, setShowOrphans] = usePersistentState(
    "subjects_show_orphans",
    false,
  );

  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const [subjectsRes, coursesRes] = await Promise.all([
        api.get("/subjects", { params: { includeCurriculums: true } }),
        api.get("/courses"),
      ]);
      setSubjects(subjectsRes.data.data || []);
      setCourses(coursesRes.data.data || coursesRes.data || []);
    } catch (error) {
      console.error("Erro ao buscar unidades curriculares:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const effectiveLinkFilter = showOrphans ? linkFilter : linkFilter === "orphan" ? "linked" : linkFilter;

  const filteredSubjects = useMemo(() => {
    return subjects.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.code.toLowerCase().includes(search.toLowerCase());

      const linkCount = s.curriculums?.length ?? 0;
      const isOrphan = linkCount === 0;

      if (!showOrphans && isOrphan) return false;

      const matchesLink =
        effectiveLinkFilter === "all" ||
        (effectiveLinkFilter === "linked" && !isOrphan) ||
        (effectiveLinkFilter === "orphan" && isOrphan);

      const matchesCourse =
        courseFilter === "all" ||
        (s.curriculums?.some(
          (l) => l.curriculum?.course?.id === courseFilter,
        ) ??
          false);

      return matchesSearch && matchesLink && matchesCourse;
    });
  }, [subjects, search, effectiveLinkFilter, courseFilter, showOrphans]);

  const linkedCount = subjects.filter(
    (s) => (s.curriculums?.length ?? 0) > 0,
  ).length;
  const orphanCount = subjects.length - linkedCount;

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-menu-uc/10 text-menu-uc rounded-xl">
              <BookOpen size={28} />
            </div>
            Dicionário de Unidades Curriculares
          </h1>
          <p className="text-slate-500 mt-1">
            Consulte todas as disciplinas cadastradas e seus vínculos com cursos
            e grades.
          </p>
        </div>
        <Link
          to="/curriculums"
          className="text-sm font-bold text-menu-matriz hover:opacity-80 flex items-center gap-2 bg-menu-matriz/10 px-4 py-2.5 rounded-xl transition-colors"
        >
          <Library size={18} />
          Adicionar via Matriz Curricular
        </Link>
      </div>

      <div className="bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden">
        <LoadingOverlay
          visible={isLoading}
          message="Buscando disciplinas..."
        />

        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="relative w-72">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              className="w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-uc outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
              placeholder="Buscar unidade curricular..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-500">
                Curso:
              </span>
              <Select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="px-3 py-2 bg-[#f8f9fc] border-none rounded-xl text-sm font-bold text-slate-700 cursor-pointer min-w-[160px]"
              >
                <option value="all">Todos</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex bg-[#f8f9fc] rounded-xl p-1 gap-1">
              {(
                [
                  { id: "all" as const, label: "Todas" },
                  { id: "linked" as const, label: "Vinculadas" },
                  { id: "orphan" as const, label: "Sem vínculo" },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setLinkFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    effectiveLinkFilter === f.id
                      ? "bg-menu-uc text-white shadow-md"
                      : "text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {!showOrphans && orphanCount > 0 && (
          <div className="mb-4 flex items-center justify-between bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-sm">
            <span className="text-amber-800">
              {orphanCount} UC{orphanCount !== 1 ? "s" : ""} sem vínculo
              oculta{orphanCount !== 1 ? "s" : ""}.
            </span>
            <button
              onClick={() => {
                setShowOrphans(true);
                setLinkFilter("all");
              }}
              className="font-bold text-amber-700 hover:text-amber-900 underline"
            >
              Exibir órfãs
            </button>
          </div>
        )}

        {showOrphans && (
          <div className="mb-4 flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm">
            <span className="text-slate-600">
              Exibindo UCs sem vínculo ({orphanCount}).
            </span>
            <button
              onClick={() => {
                setShowOrphans(false);
                if (linkFilter === "orphan") setLinkFilter("linked");
              }}
              className="font-bold text-slate-600 hover:text-slate-800 underline"
            >
              Ocultar órfãs
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">
                  Nome da UC
                </th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">
                  Código
                </th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-center">
                  Carga Horária
                </th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">
                  Vinculada a
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.length === 0 && !isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-8 text-center text-slate-500 font-medium"
                  >
                    Nenhuma disciplina encontrada.
                  </td>
                </tr>
              ) : (
                filteredSubjects.map((subject) => {
                  const isOrphan = (subject.curriculums?.length ?? 0) === 0;
                  return (
                    <tr
                      key={subject.id}
                      className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">
                            {subject.name}
                          </span>
                          {isOrphan && showOrphans && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-700">
                              Órfã
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-500 font-medium">
                        {subject.code}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-menu-uc">
                        {subject.hours}h
                      </td>
                      <td className="py-4 px-4">
                        <SubjectCurriculumBadges
                          links={subject.curriculums ?? []}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 text-sm font-medium text-slate-400">
          Mostrando {filteredSubjects.length} de {subjects.length} disciplina(s)
        </div>
      </div>

      <ContextPanel
        title="Dicionário de UCs"
        description="Catálogo global de referência. A gestão de disciplinas acontece dentro de cada Matriz Curricular."
        icon={<Info className="text-menu-uc" size={24} />}
        tips={[
          "Uma mesma UC pode aparecer em múltiplas grades (reutilização).",
          "UCs sem vínculo foram criadas mas ainda não associadas a uma grade.",
          "Para adicionar disciplinas, acesse a Matriz Curricular e abra a grade desejada.",
        ]}
      >
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mt-4">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <BookOpen size={16} className="text-menu-uc" /> Resumo
          </h4>
          <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
            <span>Total de Disciplinas:</span>
            <span className="font-bold">{subjects.length}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
            <span>Vinculadas:</span>
            <span className="font-bold text-emerald-600">{linkedCount}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
            <span>Sem vínculo:</span>
            <span className="font-bold text-amber-600">{orphanCount}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-600">
            <span>Carga Horária Média:</span>
            <span className="font-bold">
              {subjects.length > 0
                ? Math.round(
                    subjects.reduce((acc, s) => acc + (s.hours || 0), 0) /
                      subjects.length,
                  )
                : 0}
              h
            </span>
          </div>
        </div>
      </ContextPanel>
    </div>
  );
};

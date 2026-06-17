import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import api from "../../services/api";
import type { Subject } from "../../types/subject.types";

interface SubjectAutocompleteProps {
  curriculumId: string;
  onSelect: (subject: Subject) => void;
  selectedSubjectId?: string;
}

export const SubjectAutocomplete: React.FC<SubjectAutocompleteProps> = ({
  curriculumId,
  onSelect,
  selectedSubjectId,
}) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Subject[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const params: Record<string, string> = {
          excludeCurriculumId: curriculumId,
        };
        if (search.trim()) params.search = search.trim();

        const response = await api.get("/subjects", { params });
        setResults(response.data.data || []);
        setIsOpen(true);
      } catch (error) {
        console.error("Erro ao buscar disciplinas:", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, curriculumId]);

  const handleSelect = (subject: Subject) => {
    onSelect(subject);
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-400" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-11 pr-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-matriz outline-none transition-all text-slate-800"
          placeholder="Buscar por nome ou código..."
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-h-60 overflow-y-auto py-2">
          {isSearching ? (
            <p className="px-4 py-3 text-sm text-slate-400">
              Buscando disciplinas...
            </p>
          ) : results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-400">
              {search.trim()
                ? "Nenhuma disciplina encontrada."
                : "Digite para buscar ou veja as disponíveis."}
            </p>
          ) : (
            results.map((subject) => {
              const isSelected = subject.id === selectedSubjectId;
              const linkCount = subject.curriculums?.length ?? 0;

              return (
                <button
                  key={subject.id}
                  type="button"
                  onClick={() => handleSelect(subject)}
                  disabled={isSelected}
                  className={`w-full text-left px-4 py-3 transition-colors ${
                    isSelected
                      ? "bg-slate-50 text-slate-400 cursor-not-allowed"
                      : "hover:bg-slate-50 text-slate-800"
                  }`}
                >
                  <div className="font-bold text-sm">
                    {subject.code}: {subject.name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {subject.hours}h
                    {linkCount > 0 && ` · usada em ${linkCount} grade(s)`}
                    {isSelected && " · já vinculada"}
                  </div>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

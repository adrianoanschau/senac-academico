import React, { useState } from "react";
import { X } from "lucide-react";
import { LoadingOverlay } from "../LoadingOverlay";
import { SubjectAutocomplete } from "./SubjectAutocomplete";
import { alertDialog } from "../../utils/dialog";
import api from "../../services/api";
import type { Curriculum, Subject } from "../../types/subject.types";

type DrawerTab = "search" | "create";

interface AddSubjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  curriculum: Curriculum;
  defaultModule: number;
  onSuccess: (message: string) => void;
}

const initialCreateForm = { name: "", code: "", hours: 0 };

export const AddSubjectDrawer: React.FC<AddSubjectDrawerProps> = ({
  isOpen,
  onClose,
  curriculum,
  defaultModule,
  onSuccess,
}) => {
  const [tab, setTab] = useState<DrawerTab>("search");
  const [module, setModule] = useState(defaultModule);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [createForm, setCreateForm] = useState(initialCreateForm);
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setModule(defaultModule);
      setTab("search");
      setSelectedSubject(null);
      setCreateForm(initialCreateForm);
    }
  }, [isOpen, defaultModule]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload =
        tab === "search"
          ? { subjectId: selectedSubject?.id, module }
          : { createSubject: createForm, module };

      if (tab === "search" && !selectedSubject?.id) {
        alertDialog("Selecione uma disciplina da lista.");
        return;
      }

      await api.post(`/curriculums/${curriculum.id}/subjects`, payload);

      const subjectName =
        tab === "search" ? selectedSubject!.name : createForm.name;
      onSuccess(`${subjectName} adicionada ao Módulo ${module}`);
      onClose();
    } catch (error: unknown) {
      console.error("Erro ao adicionar disciplina:", error);
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "Erro ao adicionar a disciplina.";
      alertDialog(
        Array.isArray(message) ? message.join(", ") : String(message),
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 flex flex-col rounded-l-4xl border-l border-slate-100 overflow-hidden">
        <div className="p-8 flex-1 overflow-y-auto relative">
          <LoadingOverlay
            visible={isSaving}
            message="Adicionando disciplina..."
          />

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Adicionar Disciplina
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-6 space-y-1">
            <p className="text-sm text-slate-500">
              Grade:{" "}
              <span className="font-bold text-slate-700">{curriculum.name}</span>
            </p>
            {curriculum.course?.name && (
              <p className="text-sm text-slate-500">
                Curso:{" "}
                <span className="font-bold text-slate-700">
                  {curriculum.course.name}
                </span>
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Módulo
              </label>
              <input
                required
                type="number"
                min={1}
                value={module}
                onChange={(e) => setModule(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-matriz outline-none transition-all text-slate-800"
              />
            </div>

            <div className="flex bg-[#f8f9fc] rounded-xl p-1 gap-1">
              {(
                [
                  { id: "search" as const, label: "Buscar UC" },
                  { id: "create" as const, label: "Criar nova UC" },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    tab === item.id
                      ? "bg-menu-matriz text-white shadow-md"
                      : "text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {tab === "search" ? (
              <div className="space-y-3">
                <SubjectAutocomplete
                  curriculumId={curriculum.id}
                  onSelect={setSelectedSubject}
                  selectedSubjectId={selectedSubject?.id}
                />
                {selectedSubject && (
                  <div className="bg-menu-matriz/5 border border-menu-matriz/20 rounded-xl p-4">
                    <p className="text-sm font-bold text-slate-800">
                      {selectedSubject.code}: {selectedSubject.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {selectedSubject.hours}h
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Nome da UC
                  </label>
                  <input
                    required
                    type="text"
                    value={createForm.name}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-matriz outline-none transition-all text-slate-800"
                    placeholder="Ex: Lógica de Programação"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Código da UC
                  </label>
                  <input
                    required
                    type="text"
                    value={createForm.code}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, code: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-matriz outline-none transition-all text-slate-800"
                    placeholder="Ex: LP"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Carga Horária Total
                  </label>
                  <input
                    required
                    type="number"
                    min={1}
                    value={createForm.hours || ""}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        hours: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-matriz outline-none transition-all text-slate-800"
                    placeholder="Ex: 60"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving || (tab === "search" && !selectedSubject)}
                className="bg-menu-matriz hover:opacity-90 disabled:opacity-70 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md shadow-menu-matriz/30"
              >
                {isSaving ? "Adicionando..." : "Adicionar à Grade"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

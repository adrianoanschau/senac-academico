import React, { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, Layers, X, Calendar } from "lucide-react";
import { Select } from "../components/Select";
import { DateSelect } from "../components/DateSelect";
import { confirmDialog, alertDialog } from "../utils/dialog";
import { CanAccess } from "../components/CanAccess";
import { ContextPanel } from "../components/ContextPanel";
import { usePersistentState } from "../hooks/usePersistentState";
import api from "../services/api";

interface Curriculum {
  id: string;
  name: string;
}

interface ClassGroup {
  id?: string | number;
  code: string;
  startDate: string;
  endDate: string;
  shift: string;
  curriculumId: string;
  curriculum?: Curriculum;
}

const initialFormState: ClassGroup = {
  code: "",
  startDate: "",
  endDate: "",
  shift: "Manhã",
  curriculumId: "",
};

export const ClassGroups: React.FC = () => {
  const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ClassGroup>(initialFormState);
  const [shiftFilter, setShiftFilter] = usePersistentState(
    "classGroups_shift",
    "all",
  );
  const [search, setSearch] = usePersistentState("classGroups_search", "");

  const fetchClassGroups = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/class-groups");
      setClassGroups(response.data.data || response.data || []);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurriculums = async () => {
    try {
      const response = await api.get("/curriculums");
      setCurriculums(response.data.data || response.data || []);
    } catch (error) {
      console.error("Erro ao buscar grades curriculares:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchClassGroups();
    fetchCurriculums();
  }, []);

  const handleOpenNewModal = () => {
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (classGroup: ClassGroup) => {
    setFormData(classGroup);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string | number | undefined) => {
    if (!id) return;
    if (!(await confirmDialog("Tem certeza que deseja excluir esta turma?")))
      return;

    try {
      await api.delete(`/class-groups/${id}`);
      fetchClassGroups();
    } catch (error) {
      console.error("Erro ao excluir turma:", error);
      alertDialog("Erro ao excluir a turma. Verifique dependências.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const isEditing = !!formData.id;
      const url = isEditing ? `/class-groups/${formData.id}` : "/class-groups";

      const payload: Partial<ClassGroup> = { ...formData };
      if (!isEditing) delete payload.id;
      delete payload.curriculum; // Remove propriedades não necessárias para envio da API

      if (isEditing) {
        await api.patch(url, payload);
      } else {
        await api.post(url, payload);
      }

      setIsModalOpen(false);
      fetchClassGroups();
    } catch (error) {
      console.error("Erro ao salvar turma:", error);
      alertDialog("Erro ao salvar os dados da turma.");
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      // Ajuste simples para datas formatadas ISO YYYY-MM-DD
      const [year, month, day] = dateStr.substring(0, 10).split("-");
      if (year && month && day) {
        return `${day}/${month}/${year}`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return "";
    return dateStr.substring(0, 10);
  };

  const filteredClassGroups = classGroups.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      (c.curriculum?.name &&
        c.curriculum.name.toLowerCase().includes(search.toLowerCase()));
    const matchesShift = shiftFilter === "all" || c.shift === shiftFilter;
    return matchesSearch && matchesShift;
  });

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-menu-turmas/10 text-menu-turmas rounded-xl">
              <Layers size={28} />
            </div>
            Turmas
          </h1>
          <p className="text-slate-500 mt-1">
            Gerencie os grupos de alunos e seus períodos letivos.
          </p>
        </div>
        <CanAccess roles={["ADMIN"]}>
          <button
            onClick={handleOpenNewModal}
            className="bg-menu-turmas hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md shadow-menu-turmas/30"
          >
            <Plus size={20} />
            Nova Turma
          </button>
        </CanAccess>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              className="w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-turmas outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
              placeholder="Buscar turma..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
            <span>Turno:</span>
            <div className="flex bg-[#f8f9fc] rounded-xl p-1 gap-1">
              {[
                { id: "all", label: "Todos" },
                { id: "Manhã", label: "Manhã" },
                { id: "Tarde", label: "Tarde" },
                { id: "Noite", label: "Noite" },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setShiftFilter(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${shiftFilter === s.id ? "bg-menu-turmas text-white shadow-md" : "text-slate-500 hover:bg-slate-200 hover:text-slate-800"}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">
                  Código da Turma
                </th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">
                  Grade Curricular
                </th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">
                  Data de Início
                </th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">
                  Data de Término
                </th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm">
                  Turno
                </th>
                <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-slate-500 font-medium"
                  >
                    Carregando turmas...
                  </td>
                </tr>
              ) : filteredClassGroups.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-slate-500 font-medium"
                  >
                    Nenhuma turma cadastrada.
                  </td>
                </tr>
              ) : (
                filteredClassGroups.map((turma) => (
                  <tr
                    key={turma.id}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-4 font-bold text-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                          {turma.code?.substring(0, 2)}
                        </div>
                        <span className="font-bold text-menu-turmas">
                          {turma.code}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-medium">
                      {turma.curriculum?.name || "-"}
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-medium">
                      {formatDate(turma.startDate)}
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-medium">
                      {formatDate(turma.endDate)}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          turma.shift === "Manhã"
                            ? "bg-amber-100 text-amber-700"
                            : turma.shift === "Tarde"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {turma.shift}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <CanAccess roles={["ADMIN"]}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(turma)}
                            className="p-2 text-slate-400 hover:text-menu-turmas hover:bg-menu-turmas/10 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(turma.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </CanAccess>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Cadastro/Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-4xl p-8 w-full max-w-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Turma</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Código da Turma
                </label>
                <input
                  required
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  type="text"
                  className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-turmas outline-none transition-all text-slate-800 uppercase"
                  placeholder="Ex: ENF24-1N3R"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Grade Curricular
                </label>
                <Select
                  required
                  value={formData.curriculumId}
                  onChange={(e) =>
                    setFormData({ ...formData, curriculumId: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-turmas outline-none transition-all text-slate-800 cursor-pointer"
                >
                  <option value="">Selecione uma grade curricular...</option>
                  {curriculums.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Data de Início
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-menu-turmas transition-colors z-10">
                      <Calendar size={18} strokeWidth={2.5} />
                    </div>
                    <DateSelect
                      value={formatDateForInput(formData.startDate)}
                      onChange={(val) =>
                        setFormData((prev) => ({
                          ...prev,
                          startDate: val,
                          endDate:
                            !prev.endDate || prev.endDate < val
                              ? val
                              : prev.endDate,
                        }))
                      }
                      placeholder="DD/MM/AAAA"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Término Previsto
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-menu-turmas transition-colors z-10">
                      <Calendar size={18} strokeWidth={2.5} />
                    </div>
                    <DateSelect
                      value={formatDateForInput(formData.endDate)}
                      onChange={(val) =>
                        setFormData({ ...formData, endDate: val })
                      }
                      placeholder="DD/MM/AAAA"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Turno
                </label>
                <Select
                  value={formData.shift}
                  onChange={(e) =>
                    setFormData({ ...formData, shift: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-menu-turmas outline-none transition-all text-slate-800 cursor-pointer"
                >
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                  <option value="Integral">Integral</option>
                </Select>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-menu-turmas hover:opacity-90 disabled:opacity-70 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md shadow-menu-turmas/30"
                >
                  {isSaving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ContextPanel
        title="Gestão de Turmas"
        description="Gerencie os grupos de alunos e seus respectivos períodos letivos."
        icon={<Layers className="text-menu-turmas" size={24} />}
        tips={[
          "Toda turma precisa de uma Matriz Curricular (Grade) para ter disciplinas.",
          "Fique atento às datas de início e término para a correta geração de aulas.",
          'Após criar uma turma, vá até "Cronograma" para gerar a rotina de horários.',
        ]}
      >
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mt-4">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Layers size={16} className="text-menu-turmas" /> Resumo
          </h4>
          <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
            <span>Total de Turmas:</span>
            <span className="font-bold">{classGroups.length}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
            <span>Turno Manhã:</span>
            <span className="font-bold">
              {classGroups.filter((c) => c.shift === "Manhã").length}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
            <span>Turno Tarde:</span>
            <span className="font-bold">
              {classGroups.filter((c) => c.shift === "Tarde").length}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-600">
            <span>Turno Noite:</span>
            <span className="font-bold">
              {classGroups.filter((c) => c.shift === "Noite").length}
            </span>
          </div>
        </div>
      </ContextPanel>
    </div>
  );
};

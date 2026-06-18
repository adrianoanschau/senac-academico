import React, { useEffect, useState } from 'react';

import { Loader2, Sparkles } from 'lucide-react';

import api from '../../services/api';
import type { SubjectConfig } from '../../types/gantt.types';
import { DateSelect } from '../DateSelect';
import { Select } from '../Select';
import { TimeSelect } from '../TimeSelect';

const DAYS_OF_WEEK = [
  { label: 'Dom', value: 0 },
  { label: 'Seg', value: 1 },
  { label: 'Ter', value: 2 },
  { label: 'Qua', value: 3 },
  { label: 'Qui', value: 4 },
  { label: 'Sex', value: 5 },
  { label: 'Sáb', value: 6 },
];

interface Professor {
  id: string;
  name: string;
}

interface Room {
  id: string;
  name: string;
}

interface SubjectConfigPanelProps {
  classGroupId: string;
  moduleNumber: number | '';
  setModuleNumber: (value: number | '') => void;
  startTimeStr: string;
  setStartTimeStr: (value: string) => void;
  endTimeStr: string;
  setEndTimeStr: (value: string) => void;
  subjectConfigs: SubjectConfig[];
  initSubjectConfigs: (
    subjects: import('../../types/gantt.types').ModuleSubject[],
  ) => void;
  updateSubjectConfig: (id: string, patch: Partial<SubjectConfig>) => void;
  toggleDay: (id: string, day: number) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const SubjectConfigPanel: React.FC<SubjectConfigPanelProps> = ({
  classGroupId,
  moduleNumber,
  setModuleNumber,
  startTimeStr,
  setStartTimeStr,
  endTimeStr,
  setEndTimeStr,
  subjectConfigs,
  initSubjectConfigs,
  updateSubjectConfig,
  toggleDay,
  onGenerate,
  isGenerating,
}) => {
  const [modules, setModules] = useState<number[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoadingModules, setIsLoadingModules] = useState(false);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [profRes, roomRes] = await Promise.all([
          api.get('/professors'),
          api.get('/rooms'),
        ]);
        setProfessors(profRes.data?.data || profRes.data || []);
        setRooms(roomRes.data?.data || roomRes.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const fetchModules = async () => {
      setIsLoadingModules(true);
      try {
        const res = await api.get(`/class-groups/${classGroupId}/modules`);
        setModules(res.data?.data || []);
      } catch {
        setModules([]);
      } finally {
        setIsLoadingModules(false);
      }
    };
    fetchModules();
  }, [classGroupId]);

  useEffect(() => {
    if (!moduleNumber) {
      initSubjectConfigs([]);
      return;
    }

    const fetchSubjects = async () => {
      setIsLoadingSubjects(true);
      try {
        const res = await api.get(
          `/class-groups/${classGroupId}/modules/${moduleNumber}/subjects`,
        );
        initSubjectConfigs(res.data?.data || []);
      } catch {
        initSubjectConfigs([]);
      } finally {
        setIsLoadingSubjects(false);
      }
    };
    fetchSubjects();
  }, [classGroupId, moduleNumber, initSubjectConfigs]);

  return (
    <div className="flex flex-col gap-5 h-full">
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
          Módulo
        </label>
        <Select
          value={moduleNumber === '' ? '' : String(moduleNumber)}
          onChange={(e) =>
            setModuleNumber(e.target.value ? Number(e.target.value) : '')
          }
          disabled={isLoadingModules}
          className="w-full px-3 py-2.5 bg-[#f8f9fc] border-none rounded-xl text-sm font-medium cursor-pointer"
        >
          <option value="">
            {isLoadingModules ? 'Carregando...' : 'Selecione...'}
          </option>
          {modules.map((m) => (
            <option key={m} value={m}>
              Módulo {m}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
            Início
          </label>
          <TimeSelect
            value={startTimeStr}
            onChange={setStartTimeStr}
            placeholder="08:00"
            minHour={7}
            maxHour={22}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
            Término
          </label>
          <TimeSelect
            value={endTimeStr}
            onChange={setEndTimeStr}
            placeholder="10:00"
            minHour={7}
            maxHour={22}
          />
        </div>
      </div>

      <hr className="border-slate-100" />

      <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
        {isLoadingSubjects ? (
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Loader2 size={16} className="animate-spin" />
            Carregando disciplinas...
          </div>
        ) : subjectConfigs.length === 0 ? (
          <p className="text-sm text-slate-500">
            Selecione um módulo para configurar as UCs.
          </p>
        ) : (
          subjectConfigs.map((cfg) => (
            <div
              key={cfg.curriculumSubjectId}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3"
            >
              <div>
                <p className="font-bold text-slate-800 text-sm">
                  {cfg.subjectCode}: {cfg.subjectName}
                </p>
                <p className="text-xs text-slate-500">{cfg.hours}h</p>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-600 mb-2">
                  Dias da semana
                </p>
                <div className="flex flex-wrap gap-1">
                  {DAYS_OF_WEEK.map((day) => {
                    const selected = cfg.daysOfWeek.includes(day.value);
                    return (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() =>
                          toggleDay(cfg.curriculumSubjectId, day.value)
                        }
                        className={`px-2 py-1 rounded-lg text-xs font-bold border transition-all ${
                          selected
                            ? 'bg-senac-blue border-senac-blue text-white'
                            : 'bg-white border-slate-200 text-slate-500'
                        }`}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-600 mb-2">
                  Iniciar após
                </p>
                <Select
                  value={cfg.dependsOnId || ''}
                  onChange={(e) => {
                    const dependsOnId = e.target.value;
                    updateSubjectConfig(cfg.curriculumSubjectId, {
                      dependsOnId,
                      ...(dependsOnId ? { startDate: '' } : {}),
                    });
                  }}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs cursor-pointer"
                >
                  <option value="">Sem encadeamento</option>
                  {subjectConfigs
                    .filter(
                      (other) =>
                        other.curriculumSubjectId !== cfg.curriculumSubjectId,
                    )
                    .map((other) => (
                      <option
                        key={other.curriculumSubjectId}
                        value={other.curriculumSubjectId}
                      >
                        {other.subjectCode}: {other.subjectName}
                      </option>
                    ))}
                </Select>
                {cfg.dependsOnId ? (
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    O início será calculado automaticamente no dia seguinte ao
                    término da UC predecessora.
                  </p>
                ) : null}
              </div>

              {!cfg.dependsOnId ? (
                <div>
                  <p className="text-xs font-bold text-slate-600 mb-2">
                    Data de início
                  </p>
                  <DateSelect
                    value={cfg.startDate}
                    onChange={(val) =>
                      updateSubjectConfig(cfg.curriculumSubjectId, {
                        startDate: val,
                      })
                    }
                    placeholder="DD/MM/AAAA"
                  />
                </div>
              ) : null}

              <label className="flex items-center gap-2 cursor-pointer group/priority">
                <input
                  type="checkbox"
                  checked={cfg.isPriority}
                  onChange={(e) =>
                    updateSubjectConfig(cfg.curriculumSubjectId, {
                      isPriority: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-senac-blue border-slate-300 rounded focus:ring-senac-blue cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-600 group-hover/priority:text-senac-blue transition-colors">
                  Prioridade alta
                </span>
              </label>
              {cfg.isPriority ? (
                <p className="text-[11px] text-slate-500 leading-snug">
                  Agendada antes das demais: em datas sobrepostas, esta UC ocupa
                  o horário e as outras pulam apenas aquela ocorrência.
                </p>
              ) : null}

              <Select
                value={cfg.professorId}
                onChange={(e) =>
                  updateSubjectConfig(cfg.curriculumSubjectId, {
                    professorId: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs cursor-pointer"
              >
                <option value="">Professor...</option>
                {professors.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Select>

              <Select
                value={cfg.roomId}
                onChange={(e) =>
                  updateSubjectConfig(cfg.curriculumSubjectId, {
                    roomId: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs cursor-pointer"
              >
                <option value="">Sala...</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </Select>
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating || !subjectConfigs.length}
        className="w-full bg-senac-blue hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
      >
        {isGenerating ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Gerando...
          </>
        ) : (
          <>
            <Sparkles size={18} /> Gerar Rascunho
          </>
        )}
      </button>
    </div>
  );
};

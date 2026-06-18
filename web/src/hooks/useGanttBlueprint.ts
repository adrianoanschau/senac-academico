import { useCallback, useState } from 'react';

import axios from 'axios';

import api from '../services/api';
import type {
  GanttBlueprintResult,
  GanttSubjectPayload,
  ModuleSubject,
  SubjectConfig,
} from '../types/gantt.types';
import { alertDialog } from '../utils/dialog';

const DEFAULT_START = '08:00';
const DEFAULT_END = '10:00';

export function useGanttBlueprint(classGroupId: string) {
  const [moduleNumber, setModuleNumber] = useState<number | ''>('');
  const [startTimeStr, setStartTimeStr] = useState(DEFAULT_START);
  const [endTimeStr, setEndTimeStr] = useState(DEFAULT_END);
  const [subjectConfigs, setSubjectConfigs] = useState<SubjectConfig[]>([]);
  const [blueprint, setBlueprint] = useState<GanttBlueprintResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const initSubjectConfigs = useCallback((subjects: ModuleSubject[]) => {
    setSubjectConfigs(
      subjects.map((row) => ({
        curriculumSubjectId: row.id,
        subjectId: row.subjectId,
        subjectCode: row.subject.code,
        subjectName: row.subject.name,
        hours: row.subject.hours,
        daysOfWeek: [],
        startDate: '',
        dependsOnId: row.dependsOnId ?? '',
        isPriority: false,
        professorId: '',
        roomId: '',
      })),
    );
    setBlueprint(null);
  }, []);

  const updateSubjectConfig = useCallback(
    (curriculumSubjectId: string, patch: Partial<SubjectConfig>) => {
      setSubjectConfigs((prev) =>
        prev.map((cfg) =>
          cfg.curriculumSubjectId === curriculumSubjectId
            ? { ...cfg, ...patch }
            : cfg,
        ),
      );
      setBlueprint(null);
    },
    [],
  );

  const toggleDay = useCallback((curriculumSubjectId: string, day: number) => {
    setSubjectConfigs((prev) =>
      prev.map((cfg) => {
        if (cfg.curriculumSubjectId !== curriculumSubjectId) return cfg;
        const has = cfg.daysOfWeek.includes(day);
        return {
          ...cfg,
          daysOfWeek: has
            ? cfg.daysOfWeek.filter((d) => d !== day)
            : [...cfg.daysOfWeek, day].sort((a, b) => a - b),
        };
      }),
    );
    setBlueprint(null);
  }, []);

  const toPayload = (): GanttSubjectPayload[] =>
    subjectConfigs.map((cfg) => ({
      curriculumSubjectId: cfg.curriculumSubjectId,
      subjectId: cfg.subjectId,
      daysOfWeek: cfg.daysOfWeek,
      ...(cfg.dependsOnId || !cfg.startDate
        ? {}
        : { startDate: cfg.startDate }),
      dependsOnId: cfg.dependsOnId || null,
      ...(cfg.isPriority ? { isPriority: true } : {}),
      professorId: cfg.professorId || undefined,
      roomId: cfg.roomId || undefined,
    }));

  const validateBeforeGenerate = (): string | null => {
    if (!moduleNumber) return 'Selecione o módulo.';
    if (!startTimeStr || !endTimeStr) return 'Informe os horários globais.';
    const missingDays = subjectConfigs.filter((c) => c.daysOfWeek.length === 0);
    if (missingDays.length) {
      return `Configure os dias da semana para: ${missingDays.map((c) => c.subjectCode).join(', ')}`;
    }
    const missingStart = subjectConfigs.filter(
      (c) => !c.dependsOnId && !c.startDate,
    );
    if (missingStart.length) {
      return `Informe a data de início para: ${missingStart.map((c) => c.subjectCode).join(', ')}`;
    }
    const missingProf = subjectConfigs.filter((c) => !c.professorId);
    if (missingProf.length) {
      return `Selecione o professor para: ${missingProf.map((c) => c.subjectCode).join(', ')}`;
    }
    const missingRoom = subjectConfigs.filter((c) => !c.roomId);
    if (missingRoom.length) {
      return `Selecione a sala para: ${missingRoom.map((c) => c.subjectCode).join(', ')}`;
    }
    return null;
  };

  const generateBlueprint = async () => {
    const error = validateBeforeGenerate();
    if (error) {
      alertDialog(error);
      return;
    }

    setIsGenerating(true);
    try {
      const response = await api.post('/schedules/gantt/blueprint', {
        classGroupId,
        moduleNumber: Number(moduleNumber),
        startTimeStr,
        endTimeStr,
        subjects: toPayload(),
      });
      setBlueprint(response.data?.data || response.data);
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || 'Erro ao gerar rascunho.';
        alertDialog(Array.isArray(msg) ? msg[0] : msg);
      } else {
        alertDialog('Erro inesperado ao gerar rascunho.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const recalculate = async (movedTaskId: string, newStartDate: Date) => {
    if (!moduleNumber) return;

    setIsRecalculating(true);
    try {
      const response = await api.post('/schedules/gantt/recalculate', {
        classGroupId,
        moduleNumber: Number(moduleNumber),
        startTimeStr,
        endTimeStr,
        movedTaskId,
        newStartDate: newStartDate.toISOString(),
        subjects: toPayload(),
      });
      setBlueprint(response.data?.data || response.data);
      setSubjectConfigs((prev) =>
        prev.map((cfg) =>
          cfg.curriculumSubjectId === movedTaskId
            ? {
                ...cfg,
                startDate: newStartDate.toISOString().substring(0, 10),
              }
            : cfg,
        ),
      );
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || 'Erro ao recalcular.';
        alertDialog(Array.isArray(msg) ? msg[0] : msg);
      }
    } finally {
      setIsRecalculating(false);
    }
  };

  const publish = async (): Promise<boolean> => {
    if (!blueprint || !blueprint.canPublish) {
      alertDialog('Corrija os conflitos antes de publicar.');
      return false;
    }

    setIsPublishing(true);
    try {
      await api.post('/schedules/gantt/publish', {
        classGroupId,
        moduleNumber: blueprint.moduleNumber,
        startTimeStr: blueprint.startTimeStr,
        endTimeStr: blueprint.endTimeStr,
        tasks: blueprint.tasks.map((task) => ({
          curriculumSubjectId: task.curriculumSubjectId,
          subjectId: task.subjectId,
          dependsOnId: task.dependsOnId ?? undefined,
          daysOfWeek: task.daysOfWeek,
          professorId: task.professorId,
          roomId: task.roomId,
          subjectCode: task.subjectCode,
          subjectName: task.subjectName,
          hours: task.hours,
          sessions: task.sessions,
        })),
      });
      alertDialog('Cronograma publicado com sucesso!');
      return true;
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || 'Erro ao publicar.';
        alertDialog(Array.isArray(msg) ? msg[0] : msg);
      } else {
        alertDialog('Erro inesperado ao publicar.');
      }
      return false;
    } finally {
      setIsPublishing(false);
    }
  };

  return {
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
    blueprint,
    isGenerating,
    isRecalculating,
    isPublishing,
    generateBlueprint,
    recalculate,
    publish,
  };
}

import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Plus,
  Trash2,
  Users,
} from 'lucide-react';
import type {
  ArrayPath,
  Control,
  FieldErrors,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import api from '../../services/api';
import { alertDialog } from '../../utils/dialog';
import { DateSelect } from '../DateSelect';
import { Select } from '../Select';
import { TimeSelect } from '../TimeSelect';
import {
  type PlanModuleFormData,
  type PlanModuleFormInput,
  planModuleSchema,
} from './schema';

const DAYS_OF_WEEK = [
  { label: 'Dom', value: 0 },
  { label: 'Seg', value: 1 },
  { label: 'Ter', value: 2 },
  { label: 'Qua', value: 3 },
  { label: 'Qui', value: 4 },
  { label: 'Sex', value: 5 },
  { label: 'Sáb', value: 6 },
];

export interface Subject {
  id: string;
  name: string;
  hours: number;
  code?: string;
}
export interface Professor {
  id: string;
  name: string;
}
export interface Room {
  id: string;
  name: string;
}

interface ModuleSubjectResponse {
  subjectId: string;
  dependsOnId: string | null;
  subject: Subject;
}

interface ModulePlanningFormProps {
  classGroupId: string;
  onSuccess?: (startDate?: string) => void;
}

const defaultTrack = {
  startTimeStr: '',
  endTimeStr: '',
  isPriority: false,
  startDate: '',
  daysOfWeek: [] as number[],
  sequence: [{ subjectId: '', professorId: '', roomId: '' }],
};

export const ModulePlanningForm: React.FC<ModulePlanningFormProps> = ({
  classGroupId,
  onSuccess,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    setValue,
  } = useForm<PlanModuleFormInput, unknown, PlanModuleFormData>({
    resolver: zodResolver(planModuleSchema),
    defaultValues: {
      classGroupId,
      moduleNumber: '' as unknown as string,
      startDate: '',
      tracks: [defaultTrack],
    },
  });

  const [professors, setProfessors] = useState<Professor[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [availableModules, setAvailableModules] = useState<number[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [isLoadingModules, setIsLoadingModules] = useState(false);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedModuleNumber = useWatch({ control, name: 'moduleNumber' });
  const displaySubjects = selectedModuleNumber ? subjects : [];

  useEffect(() => {
    setValue('classGroupId', classGroupId);
  }, [classGroupId, setValue]);

  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoadingOptions(true);
      try {
        const [profRes, roomRes] = await Promise.all([
          api.get('/professors').catch(() => ({ data: [] })),
          api.get('/rooms').catch(() => ({ data: [] })),
        ]);
        setProfessors(profRes.data?.data || profRes.data || []);
        setRooms(roomRes.data?.data || roomRes.data || []);
      } catch (error) {
        console.error('Erro ao buscar opções base para o planejamento:', error);
      } finally {
        setIsLoadingOptions(false);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchModules = async () => {
      setIsLoadingModules(true);
      try {
        const response = await api.get(`/class-groups/${classGroupId}/modules`);
        if (isMounted) setAvailableModules(response.data?.data || []);
      } catch (error) {
        console.error('Erro ao buscar módulos da turma:', error);
        if (isMounted) setAvailableModules([]);
      } finally {
        if (isMounted) setIsLoadingModules(false);
      }
    };

    resetField('moduleNumber');
    fetchModules();

    return () => {
      isMounted = false;
    };
  }, [classGroupId, resetField]);

  useEffect(() => {
    let isMounted = true;

    if (!selectedModuleNumber) {
      return () => {
        isMounted = false;
      };
    }

    const fetchSubjects = async () => {
      setIsLoadingSubjects(true);
      try {
        const response = await api.get(
          `/class-groups/${classGroupId}/modules/${selectedModuleNumber}/subjects`,
        );
        const data: ModuleSubjectResponse[] = response.data?.data || [];
        const orderedSubjects = data.map((item) => item.subject);

        if (isMounted) {
          setSubjects(orderedSubjects);

          const autoSequence = orderedSubjects.map((subject) => ({
            subjectId: subject.id,
            professorId: '',
            roomId: '',
          }));

          setValue('tracks', [
            {
              ...defaultTrack,
              sequence:
                autoSequence.length > 0
                  ? autoSequence
                  : [{ subjectId: '', professorId: '', roomId: '' }],
            },
          ]);
        }
      } catch (error) {
        console.error('Erro ao buscar disciplinas do módulo:', error);
        if (isMounted) setSubjects([]);
      } finally {
        if (isMounted) setIsLoadingSubjects(false);
      }
    };

    fetchSubjects();

    return () => {
      isMounted = false;
    };
  }, [selectedModuleNumber, classGroupId, setValue]);

  const {
    fields: trackFields,
    append: appendTrack,
    remove: removeTrack,
  } = useFieldArray({
    control,
    name: 'tracks',
  });

  const onSubmit = async (data: PlanModuleFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        tracks: data.tracks.map((track) => ({
          ...track,
          sequence: track.sequence.map((seq) => ({
            ...seq,
            roomId: seq.roomId ? seq.roomId : undefined,
          })),
        })),
      };

      await api.post('/schedules/plan-module', payload);
      alertDialog('Módulo planejado com sucesso!');
      reset({
        classGroupId,
        moduleNumber: '' as unknown as string,
        startDate: '',
        tracks: [defaultTrack],
      });
      onSuccess?.(data.startDate);
    } catch (error) {
      console.error('Erro ao planejar módulo:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          'Ocorreu um erro ao planejar o módulo.';
        alertDialog(
          Array.isArray(errorMessage) ? errorMessage[0] : errorMessage,
        );
      } else {
        alertDialog('Ocorreu um erro inesperado ao planejar o módulo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="module-planning-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <input type="hidden" {...register('classGroupId')} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Módulo
          </label>
          <Select
            {...register('moduleNumber')}
            disabled={isLoadingOptions || isLoadingModules}
            className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-senac-blue outline-none transition-all text-slate-800 font-medium disabled:opacity-50 cursor-pointer"
          >
            <option value="">
              {isLoadingModules ? 'Carregando...' : 'Selecione o módulo...'}
            </option>
            {availableModules.map((m) => (
              <option key={m} value={m}>
                Módulo {m}
              </option>
            ))}
          </Select>
          {errors.moduleNumber && (
            <span className="text-rose-500 text-xs font-bold mt-1 block">
              {errors.moduleNumber.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Data de Início do Módulo
          </label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-senac-blue transition-colors z-10">
                  <Calendar size={18} strokeWidth={2.5} />
                </div>
                <DateSelect
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="DD/MM/AAAA"
                />
              </div>
            )}
          />
          {errors.startDate && (
            <span className="text-rose-500 text-xs font-bold mt-1 block">
              {errors.startDate.message}
            </span>
          )}
        </div>
      </div>

      <hr className="border-slate-100" />

      {selectedModuleNumber && isLoadingSubjects ? (
        <div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-slate-500 font-medium">
            Carregando disciplinas e precedências...
          </p>
        </div>
      ) : selectedModuleNumber && displaySubjects.length > 0 ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Trilhas de Execução (Tracks)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                A sequência da trilha principal foi preenchida automaticamente
                conforme as precedências da matriz.
              </p>
            </div>
            <button
              type="button"
              onClick={() => appendTrack({ ...defaultTrack })}
              className="text-sm bg-senac-blue/10 text-senac-blue px-4 py-2 rounded-xl font-bold hover:bg-senac-blue/20 transition-colors flex items-center gap-2"
            >
              <Plus size={18} /> Adicionar Trilha Simultânea
            </button>
          </div>

          {errors.tracks?.message && (
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold mb-4">
              {errors.tracks.message}
            </div>
          )}

          <div className="space-y-6">
            {trackFields.map((field, index) => (
              <TrackCard
                key={field.id}
                trackIndex={index}
                control={control}
                register={register}
                errors={errors}
                removeTrack={() => removeTrack(index)}
                subjects={displaySubjects}
                professors={professors}
                rooms={rooms}
                isOnlyTrack={trackFields.length === 1}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-slate-500 font-medium">
            {selectedModuleNumber
              ? 'Nenhuma disciplina encontrada para este módulo.'
              : 'Selecione um módulo para configurar as trilhas.'}
          </p>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-senac-blue hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-senac-blue/30 flex items-center gap-2"
        >
          {isSubmitting ? 'Simulando...' : 'Simular Calendário'}{' '}
          {!isSubmitting && <ArrowRight size={20} />}
        </button>
      </div>
    </form>
  );
};

interface TrackCardProps {
  trackIndex: number;
  control: Control<PlanModuleFormInput>;
  register: UseFormRegister<PlanModuleFormInput>;
  errors: FieldErrors<PlanModuleFormInput>;
  removeTrack: () => void;
  subjects: Subject[];
  professors: Professor[];
  rooms: Room[];
  isOnlyTrack: boolean;
}

const TrackCard = ({
  trackIndex,
  control,
  register,
  errors,
  removeTrack,
  subjects,
  professors,
  rooms,
  isOnlyTrack,
}: TrackCardProps) => {
  const {
    fields: sequenceFields,
    append: appendSequence,
    remove: removeSequence,
  } = useFieldArray({
    control,
    name: `tracks.${trackIndex}.sequence` as ArrayPath<PlanModuleFormInput>,
  });

  const trackError = errors.tracks?.[trackIndex];

  return (
    <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 relative group hover:border-senac-blue/30 transition-colors shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-md font-bold text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              {String.fromCharCode(65 + trackIndex)}
            </div>
            Trilha {String.fromCharCode(65 + trackIndex)}
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            As disciplinas desta trilha ocorrerão nestes dias:
          </p>
        </div>

        {!isOnlyTrack && (
          <button
            type="button"
            onClick={removeTrack}
            className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
            title="Remover Trilha"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Dias da Semana
          </label>
          <Controller
            name={
              `tracks.${trackIndex}.daysOfWeek` as Path<PlanModuleFormInput>
            }
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map((day) => {
                  const currentValues = (
                    Array.isArray(field.value) ? field.value : []
                  ) as number[];
                  const isSelected = currentValues.includes(day.value);
                  return (
                    <button
                      type="button"
                      key={day.value}
                      onClick={() => {
                        const newValue = isSelected
                          ? currentValues.filter((v) => v !== day.value)
                          : [...currentValues, day.value];
                        field.onChange(newValue);
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                        isSelected
                          ? 'bg-senac-blue border-senac-blue text-white shadow-md'
                          : 'bg-white border-slate-200 text-slate-500 hover:border-senac-blue/50'
                      }`}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
            )}
          />
          {trackError?.daysOfWeek && (
            <span className="text-rose-500 text-xs font-bold mt-2 block">
              {trackError.daysOfWeek.message}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Início
            </label>
            <Controller
              name={
                `tracks.${trackIndex}.startTimeStr` as Path<PlanModuleFormInput>
              }
              control={control}
              render={({ field }) => (
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-senac-blue transition-colors z-10">
                    <Clock size={18} strokeWidth={2.5} />
                  </div>
                  <TimeSelect
                    value={field.value as string}
                    onChange={field.onChange}
                    placeholder="--:--"
                    minHour={8}
                    maxHour={22}
                  />
                </div>
              )}
            />
            {trackError?.startTimeStr && (
              <span className="text-rose-500 text-[10px] font-bold mt-1 block">
                {trackError.startTimeStr.message}
              </span>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Término
            </label>
            <Controller
              name={
                `tracks.${trackIndex}.endTimeStr` as Path<PlanModuleFormInput>
              }
              control={control}
              render={({ field }) => (
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-senac-blue transition-colors z-10">
                    <Clock size={18} strokeWidth={2.5} />
                  </div>
                  <TimeSelect
                    value={field.value as string}
                    onChange={field.onChange}
                    placeholder="--:--"
                    minHour={8}
                    maxHour={22}
                  />
                </div>
              )}
            />
            {trackError?.endTimeStr && (
              <span className="text-rose-500 text-[10px] font-bold mt-1 block">
                {trackError.endTimeStr.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div className="flex flex-col justify-center">
          <label className="flex items-center gap-3 cursor-pointer group/priority">
            <input
              type="checkbox"
              {...register(
                `tracks.${trackIndex}.isPriority` as Path<PlanModuleFormInput>,
              )}
              className="w-5 h-5 text-senac-blue border-slate-300 rounded focus:ring-senac-blue transition-all cursor-pointer"
            />
            <div>
              <span className="block text-sm font-bold text-slate-700 group-hover/priority:text-senac-blue transition-colors">
                Prioridade Alta
              </span>
              <span className="block text-xs text-slate-500 mt-0.5">
                Esta trilha será alocada primeiro, sobrepondo outras.
              </span>
            </div>
          </label>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Data de Início Específica (Opcional)
          </label>
          <Controller
            name={`tracks.${trackIndex}.startDate` as Path<PlanModuleFormInput>}
            control={control}
            render={({ field }) => (
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-senac-blue transition-colors z-10">
                  <Calendar size={18} strokeWidth={2.5} />
                </div>
                <DateSelect
                  value={(field.value as string) || ''}
                  onChange={field.onChange}
                  placeholder="Acompanha a Turma Base"
                />
              </div>
            )}
          />
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-sm font-bold text-slate-700">
            Sequência de Disciplinas
          </h5>
          <button
            type="button"
            onClick={() =>
              appendSequence({ subjectId: '', professorId: '', roomId: '' })
            }
            className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg font-bold hover:bg-slate-100 transition-colors flex items-center gap-1"
          >
            <Plus size={14} /> Adicionar UC
          </button>
        </div>

        {trackError?.sequence?.message && (
          <span className="text-rose-500 text-xs font-bold mb-3 block">
            {trackError.sequence.message}
          </span>
        )}

        <div className="space-y-3">
          {sequenceFields.map((seqField, seqIndex) => (
            <div
              key={seqField.id}
              className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-white p-3 rounded-xl border border-slate-200"
            >
              <div className="w-6 h-6 shrink-0 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold">
                {seqIndex + 1}
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                <div className="relative">
                  <BookOpen
                    size={14}
                    className="absolute left-3 top-3 text-slate-400 z-10"
                  />
                  <Select
                    {...register(
                      `tracks.${trackIndex}.sequence.${seqIndex}.subjectId` as Path<PlanModuleFormInput>,
                    )}
                    className="w-full pl-9 pr-3 py-2 bg-[#f8f9fc] border-none rounded-lg focus:ring-2 focus:ring-senac-blue outline-none text-slate-800 text-sm font-medium cursor-pointer"
                  >
                    <option value="">Disciplina...</option>
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.code ? `${s.code}: ${s.name}` : s.name}
                      </option>
                    ))}
                  </Select>
                  {trackError?.sequence?.[seqIndex]?.subjectId && (
                    <span className="text-rose-500 text-[10px] font-bold mt-1 block">
                      {trackError.sequence[seqIndex].subjectId.message}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <Users
                    size={14}
                    className="absolute left-3 top-3 text-slate-400 z-10"
                  />
                  <Select
                    {...register(
                      `tracks.${trackIndex}.sequence.${seqIndex}.professorId` as Path<PlanModuleFormInput>,
                    )}
                    className="w-full pl-9 pr-3 py-2 bg-[#f8f9fc] border-none rounded-lg focus:ring-2 focus:ring-senac-blue outline-none text-slate-800 text-sm font-medium cursor-pointer"
                  >
                    <option value="">Professor...</option>
                    {professors.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </Select>
                  {trackError?.sequence?.[seqIndex]?.professorId && (
                    <span className="text-rose-500 text-[10px] font-bold mt-1 block">
                      {trackError.sequence[seqIndex].professorId.message}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <MapPin
                    size={14}
                    className="absolute left-3 top-3 text-slate-400 z-10"
                  />
                  <Select
                    {...register(
                      `tracks.${trackIndex}.sequence.${seqIndex}.roomId` as Path<PlanModuleFormInput>,
                    )}
                    className="w-full pl-9 pr-3 py-2 bg-[#f8f9fc] border-none rounded-lg focus:ring-2 focus:ring-senac-blue outline-none text-slate-800 text-sm font-medium cursor-pointer"
                  >
                    <option value="">Sala (Opcional)...</option>
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {sequenceFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSequence(seqIndex)}
                  className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

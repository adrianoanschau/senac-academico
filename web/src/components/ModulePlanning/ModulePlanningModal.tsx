import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import type { Control, UseFormRegister, FieldErrors, ArrayPath, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  X, Plus, Trash2, Calendar, BookOpen, Users,
  MapPin, Route, ArrowRight, Clock
} from 'lucide-react';
import { planModuleSchema, type PlanModuleFormData, type PlanModuleFormInput } from './schema';
import { alertDialog } from '../../utils/dialog';
import { Select } from '../Select';
import { DateSelect } from '../DateSelect';
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

export interface Subject { id: string; name: string; hours: number; code?: string; }
export interface Professor { id: string; name: string }
export interface Room { id: string; name: string }
export interface ClassGroup { id: string; code?: string; name?: string }

interface ModulePlanningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (startDate?: string) => void;
}

export const ModulePlanningModal: React.FC<ModulePlanningModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm<PlanModuleFormInput, unknown, PlanModuleFormData>({
    resolver: zodResolver(planModuleSchema),
    defaultValues: {
      classGroupId: '',
      moduleNumber: '' as unknown as string,
      startDate: '',
      tracks: [
        {
          startTimeStr: '',
          endTimeStr: '',
          isPriority: false,
          startDate: '',
          daysOfWeek: [],
          sequence: [{ subjectId: '', professorId: '', roomId: '' }],
        },
      ],
    },
  });

  const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [availableModules, setAvailableModules] = useState<number[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [isLoadingModules, setIsLoadingModules] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedClassGroupId = useWatch({ control, name: 'classGroupId' });
  const selectedModuleNumber = useWatch({ control, name: 'moduleNumber' });

  useEffect(() => {
    if (!isOpen) return;
    
    const fetchOptions = async () => {
      setIsLoadingOptions(true);
      try {
        const [cgRes, profRes, roomRes] = await Promise.all([
          axios.get('/api/class-groups').catch(() => ({ data: [] })),
          axios.get('/api/professors').catch(() => ({ data: [] })),
          axios.get('/api/rooms').catch(() => ({ data: [] })),
        ]);
        setClassGroups(cgRes.data?.data || cgRes.data || []);
        setProfessors(profRes.data?.data || profRes.data || []);
        setRooms(roomRes.data?.data || roomRes.data || []);
      } catch (error) {
        console.error('Erro ao buscar opções base para o planejamento:', error);
      } finally {
        setIsLoadingOptions(false);
      }
    };
    fetchOptions();
  }, [isOpen]);

  useEffect(() => {
    let isMounted = true;

    if (!isOpen || !selectedClassGroupId) {
      setTimeout(() => {
        if (isMounted) setAvailableModules([]);
      }, 0);
      resetField('moduleNumber');
      return () => {
        isMounted = false;
      };
    }

    const fetchModules = async () => {
      setTimeout(() => {
        if (isMounted) setIsLoadingModules(true);
      }, 0);
      try {
        const response = await axios.get(`/api/class-groups/${selectedClassGroupId}/modules`);
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
  }, [isOpen, selectedClassGroupId, resetField]);

  useEffect(() => {
    let isMounted = true;

    if (!isOpen || !selectedModuleNumber) {
      setTimeout(() => {
        if (isMounted) setSubjects([]);
      }, 0);
      return () => {
        isMounted = false;
      };
    }

    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/api/subjects', {
          params: { 
            moduleNumber: selectedModuleNumber,
            ...(selectedClassGroupId ? { classGroupId: selectedClassGroupId } : {})
          }
        });
        if (isMounted) {
          setSubjects(response.data?.data || response.data || []);
        }
      } catch (error) {
        console.error('Erro ao buscar disciplinas do módulo:', error);
        if (isMounted) {
          setSubjects([]);
        }
      }
    };

    fetchSubjects();

    return () => {
      isMounted = false;
    };
  }, [isOpen, selectedModuleNumber, selectedClassGroupId]);

  // Gerencia o array principal: Trilhas (Tracks)
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
      // Limpa os campos de texto vazios de salas opcionais para não quebrar a tipagem UUID do backend
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

      await axios.post('/api/schedules/plan-module', payload);
      alertDialog('Módulo planejado com sucesso!');
      reset();
      if (onSuccess) onSuccess(data.startDate);
      onClose();
    } catch (error) {
      console.error('Erro ao planejar módulo:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Ocorreu um erro ao planejar o módulo.';
        alertDialog(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
      } else {
        alertDialog('Ocorreu um erro inesperado ao planejar o módulo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reseta o form ao fechar para não manter lixo na próxima vez
  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 sm:p-6">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-full overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header Fixo */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-senac-blue/10 text-senac-blue rounded-2xl">
              <Route size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Planejamento de Módulo (Lote)</h2>
              <p className="text-slate-500 text-sm mt-1">
                Configure trilhas simultâneas e suas sequências de disciplinas.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Corpo Rolável */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <form id="module-planning-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Sessão: Informações Base */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Turma Base</label>
                <Select
                  {...register('classGroupId')}
                  disabled={isLoadingOptions}
                  className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-senac-blue outline-none transition-all text-slate-800 font-medium disabled:opacity-50 cursor-pointer"
                >
                  <option value="">
                    {isLoadingOptions ? 'Carregando turmas...' : 'Selecione a turma...'}
                  </option>
                  {classGroups.map((cg) => (
                    <option key={cg.id} value={cg.id}>{cg.code || cg.name}</option>
                  ))}
                </Select>
                {errors.classGroupId && <span className="text-rose-500 text-xs font-bold mt-1 block">{errors.classGroupId.message}</span>}
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Módulo</label>
                <Select
                  {...register('moduleNumber')}
                  disabled={isLoadingOptions || !selectedClassGroupId || isLoadingModules}
                  className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-senac-blue outline-none transition-all text-slate-800 font-medium disabled:opacity-50 cursor-pointer"
                >
                  <option value="">
                    {isLoadingModules ? 'Carregando...' : 'Selecione o módulo...'}
                  </option>
                  {availableModules.map((m) => (
                    <option key={m} value={m}>Módulo {m}</option>
                  ))}
                </Select>
                {errors.moduleNumber && <span className="text-rose-500 text-xs font-bold mt-1 block">{errors.moduleNumber.message}</span>}
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Data de Início do Módulo</label>
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
                {errors.startDate && <span className="text-rose-500 text-xs font-bold mt-1 block">{errors.startDate.message}</span>}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Sessão: Trilhas (Tracks) */}
            {selectedModuleNumber && subjects.length > 0 ? (
              <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800">Trilhas de Execução (Tracks)</h3>
                <button
                  type="button"
                  onClick={() => appendTrack({ startTimeStr: '', endTimeStr: '', isPriority: false, startDate: '', daysOfWeek: [], sequence: [{ subjectId: '', professorId: '', roomId: '' }] })}
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
                    subjects={subjects}
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
                  {selectedClassGroupId && !selectedModuleNumber ? 'Selecione um módulo para carregar as disciplinas.' : 'Selecione uma turma e um módulo para configurar as trilhas.'}
                </p>
              </div>
            )}

          </form>
        </div>

        {/* Footer Fixo */}
        <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="module-planning-form"
            disabled={isSubmitting}
            className="bg-senac-blue hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-senac-blue/30 flex items-center gap-2"
          >
            {isSubmitting ? 'Simulando...' : 'Simular Calendário'} {!isSubmitting && <ArrowRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// Sub-componente: Cartão de Trilha (Contém seu próprio FieldArray)
// =========================================================================
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
  trackIndex, control, register, errors, removeTrack, 
  subjects, professors, rooms, isOnlyTrack 
}: TrackCardProps) => {
  // Gerencia o array secundário (aninhado): Sequência de Disciplinas
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
      
      {/* Cabeçalho da Trilha */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-md font-bold text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              {String.fromCharCode(65 + trackIndex)}
            </div>
            Trilha {String.fromCharCode(65 + trackIndex)}
          </h4>
          <p className="text-xs text-slate-500 mt-1">As disciplinas desta trilha ocorrerão nestes dias:</p>
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

      {/* Configurações de Tempo e Dias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Dias da Semana */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Dias da Semana</label>
          <Controller
            name={`tracks.${trackIndex}.daysOfWeek` as Path<PlanModuleFormInput>}
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map((day) => {
                  const currentValues = (Array.isArray(field.value) ? field.value : []) as number[];
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
          {trackError?.daysOfWeek && <span className="text-rose-500 text-xs font-bold mt-2 block">{trackError.daysOfWeek.message}</span>}
        </div>

        {/* Horários */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Início</label>
            <Controller
              name={`tracks.${trackIndex}.startTimeStr` as Path<PlanModuleFormInput>}
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
            {trackError?.startTimeStr && <span className="text-rose-500 text-[10px] font-bold mt-1 block">{trackError.startTimeStr.message}</span>}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Término</label>
            <Controller
              name={`tracks.${trackIndex}.endTimeStr` as Path<PlanModuleFormInput>}
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
            {trackError?.endTimeStr && <span className="text-rose-500 text-[10px] font-bold mt-1 block">{trackError.endTimeStr.message}</span>}
          </div>
        </div>
      </div>
      
      {/* Novas Configurações: Prioridade e Data Específica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div className="flex flex-col justify-center">
          <label className="flex items-center gap-3 cursor-pointer group/priority">
            <input
              type="checkbox"
              {...register(`tracks.${trackIndex}.isPriority` as Path<PlanModuleFormInput>)}
              className="w-5 h-5 text-senac-blue border-slate-300 rounded focus:ring-senac-blue transition-all cursor-pointer"
            />
            <div>
              <span className="block text-sm font-bold text-slate-700 group-hover/priority:text-senac-blue transition-colors">Prioridade Alta</span>
              <span className="block text-xs text-slate-500 mt-0.5">Esta trilha será alocada primeiro, sobrepondo outras.</span>
            </div>
          </label>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Data de Início Específica (Opcional)</label>
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

      {/* Sequência de Disciplinas */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-sm font-bold text-slate-700">Sequência de Disciplinas</h5>
          <button
            type="button"
            onClick={() => appendSequence({ subjectId: '', professorId: '', roomId: '' })}
            className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg font-bold hover:bg-slate-100 transition-colors flex items-center gap-1"
          >
            <Plus size={14} /> Adicionar UC
          </button>
        </div>

        {trackError?.sequence?.message && (
          <span className="text-rose-500 text-xs font-bold mb-3 block">{trackError.sequence.message}</span>
        )}

        <div className="space-y-3">
          {sequenceFields.map((seqField, seqIndex) => (
            <div key={seqField.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-white p-3 rounded-xl border border-slate-200">
              <div className="w-6 h-6 shrink-0 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold">
                {seqIndex + 1}
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                {/* Disciplina */}
                <div className="relative">
                  <BookOpen size={14} className="absolute left-3 top-3 text-slate-400 z-10" />
                  <Select
                    {...register(`tracks.${trackIndex}.sequence.${seqIndex}.subjectId` as Path<PlanModuleFormInput>)}
                    className="w-full pl-9 pr-3 py-2 bg-[#f8f9fc] border-none rounded-lg focus:ring-2 focus:ring-senac-blue outline-none text-slate-800 text-sm font-medium cursor-pointer"
                  >
                    <option value="">Disciplina...</option>
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>{s.code ? `${s.code}: ${s.name}` : s.name}</option>
                    ))}
                  </Select>
                  {trackError?.sequence?.[seqIndex]?.subjectId && <span className="text-rose-500 text-[10px] font-bold mt-1 block">{trackError.sequence[seqIndex].subjectId.message}</span>}
                </div>

                {/* Professor */}
                <div className="relative">
                  <Users size={14} className="absolute left-3 top-3 text-slate-400 z-10" />
                  <Select
                    {...register(`tracks.${trackIndex}.sequence.${seqIndex}.professorId` as Path<PlanModuleFormInput>)}
                    className="w-full pl-9 pr-3 py-2 bg-[#f8f9fc] border-none rounded-lg focus:ring-2 focus:ring-senac-blue outline-none text-slate-800 text-sm font-medium cursor-pointer"
                  >
                    <option value="">Professor...</option>
                  {professors.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </Select>
                  {trackError?.sequence?.[seqIndex]?.professorId && <span className="text-rose-500 text-[10px] font-bold mt-1 block">{trackError.sequence[seqIndex].professorId.message}</span>}
                </div>

                {/* Sala */}
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-3 text-slate-400 z-10" />
                  <Select
                    {...register(`tracks.${trackIndex}.sequence.${seqIndex}.roomId` as Path<PlanModuleFormInput>)}
                    className="w-full pl-9 pr-3 py-2 bg-[#f8f9fc] border-none rounded-lg focus:ring-2 focus:ring-senac-blue outline-none text-slate-800 text-sm font-medium cursor-pointer"
                  >
                    <option value="">Sala (Opcional)...</option>
                  {rooms.map((r) => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Botão Remover UC */}
              {sequenceFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSequence(seqIndex)}
                  className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
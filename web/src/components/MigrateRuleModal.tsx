import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { X, AlertTriangle, Loader2 } from 'lucide-react';
import axios from 'axios';
import { alertDialog } from '../utils/dialog';
import api from '../services/api';

interface Professor { id: string; name: string; }
interface Room { id: string; name: string; }

interface MigrateRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  ruleId: string;
  initialDate: string;
  onSuccess: () => void;
}

interface FormData {
  transitionDate: string;
  newDaysOfWeek: string[];
  newProfessorId: string;
  newRoomId: string;
}

export const MigrateRuleModal: React.FC<MigrateRuleModalProps> = ({ isOpen, onClose, ruleId, initialDate, onSuccess }) => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    defaultValues: {
      transitionDate: initialDate,
      newDaysOfWeek: [],
      newProfessorId: '',
      newRoomId: '',
    }
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        transitionDate: initialDate,
        newDaysOfWeek: [],
        newProfessorId: '',
        newRoomId: '',
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setApiError(null);
      
      const fetchDependencies = async () => {
        setIsLoadingData(true);
        try {
          const [professorsRes, roomsRes] = await Promise.all([
            api.get('/professors'),
            api.get('/rooms'),
          ]);
          setProfessors(professorsRes.data?.data || professorsRes.data || []);
          setRooms(roomsRes.data?.data || roomsRes.data || []);
        } catch (error) {
          console.error('Erro ao carregar dependências:', error);
          setApiError('Falha ao carregar listas de salas e professores.');
        } finally {
          setIsLoadingData(false);
        }
      };
      
      fetchDependencies();
    }
  }, [isOpen, initialDate, reset]);

  const onSubmit = async (data: FormData) => {
    setApiError(null);
    try {
      // Para evitar problemas de fuso-horário mudando o dia anterior, usamos a string do dia + T12:00:00
      const transitionDateIso = new Date(`${data.transitionDate}T12:00:00`).toISOString();
      
      const payload = {
        transitionDate: transitionDateIso,
        newDaysOfWeek: data.newDaysOfWeek.map(Number),
        newProfessorId: data.newProfessorId || undefined,
        newRoomId: data.newRoomId || undefined,
      };

      await api.post(`/schedules/rules/${ruleId}/migrate-pattern`, payload);
      alertDialog('Padrão de aulas alterado com sucesso!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao alterar padrão de aulas:', error);
      if (axios.isAxiosError(error) && error.response) {
        setApiError(error.response.data.message || 'Ocorreu um erro ao conectar com a API.');
      } else {
        setApiError('Ocorreu um erro inesperado ao alterar o padrão de aulas.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
        
        <div className="p-6 shrink-0 flex justify-between items-center border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Alterar Padrão de Aulas</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6 flex flex-col gap-5">
            
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 text-amber-800 text-sm mb-2 flex items-start gap-3 rounded-r-lg">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
              <p className="leading-relaxed">
                As aulas já realizadas ou agendadas antes da data de transição serão mantidas no histórico. O saldo de horas será recalculado e projetado no novo padrão.
              </p>
            </div>

            {apiError && (
              <div className="bg-rose-50 text-rose-700 p-4 rounded-xl text-sm font-medium">
                {apiError}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">A partir de quando?</label>
              <input
                type="date"
                readOnly
                {...register('transitionDate')}
                className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl text-slate-600 font-medium outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Novos Dias da Semana</label>
              <Controller
                control={control}
                name="newDaysOfWeek"
                rules={{ required: "Selecione pelo menos um dia da semana." }}
                render={({ field: { onChange, value } }) => (
                  <div className="flex flex-wrap sm:flex-nowrap bg-[#f8f9fc] rounded-xl p-1.5 gap-1 border border-slate-100">
                    {[
                      { label: 'Dom', value: '0' },
                      { label: 'Seg', value: '1' },
                      { label: 'Ter', value: '2' },
                      { label: 'Qua', value: '3' },
                      { label: 'Qui', value: '4' },
                      { label: 'Sex', value: '5' },
                      { label: 'Sáb', value: '6' },
                    ].map((day) => {
                      const isSelected = value?.includes(day.value);
                      return (
                        <button
                          key={day.value}
                          type="button"
                          onClick={() => {
                            const newValue = isSelected
                              ? value.filter((v: string) => v !== day.value)
                              : [...(value || []), day.value];
                            onChange(newValue);
                          }}
                          className={`flex-1 px-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'
                          }`}
                        >
                          {day.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              {errors.newDaysOfWeek && <span className="text-xs text-rose-500 font-bold mt-2 block">{errors.newDaysOfWeek.message}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Novo Professor <span className="text-slate-400 font-normal">(Opcional)</span></label>
                <select
                  {...register('newProfessorId')}
                  className="w-full px-4 py-3 bg-[#f8f9fc] border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all text-slate-800 cursor-pointer disabled:opacity-50"
                  disabled={isLoadingData}
                >
                  <option value="">Manter atual</option>
                  {professors.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nova Sala <span className="text-slate-400 font-normal">(Opcional)</span></label>
                <select
                  {...register('newRoomId')}
                  className="w-full px-4 py-3 bg-[#f8f9fc] border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all text-slate-800 cursor-pointer disabled:opacity-50"
                  disabled={isLoadingData}
                >
                  <option value="">Manter atual</option>
                  {rooms.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 shrink-0 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={isSubmitting} 
              className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || isLoadingData} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-lg shadow-blue-600/30 disabled:opacity-70 flex items-center gap-2"
            >
              {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Processando...</> : 'Confirmar Alteração'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
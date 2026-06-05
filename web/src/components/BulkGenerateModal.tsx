import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, AlertCircle, Loader2, CalendarClock } from 'lucide-react';
import axios from 'axios';

interface ClassGroup { id: string; name?: string; code?: string; }
interface Subject { id: string; name: string; }
interface Professor { id: string; name: string; }
interface Room { id: string; name: string; }

interface BulkGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  classGroupId: string;
  subjectId: string;
  professorId: string;
  roomId: string;
  startDate: string;
  startTimeStr: string;
  endTimeStr: string;
  daysOfWeek: string[]; // RHF lida melhor com arrays de strings via inputs
}

export const BulkGenerateModal: React.FC<BulkGenerateModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    defaultValues: { daysOfWeek: [] }
  });

  useEffect(() => {
    if (isOpen) {
      const fetchFormData = async () => {
        setIsLoadingData(true);
        try {
          const [classGroupsRes, subjectsRes, professorsRes, roomsRes] = await Promise.all([
            axios.get('/api/class-groups'),
            axios.get('/api/subjects'),
            axios.get('/api/professors'),
            axios.get('/api/rooms'),
          ]);
          setClassGroups(classGroupsRes.data.data || classGroupsRes.data);
          setSubjects(subjectsRes.data.data || subjectsRes.data);
          setProfessors(professorsRes.data.data || professorsRes.data);
          setRooms(roomsRes.data.data || roomsRes.data);
        } catch (error) {
          console.error('Erro ao carregar listas do formulário:', error);
          setApiError('Falha ao carregar dependências. Tente abrir o modal novamente.');
        } finally {
          setIsLoadingData(false);
        }
      };
      fetchFormData();
    } else {
      reset();
      setApiError(null);
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    setApiError(null);
    
    // Converte os dias selecionados (strings) para números
    const payload = {
      ...data,
      daysOfWeek: data.daysOfWeek.map(Number),
      startDate: new Date(data.startDate).toISOString(),
    };

    try {
      await axios.post('/api/schedules/generate', payload);
      alert('Grade gerada com sucesso!');
      onSuccess();
    } catch (error) {
      console.error('Erro na geração da grade:', error);
      if (axios.isAxiosError(error) && error.response) {
        // Captura o erro 409 Conflict ou outros da API
        setApiError(error.response.data.message || 'Ocorreu um erro ao conectar com a API.');
      } else {
        setApiError('Ocorreu um erro inesperado ao gerar a grade.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-h-[95vh] overflow-y-auto">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-[#004a8d] rounded-xl">
              <CalendarClock size={24} />
            </div>
            Geração em Massa
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          
          {apiError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Atenção ao Gerar Grade</h4>
                <p className="text-sm mt-1">{apiError}</p>
              </div>
            </div>
          )}

          {isLoadingData ? (
            <div className="py-10 flex flex-col items-center justify-center text-[#004a8d]">
              <Loader2 size={32} className="animate-spin mb-4" />
              <p className="text-sm font-bold text-slate-500">Carregando formulário...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Turma</label>
                  <select {...register('classGroupId', { required: true })} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 cursor-pointer">
                    <option value="">Selecione a turma...</option>
                    {classGroups.map(cg => <option key={cg.id} value={cg.id}>{cg.code || cg.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Disciplina</label>
                  <select {...register('subjectId', { required: true })} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 cursor-pointer">
                    <option value="">Selecione a disciplina...</option>
                    {subjects.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Professor</label>
                  <select {...register('professorId', { required: true })} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 cursor-pointer">
                    <option value="">Selecione o professor...</option>
                    {professors.map(prof => <option key={prof.id} value={prof.id}>{prof.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Sala/Ambiente</label>
                  <select {...register('roomId', { required: true })} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 cursor-pointer">
                    <option value="">Selecione a sala...</option>
                    {rooms.map(room => <option key={room.id} value={room.id}>{room.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Data de Início da Grade</label>
                  <input type="date" {...register('startDate', { required: true })} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Hora Inicial</label>
                    <input type="time" {...register('startTimeStr', { required: true })} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Hora Final</label>
                    <input type="time" {...register('endTimeStr', { required: true })} className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Dias da Semana</label>
                <div className="flex flex-wrap gap-4 bg-[#f8f9fc] p-4 rounded-xl">
                  {[
                    { label: 'Dom', value: '0' },
                    { label: 'Seg', value: '1' },
                    { label: 'Ter', value: '2' },
                    { label: 'Qua', value: '3' },
                    { label: 'Qui', value: '4' },
                    { label: 'Sex', value: '5' },
                    { label: 'Sáb', value: '6' },
                  ].map((day) => (
                    <label key={day.value} className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        value={day.value}
                        {...register('daysOfWeek', { required: true })}
                        className="w-5 h-5 text-[#004a8d] border-slate-300 rounded focus:ring-[#004a8d] cursor-pointer"
                      />
                      <span className="text-sm font-bold text-slate-700">{day.label}</span>
                    </label>
                  ))}
                </div>
                {errors.daysOfWeek && <span className="text-xs text-rose-500 font-bold mt-2 block">Selecione pelo menos um dia letivo para a grade.</span>}
              </div>
            </>
          )}

          <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} disabled={isSubmitting} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors disabled:opacity-50">
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting || isLoadingData} className="bg-[#004a8d] hover:bg-[#00386b] text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-[0_4px_14px_rgb(0,74,141,0.3)] disabled:opacity-70 flex items-center gap-2">
              {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Gerando...</> : 'Gerar Cronograma'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
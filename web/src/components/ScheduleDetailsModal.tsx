import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, User, BookOpen, Layers, Clock, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { alertDialog } from '../utils/dialog';
import { DateSelect } from './DateSelect';

interface ScheduleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string | null;
  onSuccess: () => void;
}

interface ScheduleDetails {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  cancelReason?: string;
  subject: { name: string; code: string };
  professor: { name: string; email: string };
  room: { name: string; type: string };
  classGroup: { code: string; shift: string };
}

export const ScheduleDetailsModal: React.FC<ScheduleDetailsModalProps> = ({ isOpen, onClose, eventId, onSuccess }) => {
  const [details, setDetails] = useState<ScheduleDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPostponing, setIsPostponing] = useState(false);
  const [showPostponeForm, setShowPostponeForm] = useState(false);
  const [postponeReason, setPostponeReason] = useState('');
  const [postponeNewDate, setPostponeNewDate] = useState('');

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/schedules/${eventId}`);
        if (isMounted) {
          setDetails(response.data.data);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes:', error);
        if (isMounted) {
          setError('Não foi possível carregar os detalhes da aula.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (isOpen && eventId) {
      loadDetails();
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDetails(null);
      setShowPostponeForm(false);
      setPostponeReason('');
      setPostponeNewDate('');
      setError(null);
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen, eventId]);

  const handlePostpone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventId || !postponeReason.trim()) return;

    setIsPostponing(true);
    setError(null);
    try {
      await axios.post(`/api/schedules/${eventId}/postpone`, { 
        reason: postponeReason,
        ...(postponeNewDate ? { newDate: postponeNewDate } : {})
      });
      alertDialog('Aula adiada com sucesso!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao adiar:', error);
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Ocorreu um erro ao adiar a aula.');
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsPostponing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-4xl p-8 w-full max-w-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Detalhes da Aula</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
            <X size={20} />
          </button>
        </div>

        {isLoading ? (
          <div className="py-10 flex flex-col items-center justify-center text-[#004a8d]">
            <Loader2 size={32} className="animate-spin mb-4" />
            <p className="text-sm font-bold text-slate-500">Carregando detalhes...</p>
          </div>
        ) : error && !details ? (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold">{error}</p>
            </div>
          </div>
        ) : details ? (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
              <BookOpen className="text-menu-uc shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Disciplina</p>
                <p className="font-bold text-slate-800">{details.subject?.name} <span className="text-slate-400 font-normal">({details.subject?.code})</span></p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
                <Layers className="text-menu-turmas shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Turma</p>
                  <p className="font-bold text-slate-800">{details.classGroup?.code}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
                <MapPin className="text-menu-salas shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sala</p>
                  <p className="font-bold text-slate-800">{details.room?.name}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
              <User className="text-menu-professores shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Professor</p>
                <p className="font-bold text-slate-800">{details.professor?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
              <Clock className="text-senac-blue shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Horário</p>
                <p className="font-bold text-slate-800">
                  {new Date(details.startTime).toLocaleString('pt-BR')} até {new Date(details.endTime).toLocaleTimeString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
              <Calendar className="text-slate-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</p>
                <p className="font-bold text-slate-800">
                  {details.status === 'PLANNED' && <span className="text-purple-600">Planejada</span>}
                  {details.status === 'SCHEDULED' && <span className="text-blue-600">Agendada</span>}
                  {details.status === 'COMPLETED' && <span className="text-emerald-600">Concluída</span>}
                  {details.status === 'CANCELLED' && <span className="text-rose-600">Cancelada</span>}
                </p>
                {details.status === 'CANCELLED' && details.cancelReason && (
                   <p className="text-sm text-rose-500 mt-1 italic">Motivo: {details.cancelReason}</p>
                )}
              </div>
            </div>

            {(details.status === 'SCHEDULED' || details.status === 'PLANNED') && !showPostponeForm && (
              <div className="flex gap-3 mt-2">
                <button 
                  onClick={() => { setShowPostponeForm(true); setError(null); }}
                  className="w-full bg-orange-50 hover:bg-orange-100 text-[#f37021] font-bold py-3 px-4 rounded-xl transition-colors border border-orange-200"
                >
                  Adiar / Reagendar Aula
                </button>
              </div>
            )}

            {showPostponeForm && (
              <form onSubmit={handlePostpone} className="mt-4 bg-orange-50 p-5 rounded-xl border border-orange-200 flex flex-col gap-4">
                {error && (
                  <div className="bg-rose-50 text-rose-700 p-3 rounded-lg text-sm border border-rose-200">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Motivo do Adiamento</label>
                  <input 
                    required
                    type="text"
                    value={postponeReason}
                    onChange={(e) => setPostponeReason(e.target.value)}
                    placeholder="Ex: Professor de atestado, emenda de feriado..."
                    className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl focus:ring-2 focus:ring-[#f37021] outline-none transition-all text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nova Data (Opcional)</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-[#f37021] transition-colors z-10">
                      <Calendar size={18} strokeWidth={2.5} />
                    </div>
                    <DateSelect 
                      value={postponeNewDate} 
                      onChange={setPostponeNewDate} 
                      placeholder="DD/MM/AAAA" 
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Se preenchida, tentará encaixar a aula nesta data. Caso vazia, a aula será empurrada para o final do cronograma (respeitando a regra original da turma).
                  </p>
                </div>
                <div className="flex justify-end gap-3 mt-2">
                  <button 
                    type="button" 
                    onClick={() => { setShowPostponeForm(false); setError(null); }}
                    className="px-4 py-2 font-bold text-slate-500 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    disabled={isPostponing || !postponeReason.trim()}
                    className="bg-[#f37021] hover:bg-[#d96017] disabled:opacity-70 text-white px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
                  >
                    {isPostponing ? <><Loader2 size={16} className="animate-spin" /> Processando...</> : 'Confirmar Adiamento'}
                  </button>
                </div>
              </form>
            )}

          </div>
        ) : null}
      </div>
    </div>
  );
};
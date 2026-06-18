import React, { useEffect, useMemo, useState } from 'react';

import axios from 'axios';
import { Calendar, CalendarDays, Check, Clock, Info, Plus } from 'lucide-react';

import { CanAccess } from '../components/CanAccess';
import { ContextPanel } from '../components/ContextPanel';
import { DateSelect } from '../components/DateSelect';
import { Select } from '../components/Select';
import { TimeSelect } from '../components/TimeSelect';
import {
  ContextSummaryCard,
  DataTable,
  type DataTableColumn,
  FormActions,
  FormField,
  FormInput,
  FormModal,
  getFormControlClass,
  ListToolbar,
  PageCard,
  PageHeader,
  PageLayout,
  PrimaryButton,
  SearchInput,
  SegmentControl,
  TableRowActions,
} from '../components/ui';
import { usePersistentState } from '../hooks/usePersistentState';
import api from '../services/api';
import { alertDialog, confirmDialog } from '../utils/dialog';
import { Role } from '../utils/roles';

interface ScheduleOverride {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  type: string;
}

const ACCENT = 'especiais' as const;

const YEAR_OPTIONS = [
  { id: 'all', label: 'Todos' },
  { id: '2026', label: '2026' },
  { id: '2025', label: '2025' },
];

const emptyFormData = {
  title: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  type: 'BLOCK',
};

export const CalendarReserves: React.FC = () => {
  const [feriados, setFeriados] = useState<ScheduleOverride[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllDay, setIsAllDay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [yearFilter, setYearFilter] = usePersistentState(
    'reserves_year',
    '2026',
  );
  const [search, setSearch] = usePersistentState('reserves_search', '');
  const [formData, setFormData] = useState(emptyFormData);

  const fetchOverrides = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/schedule-overrides');
      setFeriados(response.data.data || response.data);
    } catch (error) {
      console.error('Erro ao buscar feriados/reservas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOverrides();
  }, []);

  const openNewModal = () => {
    setFormData(emptyFormData);
    setIsAllDay(true);
    setIsModalOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const finalStartTime = isAllDay ? '00:00' : formData.startTime;
    const finalEndTime = isAllDay ? '23:59' : formData.endTime;

    if (
      !formData.startDate ||
      !finalStartTime ||
      !formData.endDate ||
      !finalEndTime
    ) {
      alertDialog('Preencha as datas e horários corretamente.');
      setIsSaving(false);
      return;
    }

    const payload = {
      title: formData.title,
      startTime: new Date(
        `${formData.startDate}T${finalStartTime}:00`,
      ).toISOString(),
      endTime: new Date(`${formData.endDate}T${finalEndTime}:00`).toISOString(),
      type: formData.type,
    };

    try {
      await api.post('/schedule-overrides', payload);
      alertDialog('Período Especial salvo com sucesso!');
      setFormData(emptyFormData);
      setIsAllDay(true);
      setIsModalOpen(false);
      fetchOverrides();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          'Ocorreu um erro ao conectar com a API.';
        alertDialog(`Erro ao criar a reserva: ${errorMessage}`);
      } else {
        alertDialog('Ocorreu um erro inesperado ao salvar a reserva.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !(await confirmDialog(
        'Tem certeza que deseja remover esta reserva/bloqueio?',
      ))
    )
      return;
    try {
      await api.delete(`/schedule-overrides/${id}`);
      alertDialog('Removido com sucesso!');
      fetchOverrides();
    } catch (error) {
      console.error(error);
      alertDialog('Erro ao remover.');
    }
  };

  const filteredFeriados = feriados.filter((f) => {
    const matchesSearch = f.title.toLowerCase().includes(search.toLowerCase());
    const matchesYear =
      yearFilter === 'all' ||
      new Date(f.startTime).getFullYear().toString() === yearFilter;
    return matchesSearch && matchesYear;
  });

  const selectClassName = `${getFormControlClass(ACCENT)} cursor-pointer`;

  const columns = useMemo<DataTableColumn<ScheduleOverride>[]>(
    () => [
      {
        key: 'title',
        header: 'Título',
        cellClassName: 'font-bold text-slate-800',
        render: (feriado) => feriado.title,
      },
      {
        key: 'startTime',
        header: 'Início',
        cellClassName: 'font-bold text-menu-especiais',
        render: (feriado) => new Date(feriado.startTime).toLocaleString(),
      },
      {
        key: 'endTime',
        header: 'Término',
        cellClassName: 'font-bold text-menu-especiais',
        render: (feriado) => new Date(feriado.endTime).toLocaleString(),
      },
      {
        key: 'type',
        header: 'Tipo',
        render: (feriado) => (
          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
            {feriado.type}
          </span>
        ),
      },
    ],
    [],
  );

  return (
    <PageLayout>
      <PageHeader
        accent={ACCENT}
        icon={<CalendarDays size={28} />}
        title="Períodos Especiais"
        description="Gerencie períodos especiais (sobrescrita do padrão de dias letivos e não letivos)."
        action={
          <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
            <PrimaryButton accent={ACCENT} onClick={openNewModal}>
              <Plus size={20} />
              Adicionar Período Especial
            </PrimaryButton>
          </CanAccess>
        }
      />

      <PageCard isLoading={isLoading} loadingMessage="Buscando períodos...">
        <ListToolbar>
          <SearchInput
            accent={ACCENT}
            placeholder="Buscar feriado..."
            value={search}
            onChange={setSearch}
          />
          <SegmentControl
            accent={ACCENT}
            label="Ano Base:"
            options={YEAR_OPTIONS}
            value={yearFilter}
            onChange={setYearFilter}
          />
        </ListToolbar>

        <DataTable
          columns={columns}
          data={filteredFeriados}
          rowKey={(feriado) => feriado.id}
          emptyMessage="Nenhum período especial encontrado."
          isLoading={isLoading}
          actionsColumn={{
            render: (feriado) => (
              <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
                <TableRowActions
                  accent={ACCENT}
                  onEdit={() => setIsModalOpen(true)}
                  onDelete={() => handleDelete(feriado.id)}
                />
              </CanAccess>
            ),
          }}
        />
      </PageCard>

      <FormModal
        open={isModalOpen}
        title="Períodos Especiais"
        onClose={() => setIsModalOpen(false)}
        isSaving={isSaving}
        savingMessage="Salvando período..."
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <FormField label="Título">
            <FormInput
              accent={ACCENT}
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Ex: Paixão de Cristo"
            />
          </FormField>

          <label className="flex items-center gap-3 cursor-pointer select-none w-fit">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={isAllDay}
                onChange={(e) => setIsAllDay(e.target.checked)}
                className="peer sr-only"
              />
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-menu-especiais peer-focus-visible:ring-offset-2 ${isAllDay ? 'bg-menu-especiais border-menu-especiais' : 'bg-[#f8f9fc] border-slate-300'}`}
              >
                {isAllDay && (
                  <Check size={14} className="text-white" strokeWidth={3} />
                )}
              </div>
            </div>
            <span className="text-sm font-bold text-slate-700">Dia todo</span>
          </label>

          <FormField label="Início">
            <div className="flex gap-3">
              <div className="relative group flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-menu-especiais transition-colors z-10">
                  <Calendar size={18} strokeWidth={2.5} />
                </div>
                <DateSelect
                  value={formData.startDate}
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
              <div
                className={`relative group w-36 transition-opacity ${isAllDay ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-menu-especiais transition-colors z-10">
                  <Clock size={18} strokeWidth={2.5} />
                </div>
                <TimeSelect
                  value={isAllDay ? '00:00' : formData.startTime}
                  onChange={(val) =>
                    setFormData({ ...formData, startTime: val })
                  }
                  placeholder="--:--"
                />
              </div>
            </div>
          </FormField>

          <FormField label="Término">
            <div className="flex gap-3">
              <div className="relative group flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-menu-especiais transition-colors z-10">
                  <Calendar size={18} strokeWidth={2.5} />
                </div>
                <DateSelect
                  value={formData.endDate}
                  onChange={(val) => setFormData({ ...formData, endDate: val })}
                  placeholder="DD/MM/AAAA"
                />
              </div>
              <div
                className={`relative group w-36 transition-opacity ${isAllDay ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-menu-especiais transition-colors z-10">
                  <Clock size={18} strokeWidth={2.5} />
                </div>
                <TimeSelect
                  value={isAllDay ? '23:59' : formData.endTime}
                  onChange={(val) => setFormData({ ...formData, endTime: val })}
                  placeholder="--:--"
                />
              </div>
            </div>
          </FormField>

          <FormField label="Tipo">
            <Select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className={selectClassName}
            >
              <option value="BLOCK">Período Não Letivo / Feriado</option>
              <option value="EXTRA_DAY">Período Letivo Extraordinário</option>
            </Select>
          </FormField>

          <FormActions
            accent={ACCENT}
            isSaving={isSaving}
            onCancel={() => setIsModalOpen(false)}
          />
        </form>
      </FormModal>

      <ContextPanel
        title="Períodos Especiais"
        description="Configure feriados e dias não letivos. Eles influenciam a geração automática, impedindo que aulas caiam em datas bloqueadas."
        icon={<Info className="text-menu-especiais" size={24} />}
        tips={[
          'Dias configurados como bloqueios evitam o agendamento automático de aulas.',
          'Você pode configurar bloqueios de dia inteiro ou para horários muito específicos.',
          'Mantenha o calendário escolar atualizado para maior precisão do Cronograma.',
        ]}
      >
        <ContextSummaryCard
          title="Resumo"
          icon={<CalendarDays size={16} className="text-menu-especiais" />}
          rows={[
            { label: 'Total de Períodos:', value: feriados.length },
            {
              label: 'Feriados/Bloqueios:',
              value: feriados.filter((f) => f.type === 'BLOCK').length,
              valueClassName: 'text-rose-500',
            },
          ]}
        />
      </ContextPanel>
    </PageLayout>
  );
};

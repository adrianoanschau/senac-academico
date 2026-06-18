import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Calendar, Layers, Plus, Route, Settings2 } from 'lucide-react';

import { CanAccess } from '../components/CanAccess';
import { ContextPanel } from '../components/ContextPanel';
import { DateSelect } from '../components/DateSelect';
import { Select } from '../components/Select';
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

const ACCENT = 'turmas' as const;

const initialFormState: ClassGroup = {
  code: '',
  startDate: '',
  endDate: '',
  shift: 'Manhã',
  curriculumId: '',
};

const SHIFT_OPTIONS = [
  { id: 'all', label: 'Todos' },
  { id: 'Manhã', label: 'Manhã' },
  { id: 'Tarde', label: 'Tarde' },
  { id: 'Noite', label: 'Noite' },
];

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  try {
    const [year, month, day] = dateStr.substring(0, 10).split('-');
    if (year && month && day) {
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  } catch {
    return dateStr;
  }
};

const formatDateForInput = (dateStr: string) => {
  if (!dateStr) return '';
  return dateStr.substring(0, 10);
};

const shiftBadgeClass = (shift: string) => {
  if (shift === 'Manhã') return 'bg-amber-100 text-amber-700';
  if (shift === 'Tarde') return 'bg-orange-100 text-orange-700';
  return 'bg-indigo-100 text-indigo-700';
};

export const ClassGroups: React.FC = () => {
  const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ClassGroup>(initialFormState);
  const [shiftFilter, setShiftFilter] = usePersistentState(
    'classGroups_shift',
    'all',
  );
  const [search, setSearch] = usePersistentState('classGroups_search', '');

  const fetchClassGroups = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/class-groups');
      setClassGroups(response.data.data || response.data || []);
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurriculums = async () => {
    try {
      const response = await api.get('/curriculums');
      setCurriculums(response.data.data || response.data || []);
    } catch (error) {
      console.error('Erro ao buscar grades curriculares:', error);
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
    if (!(await confirmDialog('Tem certeza que deseja excluir esta turma?')))
      return;

    try {
      await api.delete(`/class-groups/${id}`);
      fetchClassGroups();
    } catch (error) {
      console.error('Erro ao excluir turma:', error);
      alertDialog('Erro ao excluir a turma. Verifique dependências.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const isEditing = !!formData.id;
      const url = isEditing ? `/class-groups/${formData.id}` : '/class-groups';

      const payload: Partial<ClassGroup> = { ...formData };
      if (!isEditing) delete payload.id;
      delete payload.curriculum;

      if (isEditing) {
        await api.patch(url, payload);
      } else {
        await api.post(url, payload);
      }

      setIsModalOpen(false);
      fetchClassGroups();
    } catch (error) {
      console.error('Erro ao salvar turma:', error);
      alertDialog('Erro ao salvar os dados da turma.');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredClassGroups = classGroups.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      (c.curriculum?.name &&
        c.curriculum.name.toLowerCase().includes(search.toLowerCase()));
    const matchesShift = shiftFilter === 'all' || c.shift === shiftFilter;
    return matchesSearch && matchesShift;
  });

  const selectClassName = `${getFormControlClass(ACCENT)} cursor-pointer`;

  const columns = useMemo<DataTableColumn<ClassGroup>[]>(
    () => [
      {
        key: 'code',
        header: 'Código da Turma',
        render: (turma) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
              {turma.code?.substring(0, 2)}
            </div>
            <span className="font-bold text-menu-turmas">{turma.code}</span>
          </div>
        ),
      },
      {
        key: 'curriculum',
        header: 'Grade Curricular',
        cellClassName: 'text-slate-500 font-medium',
        render: (turma) => turma.curriculum?.name || '-',
      },
      {
        key: 'startDate',
        header: 'Data de Início',
        cellClassName: 'text-slate-500 font-medium',
        render: (turma) => formatDate(turma.startDate),
      },
      {
        key: 'endDate',
        header: 'Data de Término',
        cellClassName: 'text-slate-500 font-medium',
        render: (turma) => formatDate(turma.endDate),
      },
      {
        key: 'shift',
        header: 'Turno',
        render: (turma) => (
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${shiftBadgeClass(turma.shift)}`}
          >
            {turma.shift}
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
        icon={<Layers size={28} />}
        title="Turmas"
        description="Gerencie os grupos de alunos e seus períodos letivos."
        action={
          <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
            <PrimaryButton accent={ACCENT} onClick={handleOpenNewModal}>
              <Plus size={20} />
              Nova Turma
            </PrimaryButton>
          </CanAccess>
        }
      />

      <PageCard isLoading={isLoading} loadingMessage="Buscando turmas...">
        <ListToolbar>
          <SearchInput
            accent={ACCENT}
            placeholder="Buscar turma..."
            value={search}
            onChange={setSearch}
          />
          <SegmentControl
            accent={ACCENT}
            label="Turno:"
            options={SHIFT_OPTIONS}
            value={shiftFilter}
            onChange={setShiftFilter}
          />
        </ListToolbar>

        <DataTable
          columns={columns}
          data={filteredClassGroups}
          rowKey={(turma) => String(turma.id)}
          emptyMessage="Nenhuma turma cadastrada."
          isLoading={isLoading}
          actionsColumn={{
            render: (turma) => (
              <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
                <TableRowActions
                  accent={ACCENT}
                  onEdit={() => handleOpenEditModal(turma)}
                  onDelete={() => handleDelete(turma.id)}
                  extra={
                    <>
                      <Link
                        to={`/schedules/planning/${turma.id}`}
                        className="p-2 text-slate-400 hover:text-senac-blue hover:bg-senac-blue/10 rounded-lg transition-colors"
                        title="Planejar Módulo"
                      >
                        <Route size={18} />
                      </Link>
                      <Link
                        to={`/schedules/operations/${turma.id}`}
                        className="p-2 text-slate-400 hover:text-[#f37021] hover:bg-orange-50 rounded-lg transition-colors"
                        title="Gestão Operacional"
                      >
                        <Settings2 size={18} />
                      </Link>
                    </>
                  }
                />
              </CanAccess>
            ),
          }}
        />
      </PageCard>

      <FormModal
        open={isModalOpen}
        title="Turma"
        onClose={() => setIsModalOpen(false)}
        isSaving={isSaving}
        savingMessage="Salvando turma..."
      >
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <FormField label="Código da Turma">
            <FormInput
              accent={ACCENT}
              required
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="uppercase"
              placeholder="Ex: ENF24-1N3R"
            />
          </FormField>

          <FormField label="Grade Curricular">
            <Select
              required
              value={formData.curriculumId}
              onChange={(e) =>
                setFormData({ ...formData, curriculumId: e.target.value })
              }
              className={selectClassName}
            >
              <option value="">Selecione uma grade curricular...</option>
              {curriculums.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </FormField>

          <div className="flex gap-4">
            <div className="flex-1">
              <FormField label="Data de Início">
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
              </FormField>
            </div>
            <div className="flex-1">
              <FormField label="Término Previsto">
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
              </FormField>
            </div>
          </div>

          <FormField label="Turno">
            <Select
              value={formData.shift}
              onChange={(e) =>
                setFormData({ ...formData, shift: e.target.value })
              }
              className={selectClassName}
            >
              <option value="Manhã">Manhã</option>
              <option value="Tarde">Tarde</option>
              <option value="Noite">Noite</option>
              <option value="Integral">Integral</option>
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
        title="Gestão de Turmas"
        description="Gerencie os grupos de alunos e seus respectivos períodos letivos."
        icon={<Layers className="text-menu-turmas" size={24} />}
        tips={[
          'Toda turma precisa de uma Matriz Curricular (Grade) para ter disciplinas.',
          'Use o ícone de trilha para planejar módulos e o ícone de engrenagem para gestão operacional.',
          'Fique atento às datas de início e término para a correta geração de aulas.',
        ]}
      >
        <ContextSummaryCard
          title="Resumo"
          icon={<Layers size={16} className="text-menu-turmas" />}
          rows={[
            { label: 'Total de Turmas:', value: classGroups.length },
            {
              label: 'Turno Manhã:',
              value: classGroups.filter((c) => c.shift === 'Manhã').length,
            },
            {
              label: 'Turno Tarde:',
              value: classGroups.filter((c) => c.shift === 'Tarde').length,
            },
            {
              label: 'Turno Noite:',
              value: classGroups.filter((c) => c.shift === 'Noite').length,
            },
          ]}
        />
      </ContextPanel>
    </PageLayout>
  );
};

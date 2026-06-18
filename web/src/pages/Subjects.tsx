import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { BookOpen, Info, Library } from 'lucide-react';

import { ContextPanel } from '../components/ContextPanel';
import { SubjectCurriculumBadges } from '../components/Curriculum/SubjectCurriculumBadges';
import { Select } from '../components/Select';
import {
  ContextSummaryCard,
  DataTable,
  type DataTableColumn,
  getFormControlClass,
  ListFooter,
  ListToolbar,
  PageCard,
  PageHeader,
  PageLayout,
  SearchInput,
  SegmentControl,
} from '../components/ui';
import { useFetchedList } from '../hooks/useFetchedList';
import { usePersistentState } from '../hooks/usePersistentState';
import api from '../services/api';
import type { Course } from '../types/entities';
import type { Subject } from '../types/subject.types';
import { extractListData } from '../utils/apiResponse';

const ACCENT = 'uc' as const;

type LinkFilter = 'all' | 'linked' | 'orphan';

const LINK_FILTER_OPTIONS = [
  { id: 'all', label: 'Todas' },
  { id: 'linked', label: 'Vinculadas' },
  { id: 'orphan', label: 'Sem vínculo' },
];

export const Subjects: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = usePersistentState('subjects_search', '');
  const [linkFilter, setLinkFilter] = usePersistentState<LinkFilter>(
    'subjects_link_filter',
    'linked',
  );
  const [courseFilter, setCourseFilter] = usePersistentState(
    'subjects_course_filter',
    'all',
  );
  const [showOrphans, setShowOrphans] = usePersistentState(
    'subjects_show_orphans',
    false,
  );

  const { items: subjects, isLoading } = useFetchedList<Subject>({
    endpoint: '/subjects',
    params: { includeCurriculums: true },
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(extractListData<Course>(response));
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      }
    };

    void fetchCourses();
  }, []);

  const effectiveLinkFilter = showOrphans
    ? linkFilter
    : linkFilter === 'orphan'
      ? 'linked'
      : linkFilter;

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesSearch =
        subject.name.toLowerCase().includes(search.toLowerCase()) ||
        subject.code.toLowerCase().includes(search.toLowerCase());

      const linkCount = subject.curriculums?.length ?? 0;
      const isOrphan = linkCount === 0;

      if (!showOrphans && isOrphan) return false;

      const matchesLink =
        effectiveLinkFilter === 'all' ||
        (effectiveLinkFilter === 'linked' && !isOrphan) ||
        (effectiveLinkFilter === 'orphan' && isOrphan);

      const matchesCourse =
        courseFilter === 'all' ||
        (subject.curriculums?.some(
          (link) => link.curriculum?.course?.id === courseFilter,
        ) ??
          false);

      return matchesSearch && matchesLink && matchesCourse;
    });
  }, [subjects, search, effectiveLinkFilter, courseFilter, showOrphans]);

  const linkedCount = subjects.filter(
    (subject) => (subject.curriculums?.length ?? 0) > 0,
  ).length;
  const orphanCount = subjects.length - linkedCount;

  const selectClassName = `${getFormControlClass(ACCENT)} cursor-pointer text-sm font-bold min-w-40 py-2`;

  const columns = useMemo<DataTableColumn<Subject>[]>(
    () => [
      {
        key: 'name',
        header: 'Nome da UC',
        render: (subject) => {
          const isOrphan = (subject.curriculums?.length ?? 0) === 0;
          return (
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">{subject.name}</span>
              {isOrphan && showOrphans && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-700">
                  Órfã
                </span>
              )}
            </div>
          );
        },
      },
      {
        key: 'code',
        header: 'Código',
        cellClassName: 'text-slate-500 font-medium',
        render: (subject) => subject.code,
      },
      {
        key: 'hours',
        header: 'Carga Horária',
        headerClassName: 'text-center',
        cellClassName: 'text-center font-bold text-menu-uc',
        render: (subject) => `${subject.hours}h`,
      },
      {
        key: 'curriculums',
        header: 'Vinculada a',
        render: (subject) => (
          <SubjectCurriculumBadges links={subject.curriculums ?? []} />
        ),
      },
    ],
    [showOrphans],
  );

  return (
    <PageLayout>
      <PageHeader
        accent={ACCENT}
        icon={<BookOpen size={28} />}
        title="Dicionário de Unidades Curriculares"
        description="Consulte todas as disciplinas cadastradas e seus vínculos com cursos e grades."
        action={
          <Link
            to="/curriculums"
            className="text-sm font-bold text-menu-matriz hover:opacity-80 flex items-center gap-2 bg-menu-matriz/10 px-4 py-2.5 rounded-xl transition-colors"
          >
            <Library size={18} />
            Adicionar via Matriz Curricular
          </Link>
        }
      />

      <PageCard isLoading={isLoading} loadingMessage="Buscando disciplinas...">
        <ListToolbar>
          <div className="flex flex-wrap justify-between items-center gap-4 w-full">
            <SearchInput
              accent={ACCENT}
              placeholder="Buscar unidade curricular..."
              value={search}
              onChange={setSearch}
            />
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                <span>Curso:</span>
                <Select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className={selectClassName}
                >
                  <option value="all">Todos</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </Select>
              </div>
              <SegmentControl
                accent={ACCENT}
                options={LINK_FILTER_OPTIONS}
                value={effectiveLinkFilter}
                onChange={(value) => setLinkFilter(value as LinkFilter)}
              />
            </div>
          </div>
        </ListToolbar>

        {!showOrphans && orphanCount > 0 && (
          <div className="mb-4 flex items-center justify-between bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-sm">
            <span className="text-amber-800">
              {orphanCount} UC{orphanCount !== 1 ? 's' : ''} sem vínculo oculta
              {orphanCount !== 1 ? 's' : ''}.
            </span>
            <button
              type="button"
              onClick={() => {
                setShowOrphans(true);
                setLinkFilter('all');
              }}
              className="font-bold text-amber-700 hover:text-amber-900 underline"
            >
              Exibir órfãs
            </button>
          </div>
        )}

        {showOrphans && (
          <div className="mb-4 flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm">
            <span className="text-slate-600">
              Exibindo UCs sem vínculo ({orphanCount}).
            </span>
            <button
              type="button"
              onClick={() => {
                setShowOrphans(false);
                if (linkFilter === 'orphan') setLinkFilter('linked');
              }}
              className="font-bold text-slate-600 hover:text-slate-800 underline"
            >
              Ocultar órfãs
            </button>
          </div>
        )}

        <DataTable
          columns={columns}
          data={filteredSubjects}
          rowKey={(subject) => subject.id}
          emptyMessage="Nenhuma disciplina encontrada."
          isLoading={isLoading}
        />

        <ListFooter
          summary={`Mostrando ${filteredSubjects.length} de ${subjects.length} disciplina(s)`}
        />
      </PageCard>

      <ContextPanel
        title="Dicionário de UCs"
        description="Catálogo global de referência. A gestão de disciplinas acontece dentro de cada Matriz Curricular."
        icon={<Info className="text-menu-uc" size={24} />}
        tips={[
          'Uma mesma UC pode aparecer em múltiplas grades (reutilização).',
          'UCs sem vínculo foram criadas mas ainda não associadas a uma grade.',
          'Para adicionar disciplinas, acesse a Matriz Curricular e abra a grade desejada.',
        ]}
      >
        <ContextSummaryCard
          title="Resumo"
          icon={<BookOpen size={16} className="text-menu-uc" />}
          rows={[
            { label: 'Total de Disciplinas:', value: subjects.length },
            {
              label: 'Vinculadas:',
              value: linkedCount,
              valueClassName: 'text-emerald-600',
            },
            {
              label: 'Sem vínculo:',
              value: orphanCount,
              valueClassName: 'text-amber-600',
            },
            {
              label: 'Carga Horária Média:',
              value: `${
                subjects.length > 0
                  ? Math.round(
                      subjects.reduce(
                        (acc, subject) => acc + (subject.hours || 0),
                        0,
                      ) / subjects.length,
                    )
                  : 0
              }h`,
            },
          ]}
        />
      </ContextPanel>
    </PageLayout>
  );
};

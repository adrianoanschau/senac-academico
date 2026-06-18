import { useEffect, useMemo, useState } from 'react';

import api from '../services/api';
import { extractListData } from '../utils/apiResponse';
import type { ScheduleCalendarFilters } from '../utils/scheduleCalendarParams';
import { usePersistentState } from './usePersistentState';

export const SCHEDULE_STATUS_OPTIONS = [
  { id: 'PLANNED', label: 'Planejados' },
  { id: 'SCHEDULED', label: 'Agendados' },
  { id: 'COMPLETED', label: 'Concluídos' },
  { id: 'CANCELLED', label: 'Cancelados' },
] as const;

export interface ScheduleFilterSubject {
  id: string;
  name: string;
  code?: string;
}

export interface ScheduleFilterOption {
  id: string;
  name: string;
  code?: string;
}

export interface UseScheduleFiltersOptions {
  storagePrefix: string;
  fixedClassGroupId?: string;
  initialClassGroupId?: string;
  scopeSubjectsToClassGroup?: boolean;
}

export function useScheduleFilters({
  storagePrefix,
  fixedClassGroupId,
  initialClassGroupId = '',
  scopeSubjectsToClassGroup = false,
}: UseScheduleFiltersOptions) {
  const key = (suffix: string) => `${storagePrefix}_${suffix}`;

  const [isFullscreen, setIsFullscreen] = usePersistentState(
    key('fullscreen'),
    false,
  );
  const [search, setSearch] = usePersistentState(key('search'), '');
  const [status, setStatus] = usePersistentState<string[]>(key('status'), [
    'PLANNED',
    'SCHEDULED',
    'COMPLETED',
  ]);
  const [subjectId, setSubjectId] = usePersistentState<string>(
    key('subjectId'),
    '',
  );
  const [roomId, setRoomId] = usePersistentState<string>(key('roomId'), '');
  const [professorId, setProfessorId] = usePersistentState<string>(
    key('professorId'),
    '',
  );
  const [classGroupId, setClassGroupId] = usePersistentState<string>(
    key('classGroupId'),
    fixedClassGroupId || initialClassGroupId,
  );
  const [selectedDateStr, setSelectedDateStr] = usePersistentState<string>(
    key('selected_date'),
    new Date().toISOString(),
  );
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [subjects, setSubjects] = useState<ScheduleFilterSubject[]>([]);
  const [rooms, setRooms] = useState<ScheduleFilterOption[]>([]);
  const [professors, setProfessors] = useState<ScheduleFilterOption[]>([]);
  const [classGroups, setClassGroups] = useState<ScheduleFilterOption[]>([]);

  const effectiveClassGroupId = fixedClassGroupId || classGroupId;

  const selectedDate = !isNaN(new Date(selectedDateStr).getTime())
    ? new Date(selectedDateStr)
    : new Date();

  useEffect(() => {
    if (fixedClassGroupId) return;
    if (initialClassGroupId) {
      setClassGroupId(initialClassGroupId);
    }
  }, [fixedClassGroupId, initialClassGroupId, setClassGroupId]);

  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const subjectsParams =
          scopeSubjectsToClassGroup && effectiveClassGroupId
            ? { params: { classGroupId: effectiveClassGroupId } }
            : undefined;

        const requests = [
          api.get('/subjects', subjectsParams),
          api.get('/rooms'),
          api.get('/professors'),
        ] as const;

        if (!fixedClassGroupId) {
          const [subjectsRes, roomsRes, professorsRes, classGroupsRes] =
            await Promise.all([...requests, api.get('/class-groups')]);
          setSubjects(extractListData<ScheduleFilterSubject>(subjectsRes));
          setRooms(extractListData<ScheduleFilterOption>(roomsRes));
          setProfessors(extractListData<ScheduleFilterOption>(professorsRes));
          setClassGroups(extractListData<ScheduleFilterOption>(classGroupsRes));
          return;
        }

        if (!effectiveClassGroupId) return;

        const [subjectsRes, roomsRes, professorsRes] = await Promise.all(
          requests,
        );
        setSubjects(extractListData<ScheduleFilterSubject>(subjectsRes));
        setRooms(extractListData<ScheduleFilterOption>(roomsRes));
        setProfessors(extractListData<ScheduleFilterOption>(professorsRes));
      } catch (error) {
        console.error('Erro ao buscar dados para os filtros:', error);
      }
    };

    void fetchFiltersData();
  }, [effectiveClassGroupId, fixedClassGroupId, scopeSubjectsToClassGroup]);

  const calendarFilters = useMemo(
    (): ScheduleCalendarFilters & { _refresh: number } => ({
      search,
      status,
      subjectId,
      roomId,
      professorId,
      classGroupId: effectiveClassGroupId,
      _refresh: refreshTrigger,
    }),
    [
      search,
      status,
      subjectId,
      roomId,
      professorId,
      effectiveClassGroupId,
      refreshTrigger,
    ],
  );

  const listFilters = useMemo(
    (): ScheduleCalendarFilters => ({
      search,
      status,
      subjectId,
      roomId,
      professorId,
      classGroupId: effectiveClassGroupId,
    }),
    [search, status, subjectId, roomId, professorId, effectiveClassGroupId],
  );

  const toggleStatus = (statusId: string) => {
    setStatus((prev) =>
      prev.includes(statusId)
        ? prev.filter((item) => item !== statusId)
        : [...prev, statusId],
    );
  };

  const bumpRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const setSelectedDate = (date: Date) => {
    setSelectedDateStr(date.toISOString());
  };

  return {
    search,
    setSearch,
    status,
    toggleStatus,
    subjectId,
    setSubjectId,
    roomId,
    setRoomId,
    professorId,
    setProfessorId,
    classGroupId,
    setClassGroupId,
    effectiveClassGroupId,
    isFullscreen,
    setIsFullscreen,
    selectedDate,
    setSelectedDate,
    bumpRefresh,
    subjects,
    rooms,
    professors,
    classGroups,
    calendarFilters,
    listFilters,
    showClassGroupFilter: !fixedClassGroupId,
  };
}

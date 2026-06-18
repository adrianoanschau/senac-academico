import React from 'react';

import { Maximize, Minimize } from 'lucide-react';

import {
  SCHEDULE_STATUS_OPTIONS,
  type ScheduleFilterOption,
  type ScheduleFilterSubject,
} from '../../hooks/useScheduleFilters';
import { Select } from '../Select';
import { type AccentPreset, getAccentClasses, SearchInput } from '../ui';

interface ScheduleFilterBarProps {
  accent: AccentPreset;
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  status: string[];
  onToggleStatus: (statusId: string) => void;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
  showClassGroupFilter?: boolean;
  classGroupId?: string;
  onClassGroupIdChange?: (id: string) => void;
  classGroups?: ScheduleFilterOption[];
  professorId: string;
  onProfessorIdChange: (id: string) => void;
  professors: ScheduleFilterOption[];
  roomId: string;
  onRoomIdChange: (id: string) => void;
  rooms: ScheduleFilterOption[];
  subjectId: string;
  onSubjectIdChange: (id: string) => void;
  subjects: ScheduleFilterSubject[];
}

export const ScheduleFilterBar: React.FC<ScheduleFilterBarProps> = ({
  accent,
  search,
  onSearchChange,
  searchPlaceholder = 'Buscar cronograma...',
  status,
  onToggleStatus,
  isFullscreen,
  onFullscreenToggle,
  showClassGroupFilter = false,
  classGroupId = '',
  onClassGroupIdChange,
  classGroups = [],
  professorId,
  onProfessorIdChange,
  professors,
  roomId,
  onRoomIdChange,
  rooms,
  subjectId,
  onSubjectIdChange,
  subjects,
}) => {
  const { ring, segmentActive } = getAccentClasses(accent);
  const selectClassName = `w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 ${ring} outline-none transition-all text-slate-800 cursor-pointer font-medium text-sm`;

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <SearchInput
          accent={accent}
          value={search}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />

        <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
          <span>Status:</span>
          <div className="flex bg-[#f8f9fc] rounded-xl p-1 gap-1">
            {SCHEDULE_STATUS_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => onToggleStatus(option.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  status.includes(option.id)
                    ? segmentActive
                    : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onFullscreenToggle}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors ml-2"
            title={isFullscreen ? 'Sair da Tela Cheia' : 'Tela Cheia'}
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-xl">
        {showClassGroupFilter && onClassGroupIdChange && (
          <div className="flex-1 min-w-50">
            <Select
              value={classGroupId}
              onChange={(e) => onClassGroupIdChange(e.target.value)}
              className={selectClassName}
            >
              <option value="">Todas as Turmas...</option>
              {classGroups.map((classGroup) => (
                <option key={classGroup.id} value={classGroup.id}>
                  {classGroup.code || classGroup.name}
                </option>
              ))}
            </Select>
          </div>
        )}
        <div className="flex-1 min-w-50">
          <Select
            value={professorId}
            onChange={(e) => onProfessorIdChange(e.target.value)}
            className={selectClassName}
          >
            <option value="">Todos os Professores...</option>
            {professors.map((professor) => (
              <option key={professor.id} value={professor.id}>
                {professor.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex-1 min-w-50">
          <Select
            value={roomId}
            onChange={(e) => onRoomIdChange(e.target.value)}
            className={selectClassName}
          >
            <option value="">Todas as Salas...</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex-1 min-w-50">
          <Select
            value={subjectId}
            onChange={(e) => onSubjectIdChange(e.target.value)}
            className={selectClassName}
          >
            <option value="">Todas as Disciplinas...</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.code
                  ? `${subject.code}: ${subject.name}`
                  : subject.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

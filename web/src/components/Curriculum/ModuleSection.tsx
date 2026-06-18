import React from 'react';

import { Plus, Trash2 } from 'lucide-react';

import type { CurriculumSubject } from '../../types/subject.types';
import { Role } from '../../utils/roles';
import { CanAccess } from '../CanAccess';

interface ModuleSectionProps {
  moduleNumber: number;
  subjects: CurriculumSubject[];
  onAddSubject: (module: number) => void;
  onRemoveSubject: (curriculumSubjectId: string) => void;
}

export const ModuleSection: React.FC<ModuleSectionProps> = ({
  moduleNumber,
  subjects,
  onAddSubject,
  onRemoveSubject,
}) => {
  const totalHours = subjects.reduce(
    (acc, s) => acc + (s.subject?.hours ?? 0),
    0,
  );

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            Módulo {moduleNumber}
          </h3>
          <p className="text-sm text-slate-500">
            {subjects.length} UC{subjects.length !== 1 ? 's' : ''} ·{' '}
            {totalHours}h
          </p>
        </div>
        <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
          <button
            onClick={() => onAddSubject(moduleNumber)}
            className="text-sm bg-menu-matriz/10 text-menu-matriz px-3 py-1.5 rounded-lg font-bold hover:bg-menu-matriz/20 transition-colors flex items-center gap-1"
          >
            <Plus size={16} /> Adicionar Disciplina
          </button>
        </CanAccess>
      </div>

      {subjects.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          Nenhuma disciplina neste módulo.
        </p>
      ) : (
        <div className="space-y-2">
          {subjects.map((cs) => (
            <div
              key={cs.id}
              className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl"
            >
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 truncate">
                  {cs.subject?.code ? `${cs.subject.code} · ` : ''}
                  {cs.subject?.name ?? 'Disciplina'}
                </p>
              </div>
              <span className="text-sm font-bold text-menu-matriz shrink-0">
                {cs.subject?.hours ?? 0}h
              </span>
              <CanAccess roles={[Role.ADMIN, Role.SECRETARY]}>
                <button
                  onClick={() => onRemoveSubject(cs.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                  title="Remover vínculo"
                >
                  <Trash2 size={18} />
                </button>
              </CanAccess>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

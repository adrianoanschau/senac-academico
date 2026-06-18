import React from 'react';
import { Link } from 'react-router-dom';

import type { CurriculumSubjectLink } from '../../types/subject.types';

interface SubjectCurriculumBadgesProps {
  links: CurriculumSubjectLink[];
  maxVisible?: number;
}

export const SubjectCurriculumBadges: React.FC<
  SubjectCurriculumBadgesProps
> = ({ links, maxVisible = 2 }) => {
  if (!links || links.length === 0) {
    return (
      <span
        className="text-slate-400 text-sm"
        title="Esta UC ainda não foi adicionada a nenhuma grade"
      >
        —
      </span>
    );
  }

  const visible = links.slice(0, maxVisible);
  const hiddenCount = links.length - visible.length;

  return (
    <div className="flex flex-col gap-1.5">
      {visible.map((link) => {
        const courseName = link.curriculum?.course?.name ?? 'Curso';
        const gradeName = link.curriculum?.name ?? 'Grade';
        const label = `${courseName} · ${gradeName}`;

        if (link.curriculum?.id) {
          return (
            <Link
              key={link.id}
              to={`/curriculums/${link.curriculum.id}`}
              className="inline-flex w-fit items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-menu-matriz/10 text-menu-matriz hover:bg-menu-matriz/20 transition-colors"
              title={`Módulo ${link.module}`}
            >
              {label}
            </Link>
          );
        }

        return (
          <span
            key={link.id}
            className="inline-flex w-fit items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-menu-matriz/10 text-menu-matriz"
          >
            {label}
          </span>
        );
      })}
      {hiddenCount > 0 && (
        <span
          className="inline-flex w-fit items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-500"
          title={links
            .slice(maxVisible)
            .map((l) => {
              const course = l.curriculum?.course?.name ?? 'Curso';
              const grade = l.curriculum?.name ?? 'Grade';
              return `${course} · ${grade}`;
            })
            .join('\n')}
        >
          +{hiddenCount}
        </span>
      )}
    </div>
  );
};

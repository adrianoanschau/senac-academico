import React from 'react';

import type { AccentPreset } from './accent';
import { getAccentClasses } from './accent';

interface PageHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  accent: AccentPreset;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  icon,
  title,
  description,
  accent,
  action,
}) => {
  const { iconBadge } = getAccentClasses(accent);

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <div className={`p-2 rounded-xl ${iconBadge}`}>{icon}</div>
          {title}
        </h1>
        <p className="text-slate-500 mt-1">{description}</p>
      </div>
      {action}
    </div>
  );
};

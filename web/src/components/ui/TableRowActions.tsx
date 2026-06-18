import React from 'react';

import { Edit2, Trash2 } from 'lucide-react';

import type { AccentPreset } from './accent';
import { getAccentClasses } from './accent';

interface TableRowActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  accent: AccentPreset;
  extra?: React.ReactNode;
}

export const TableRowActions: React.FC<TableRowActionsProps> = ({
  onEdit,
  onDelete,
  accent,
  extra,
}) => {
  const { actionHover } = getAccentClasses(accent);

  return (
    <div className="flex items-center justify-end gap-2">
      {extra}
      <button
        type="button"
        onClick={onEdit}
        className={`p-2 text-slate-400 rounded-lg transition-colors ${actionHover}`}
        title="Editar"
      >
        <Edit2 size={18} />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
        title="Excluir"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

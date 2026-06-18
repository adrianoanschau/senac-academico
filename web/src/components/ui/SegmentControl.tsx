import React from 'react';

import type { AccentPreset } from './accent';
import { getAccentClasses } from './accent';

export interface SegmentOption {
  id: string;
  label: string;
}

interface SegmentControlProps {
  label?: string;
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  accent: AccentPreset;
}

export const SegmentControl: React.FC<SegmentControlProps> = ({
  label,
  options,
  value,
  onChange,
  accent,
}) => {
  const { segmentActive } = getAccentClasses(accent);

  return (
    <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
      {label && <span>{label}</span>}
      <div className="flex bg-[#f8f9fc] rounded-xl p-1 gap-1">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              value === option.id
                ? segmentActive
                : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

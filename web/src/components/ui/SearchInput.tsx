import React from 'react';

import { Search } from 'lucide-react';

import type { AccentPreset } from './accent';
import { getAccentClasses } from './accent';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  accent: AccentPreset;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  accent,
  className = 'w-72',
}) => {
  const { ring } = getAccentClasses(accent);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search size={18} className="text-slate-400" />
      </div>
      <input
        type="text"
        className={`w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 ${ring} outline-none transition-all text-slate-800 font-medium placeholder-slate-400`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

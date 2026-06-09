import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface TimeSelectProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  hasError?: boolean;
  minHour?: number;
  maxHour?: number;
}

export const TimeSelect: React.FC<TimeSelectProps> = ({ value, onChange, placeholder, hasError, minHour = 0, maxHour = 23 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const timeOptions = React.useMemo(() => {
    const options: string[] = [];
    for (let i = minHour; i <= maxHour; i++) {
      const hourStr = i.toString().padStart(2, '0');
      options.push(`${hourStr}:00`);
      if (i < maxHour || maxHour === 23) {
        options.push(`${hourStr}:30`);
      }
    }
    return options;
  }, [minHour, maxHour]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full pl-11 pr-4 py-3 bg-[#f8f9fc] border hover:border-slate-200 rounded-xl focus-within:bg-white focus-within:ring-2 outline-none transition-all cursor-pointer flex justify-between items-center ${hasError ? 'border-rose-300 focus-within:border-rose-500 focus-within:ring-rose-500/20' : 'border-transparent focus-within:border-[#004a8d] focus-within:ring-[#004a8d]/20'}`}
        tabIndex={0}
      >
        <span className={value ? "text-slate-800 font-medium" : "text-slate-400"}>
          {value || placeholder}
        </span>
        <ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-h-56 overflow-y-auto py-2 custom-scrollbar">
          {timeOptions.map((time) => (
            <div
              key={time}
              onClick={() => {
                onChange(time);
                setIsOpen(false);
              }}
              className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${value === time ? 'bg-blue-50 text-[#004a8d] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              {time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
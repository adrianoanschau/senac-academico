import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateSelectProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  hasError?: boolean;
}

export const DateSelect: React.FC<DateSelectProps> = ({ value, onChange, placeholder, hasError }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value + 'T12:00:00') : new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Converte "YYYY-MM-DD" nativo para "DD/MM/YYYY" visualmente
  const displayValue = value ? value.split('-').reverse().join('/') : '';

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleSelectDate = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    onChange(`${year}-${month}-${dayStr}`);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full pl-11 pr-4 py-3 bg-[#f8f9fc] border hover:border-slate-200 rounded-xl focus-within:bg-white focus-within:ring-2 outline-none transition-all cursor-pointer flex justify-between items-center ${hasError ? 'border-rose-300 focus-within:border-rose-500 focus-within:ring-rose-500/20' : 'border-transparent focus-within:border-[#004a8d] focus-within:ring-[#004a8d]/20'}`}
        tabIndex={0}
      >
        <span className={value ? "text-slate-800 font-medium" : "text-slate-400"}>
          {displayValue || placeholder}
        </span>
        <ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 mt-2 p-5 bg-white border border-slate-100 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-[280px]">
          <div className="flex justify-between items-center mb-4">
            <button type="button" onClick={prevMonth} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="font-bold text-slate-800 text-sm">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            <button type="button" onClick={nextMonth} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
              <div key={i} className="text-xs font-bold text-slate-400/80 mb-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {blanks.map(b => <div key={`blank-${b}`} className="w-8 h-8"></div>)}
            {days.map(day => {
              const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = value === dateStr;
              const isToday = new Date().toISOString().split('T')[0] === dateStr;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDate(day)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm mx-auto transition-colors ${
                    isSelected 
                      ? 'bg-[#004a8d] text-white font-bold shadow-md' 
                      : isToday 
                        ? 'bg-blue-50 text-[#004a8d] font-bold hover:bg-blue-100'
                        : 'text-slate-700 hover:bg-slate-100 font-medium'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
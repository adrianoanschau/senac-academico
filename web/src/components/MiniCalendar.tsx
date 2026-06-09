import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MiniCalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({ selectedDate = new Date(), onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  const today = new Date();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  }, [selectedDate]);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <button onClick={handlePrevMonth} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
          <ChevronLeft size={16} />
        </button>
        <h4 className="text-sm font-bold text-slate-800 capitalize">
          {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </h4>
        <button onClick={handleNextMonth} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-400 mb-2">
        <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
        {blanks.map(b => <div key={`b-${b}`} className="p-1.5"></div>)}
        {days.map(d => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
          const isSelected = date.toDateString() === selectedDate.toDateString();
          const isToday = date.toDateString() === today.toDateString();

          return (
          <div 
            key={d} 
            onClick={() => onDateSelect?.(date)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isSelected 
                ? 'bg-[#004a8d] text-white font-bold shadow-md' 
                : isToday
                  ? 'text-[#004a8d] font-bold bg-blue-50'
                  : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {d}
          </div>
          );
        })}
      </div>
    </div>
  );
};
import React from 'react';

interface SummaryRow {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}

interface ContextSummaryCardProps {
  title: string;
  icon: React.ReactNode;
  rows: SummaryRow[];
}

export const ContextSummaryCard: React.FC<ContextSummaryCardProps> = ({
  title,
  icon,
  rows,
}) => (
  <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mt-4">
    <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
      {icon}
      {title}
    </h4>
    <div className="flex flex-col gap-2">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex justify-between items-center text-xs text-slate-600"
        >
          <span>{row.label}</span>
          <span className={`font-bold ${row.valueClassName ?? ''}`}>
            {row.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

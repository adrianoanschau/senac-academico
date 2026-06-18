import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  iconClassName: string;
  label: string;
  value: string | number;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconClassName,
  label,
  value,
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex items-center gap-4">
    <div className={`p-4 rounded-xl ${iconClassName}`}>{icon}</div>
    <div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

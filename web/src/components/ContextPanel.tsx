import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ContextPanelProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tips?: string[];
  children?: React.ReactNode;
}

export const ContextPanel: React.FC<ContextPanelProps> = ({ title, description, icon, tips, children }) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTarget(document.getElementById('context-panel-root'));
  }, []);

  if (!target) return null;

  return createPortal(
    <div className="flex flex-col gap-4 sticky top-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      </div>
      <p className="text-slate-500 text-sm leading-relaxed">
        {description}
      </p>

      {/* Renderiza o widget customizado (resumo, calendário) injetado pela rota atual */}
      {children}

      {tips && tips.length > 0 && (
        <div className="mt-2 bg-blue-50/50 rounded-xl p-4 border border-blue-100">
          <h4 className="text-xs font-bold text-[#004a8d] uppercase mb-2">Dicas e Próximos Passos</h4>
          <ul className="flex flex-col gap-2">
            {tips.map((tip, idx) => (
              <li key={idx} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                <span className="text-[#f37021] mt-0.5 font-bold">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>,
    target
  );
};
import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  visible: boolean;
  global?: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  global = false,
  message = "Carregando...",
}) => {
  if (!visible) return null;

  const positionClasses = global ? "fixed z-[9999]" : "absolute z-50";

  return (
    <div
      className={`${positionClasses} inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity`}
    >
      <div className="bg-white p-5 rounded-2xl shadow-xl flex flex-col items-center gap-3">
        <Loader2 size={32} className="animate-spin text-slate-800" />
        {message && (
          <span className="text-sm font-bold text-slate-700">{message}</span>
        )}
      </div>
    </div>
  );
};

import React from 'react';

import { X } from 'lucide-react';

import { LoadingOverlay } from '../LoadingOverlay';

interface FormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  isSaving?: boolean;
  savingMessage?: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}

export const FormModal: React.FC<FormModalProps> = ({
  open,
  title,
  onClose,
  isSaving = false,
  savingMessage = 'Salvando...',
  children,
  maxWidthClass = 'max-w-md',
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-4xl p-8 w-full ${maxWidthClass} shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <LoadingOverlay visible={isSaving} message={savingMessage} />
        {children}
      </div>
    </div>
  );
};

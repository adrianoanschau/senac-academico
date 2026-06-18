import React from 'react';

import type { AccentPreset } from './accent';
import { getAccentClasses } from './accent';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children }) => (
  <div>
    <label className="block text-sm font-bold text-slate-700 mb-2">
      {label}
    </label>
    {children}
  </div>
);

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  accent: AccentPreset;
}

export const FormInput: React.FC<FormInputProps> = ({
  accent,
  className = '',
  ...props
}) => {
  const { ring } = getAccentClasses(accent);

  return (
    <input
      className={`w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 ${ring} outline-none transition-all text-slate-800 ${className}`}
      {...props}
    />
  );
};

interface FormActionsProps {
  onCancel: () => void;
  isSaving?: boolean;
  submitLabel?: string;
  savingLabel?: string;
  accent: AccentPreset;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  isSaving = false,
  submitLabel = 'Salvar',
  savingLabel = 'Salvando...',
  accent,
}) => {
  const { primaryButton } = getAccentClasses(accent);

  return (
    <div className="mt-4 flex justify-end gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
      >
        Cancelar
      </button>
      <button
        type="submit"
        disabled={isSaving}
        className={`disabled:opacity-70 px-5 py-2.5 rounded-xl font-bold transition-colors ${primaryButton}`}
      >
        {isSaving ? savingLabel : submitLabel}
      </button>
    </div>
  );
};

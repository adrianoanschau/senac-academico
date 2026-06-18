import React from 'react';

import type { AccentPreset } from './accent';
import { getAccentClasses } from './accent';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  accent: AccentPreset;
  children: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  accent,
  children,
  className = '',
  ...props
}) => {
  const { primaryButton } = getAccentClasses(accent);

  return (
    <button
      type="button"
      className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors ${primaryButton} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

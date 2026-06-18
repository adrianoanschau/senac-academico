import React from 'react';
import { Link } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import type { AccentPreset } from './accent';

interface PageLayoutProps {
  children: React.ReactNode;
  size?: 'default' | 'wide' | 'narrow';
}

const layoutSizeClass: Record<NonNullable<PageLayoutProps['size']>, string> = {
  default: 'max-w-6xl',
  wide: 'max-w-[1600px] px-4',
  narrow: 'max-w-4xl',
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  size = 'default',
}) => (
  <div className={`w-full mx-auto pb-10 ${layoutSizeClass[size]}`}>
    {children}
  </div>
);

const backLinkHoverClass: Partial<Record<AccentPreset, string>> = {
  senac: 'hover:text-senac-blue',
  matriz: 'hover:text-menu-matriz',
  operacional: 'hover:text-[#f37021]',
  turmas: 'hover:text-menu-turmas',
};

interface PageBackLinkProps {
  to: string;
  label: string;
  accent?: AccentPreset;
}

export const PageBackLink: React.FC<PageBackLinkProps> = ({
  to,
  label,
  accent = 'senac',
}) => (
  <Link
    to={to}
    className={`inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors mb-4 ${backLinkHoverClass[accent] ?? backLinkHoverClass.senac}`}
  >
    <ArrowLeft size={18} />
    {label}
  </Link>
);

import React from 'react';

import { LoadingOverlay } from '../LoadingOverlay';

interface PageCardProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingMessage?: string;
}

export const PageCard: React.FC<PageCardProps> = ({
  children,
  isLoading = false,
  loadingMessage = 'Carregando...',
}) => (
  <div className="bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden">
    <LoadingOverlay visible={isLoading} message={loadingMessage} />
    {children}
  </div>
);

import React from 'react';

interface ListToolbarProps {
  children: React.ReactNode;
}

export const ListToolbar: React.FC<ListToolbarProps> = ({ children }) => (
  <div className="flex justify-between items-center mb-6">{children}</div>
);

interface ListFooterProps {
  summary: string;
  children?: React.ReactNode;
}

export const ListFooter: React.FC<ListFooterProps> = ({
  summary,
  children,
}) => (
  <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100 text-sm font-medium text-slate-400">
    <span>{summary}</span>
    {children}
  </div>
);

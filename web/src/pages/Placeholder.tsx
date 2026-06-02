import React from 'react';
import { useLocation } from 'react-router-dom';

export const Placeholder: React.FC = () => {
  const location = useLocation();
  const pathName = location.pathname.replace('/', '');
  const title = pathName.charAt(0).toUpperCase() + pathName.slice(1);

  return (
    <div>
      <h2>{title || 'Página'}</h2>
      <p style={{ color: '#64748b' }}>Esta página ainda está em construção e será implementada em breve.</p>
    </div>
  );
};

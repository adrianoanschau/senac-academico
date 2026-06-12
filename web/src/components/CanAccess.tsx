import React, { type ReactNode } from 'react';
import { useAuth, type AppRole } from '../contexts/AuthContext';

interface CanAccessProps {
  roles: AppRole[];
  children: ReactNode;
}

export const CanAccess: React.FC<CanAccessProps> = ({ roles, children }) => {
  const { profile } = useAuth();

  // Se não existir perfil carregado ou a role não estiver entre as permitidas, esconde
  if (!profile || !profile.roles?.some((role) => roles.includes(role))) {
    return null;
  }

  return <>{children}</>;
};
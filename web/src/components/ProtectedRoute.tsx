import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8f9fc]">
        <Loader2 className="w-8 h-8 animate-spin text-senac-blue" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Interceta usuários que precisam trocar a senha (e garante que não vai entrar em loop)
  if (user.user_metadata?.needsPasswordChange && location.pathname !== '/update-password') {
    return <Navigate to="/update-password" replace />;
  }

  return <Outlet />;
};
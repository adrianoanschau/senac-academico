import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { alertDialog } from '../utils/dialog';

export const UserProfileMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Efeito para fechar o dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      // O componente ProtectedRoute irá redirecionar automaticamente,
      // mas podemos forçar para uma resposta de UI mais rápida.
      navigate('/login', { replace: true });
      alertDialog('Você saiu da sua conta com sucesso.');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alertDialog('Ocorreu um erro ao tentar sair. Tente novamente.');
    }
  };

  if (!user) {
    return null; // Não renderiza nada se o utilizador não estiver logado
  }

  // Função para extrair as iniciais do nome ou e-mail
  const getInitials = (name?: string, email?: string): string => {
    if (name) {
      const names = name.split(' ').filter(Boolean);
      if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    return email ? email.substring(0, 2).toUpperCase() : 'U';
  };

  const fullName = user.user_metadata?.full_name as string | undefined;
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004a8d] overflow-hidden"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar do Utilizador" className="w-full h-full object-cover" />
        ) : (
          <span>{getInitials(fullName, user.email)}</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-800 truncate" title={fullName || user.email}>
              {fullName || 'Utilizador'}
            </p>
            <p className="text-xs text-slate-500 truncate" title={user.email}>{user.email}</p>
          </div>
          <div className="p-2">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors">
              <LogOut size={16} />
              <span>Sair da Conta</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
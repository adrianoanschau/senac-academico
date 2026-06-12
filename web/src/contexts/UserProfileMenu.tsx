import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Settings } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { alertDialog } from '../utils/dialog';

export const UserProfileMenu: React.FC = () => {
  const { user, profile, signOut } = useAuth();
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
    return null; // Não renderiza nada se o usuário não estiver logado
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

  const fullName = (profile?.displayName || user.user_metadata?.full_name) as string | undefined;
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;

  const roleColors: Record<string, string> = {
    ADMIN: 'bg-rose-100 text-rose-700 border-rose-200',
    COORDINATOR: 'bg-amber-100 text-amber-700 border-amber-200',
    INSTRUCTOR: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    SECRETARY: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    MEMBER: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004a8d] overflow-hidden"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar do Usuário" className="w-full h-full object-cover" />
        ) : (
          <span>{getInitials(fullName, user.email)}</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-800 truncate" title={fullName || user.email}>
              {fullName || 'Usuário'}
            </p>
            <p className="text-xs text-slate-500 truncate" title={user.email}>{user.email}</p>
            {profile?.roles && profile.roles.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {profile.roles.map((role) => (
                  <span key={role} className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold border capitalize ${roleColors[role] || roleColors.MEMBER}`}>
                    {role.toLowerCase()}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="p-2">
            <Link to="/settings" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
              <Settings size={16} />
              <span>Configurações</span>
            </Link>
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
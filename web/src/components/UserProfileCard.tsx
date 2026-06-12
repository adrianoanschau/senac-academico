import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Settings } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { alertDialog } from '../utils/dialog';

export const UserProfileCard: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const roleColors: Record<string, string> = {
    ADMIN: 'bg-rose-100 text-rose-700 border-rose-200',
    COORDINATOR: 'bg-amber-100 text-amber-700 border-amber-200',
    INSTRUCTOR: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    SECRETARY: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    MEMBER: 'bg-slate-300 text-slate-700 border-slate-400',
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login', { replace: true });
      alertDialog('Você saiu da sua conta com sucesso.');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alertDialog('Ocorreu um erro ao tentar sair. Tente novamente.');
    }
  };

  if (!user) {
    // Este card só deve ser renderizado em rotas protegidas,
    // então o usuário nunca deve ser nulo.
    return null;
  }

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

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-2xl overflow-hidden mb-4">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar do Usuário" className="w-full h-full object-cover" />
        ) : (
          <span>{getInitials(fullName, user.email)}</span>
        )}
      </div>
      
      <h3 className="font-bold text-slate-800 text-lg truncate w-full" title={fullName || user.email}>
        {fullName || 'Usuário'}
      </h3>
      <p className="text-sm text-slate-500 truncate w-full" title={user.email}>
        {user.email}
      </p>

      {profile?.roles && profile.roles.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
          {profile.roles.map((role) => (
            <span key={role} className={`px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${roleColors[role] || roleColors.MEMBER}`}>
              {role.toLowerCase()}
            </span>
          ))}
        </div>
      )}

      <div className="w-full border-t border-slate-100 my-5"></div>

      <Link to="/settings" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
        <Settings size={16} />
        <span>Configurações</span>
      </Link>

      <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-rose-600 rounded-lg hover:bg-rose-50 transition-colors">
        <LogOut size={16} />
        <span>Sair da Conta</span>
      </button>
    </div>
  );
};
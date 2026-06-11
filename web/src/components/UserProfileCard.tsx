import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { alertDialog } from '../utils/dialog';

export const UserProfileCard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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
    // então o utilizador nunca deve ser nulo.
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

  const fullName = user.user_metadata?.full_name as string | undefined;
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  console.log({ user });

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-2xl overflow-hidden mb-4">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar do Utilizador" className="w-full h-full object-cover" />
        ) : (
          <span>{getInitials(fullName, user.email)}</span>
        )}
      </div>
      
      <h3 className="font-bold text-slate-800 text-lg truncate w-full" title={fullName || user.email}>
        {fullName || 'Utilizador'}
      </h3>
      <p className="text-sm text-slate-500 truncate w-full" title={user.email}>
        {user.email}
      </p>

      <div className="w-full border-t border-slate-100 my-5"></div>

      <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-rose-600 rounded-lg hover:bg-rose-50 transition-colors">
        <LogOut size={16} />
        <span>Sair da Conta</span>
      </button>
    </div>
  );
};
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { type User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

// 1. Definição das interfaces estritas
export type AppRole =
  | 'ADMIN'
  | 'COORDINATOR'
  | 'INSTRUCTOR'
  | 'SECRETARY'
  | 'MEMBER';

export interface UserProfile {
  id: string;
  email: string;
  role: AppRole;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // 2. Adicionar o estado `profile`
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // 3. useEffect para escutar as mudanças de autenticação
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);
      if (session) {
        setUser(session.user);
        try {
          // Busca o perfil do utilizador na tabela 'users_profiles' do Supabase.
          // Esta é uma abordagem mais segura e comum do que um endpoint customizado.
          const { data: userProfile, error } = await supabase
            .from('users_profiles')
            .select('id, email, role')
            .eq('id', session.user.id)
            .single();

          if (error) throw error;

          setProfile(userProfile);
        } catch (error) {
          console.error('Erro ao buscar o perfil do utilizador:', error);
          setProfile(null); // Limpa o perfil em caso de erro para evitar estado inconsistente
        }
      } else {
        // Se o utilizador fizer logout, limpar o user e o profile
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    profile,
    loading,
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
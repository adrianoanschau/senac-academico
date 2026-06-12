import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, loading: isAuthLoading } = useAuth();

  // Redireciona se o usuário já estiver autenticado
  useEffect(() => {
    if (!isAuthLoading && user) {
      navigate('/', { replace: true });
    }
  }, [user, isAuthLoading, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Redireciona caso seja o primeiro acesso e exija a troca da senha
      if (data.user?.user_metadata?.needsPasswordChange) {
        navigate('/update-password', { replace: true });
        return;
      }

      // O AuthProvider e o ProtectedRoute tratarão do redirecionamento.
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Falha ao fazer login. Verifique suas credenciais.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError(null);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
      setIsGoogleLoading(false);
    }
  };

  // Exibe um loader enquanto verifica a sessão para evitar "piscar" a tela de login
  if (isAuthLoading || (!isAuthLoading && user)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8f9fc]">
        <Loader2 className="w-8 h-8 animate-spin text-senac-blue" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-[#f8f9fc] font-sans">
      {/* Left side: Visual Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-senac-blue relative overflow-hidden flex-col justify-center items-center p-12 transition-colors">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-black/20 to-transparent rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-linear-to-tr from-senac-orange/30 to-transparent rounded-full blur-3xl -ml-10 -mb-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-black/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-lg">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-8 border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
             <div className="w-10 h-10 bg-senac-orange rounded-xl transform rotate-12 transition-colors"></div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Gestão Educacional<br/>com o <span className="text-senac-orange transition-colors">Senac.</span>
          </h1>
          <p className="text-xl text-blue-100 font-medium leading-relaxed">
            Acesse a plataforma para acompanhar turmas, alunos e potencializar a rotina acadêmica.
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-4xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100">
          
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Senac Logo" className="h-16 object-contain" />
          </div>
          
          <p className="text-slate-400 mb-10 text-center font-medium text-sm">Bem-vindo(a) de volta! Insira suas credenciais.</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="email">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  disabled={isSubmitting || isGoogleLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-senac-blue outline-none transition-all text-slate-800 font-medium placeholder-slate-400 disabled:opacity-50"
                  placeholder="usuario@senac.br"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-slate-700" htmlFor="password">
                  Senha
                </label>
                <Link to="/forgot-password" className="text-sm text-senac-blue hover:opacity-80 font-semibold transition-colors">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  disabled={isSubmitting || isGoogleLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-senac-blue outline-none transition-all text-slate-800 font-medium placeholder-slate-400 disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || isGoogleLoading}
              className="w-full bg-senac-orange hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-xl transition-all mt-4 flex items-center justify-center gap-2 shadow-md shadow-senac-orange/30 hover:shadow-lg hover:shadow-senac-orange/40"
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Entrar
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          
          <div className="relative flex items-center my-8">
            <div className="grow border-t border-slate-200"></div>
            <span className="shrink mx-4 text-xs font-bold text-slate-400 uppercase">Ou</span>
            <div className="grow border-t border-slate-200"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting || isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-senac-blue disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isGoogleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.6402 9.20455C17.6402 8.56648 17.5811 7.95227 17.4684 7.36364H9V10.8409H13.8443C13.6366 11.9727 13.0002 12.9375 12.0457 13.5227V15.8182H14.9561C16.6582 14.2557 17.6402 11.9318 17.6402 9.20455Z" fill="#4285F4"/>
                <path d="M9.00001 18C11.4307 18 13.4688 17.1932 14.9561 15.8182L12.0457 13.5227C11.2389 14.0818 10.2134 14.4318 9.00001 14.4318C6.60001 14.4318 4.62274 12.8409 3.96138 10.75H0.854553V13.125C2.43751 16.0966 5.48183 18 9.00001 18Z" fill="#34A853"/>
                <path d="M3.96138 10.75C3.7841 10.25 3.67728 9.71023 3.67728 9.15909C3.67728 8.60795 3.7841 8.06818 3.96138 7.56818V5.19318H0.854553C0.306826 6.22727 0 7.64205 0 9.15909C0 10.6761 0.306826 12.0909 0.854553 13.125L3.96138 10.75Z" fill="#FBBC05"/>
                <path d="M9.00001 3.88636C10.3205 3.88636 11.5079 4.34091 12.4182 5.19886L15.0273 2.58523C13.4636 1.09659 11.4261 0 9.00001 0C5.48183 0 2.43751 2.90341 0.854553 5.19318L3.96138 7.56818C4.62274 5.47727 6.60001 3.88636 9.00001 3.88636Z" fill="#EA4335"/>
              </svg>
            )}
            <span>{isGoogleLoading ? 'Aguardando...' : 'Entrar com Google'}</span>
          </button>

          <div className="mt-10 text-center text-sm font-medium text-slate-400">
            <p>Precisa de ajuda? <a href="mailto:aanschau@senacrs.com.br" className="text-senac-blue font-bold hover:underline">Contate o suporte</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

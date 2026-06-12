import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../services/supabase';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (authError) throw authError;

      setSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Falha ao processar solicitação. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#f8f9fc] font-sans">
      {/* Left side: Visual Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-senac-blue relative overflow-hidden flex-col justify-center items-center p-12 transition-colors">
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
            Recupere o acesso à plataforma para continuar gerenciando sua rotina acadêmica.
          </p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-4xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100">
          
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Senac Logo" className="h-16 object-contain" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">Recuperar Senha</h2>
          <p className="text-slate-400 mb-8 text-center font-medium text-sm">
            Informe seu e-mail para receber um link de redefinição.
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          {success ? (
            <div className="flex flex-col items-center justify-center p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
              <h3 className="text-lg font-bold text-emerald-800 mb-1">E-mail enviado!</h3>
              <p className="text-sm font-medium text-emerald-600 mb-6">
                Verifique sua caixa de entrada e clique no link para redefinir sua senha.
              </p>
              <Link to="/login" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center">
                Voltar ao login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="email">
                  E-mail Institucional
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-slate-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-senac-blue outline-none transition-all text-slate-800 font-medium placeholder-slate-400 disabled:opacity-50"
                    placeholder="usuario@senac.br"
                  />
                </div>
              </div>
              
              <button type="submit" disabled={isSubmitting} className="w-full bg-senac-blue hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-xl transition-all mt-4 flex items-center justify-center gap-2 shadow-md shadow-senac-blue/30 hover:shadow-lg hover:shadow-senac-blue/40">
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Enviar Link de Recuperação'}
              </button>

              <button type="button" onClick={() => navigate('/login')} className="w-full flex items-center justify-center gap-2 py-3.5 px-4 font-semibold text-slate-500 hover:text-slate-800 bg-transparent transition-colors">
                <ArrowLeft size={18} />
                Voltar para o login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
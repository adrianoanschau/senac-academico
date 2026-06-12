import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';

export const UpdatePassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
        data: { needsPasswordChange: false },
      });

      if (updateError) throw updateError;

      // Redireciona para o dashboard/home com sucesso
      navigate('/', { replace: true });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Falha ao atualizar a senha. Tente novamente.';
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
            Segurança da<br/>sua <span className="text-senac-orange transition-colors">Conta.</span>
          </h1>
          <p className="text-xl text-blue-100 font-medium leading-relaxed">
            Crie uma nova senha para acessar a plataforma de gestão acadêmica com segurança.
          </p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-4xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100">
          
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Senac Logo" className="h-16 object-contain" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">Atualize sua senha</h2>
          <p className="text-slate-400 mb-8 text-center font-medium text-sm">
            Insira e confirme sua nova senha de acesso.
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="newPassword">
                Nova Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input id="newPassword" type="password" required disabled={isSubmitting} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-senac-blue outline-none transition-all text-slate-800 font-medium placeholder-slate-400 disabled:opacity-50" placeholder="No mínimo 6 caracteres" minLength={6} />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="confirmPassword">
                Confirme a Nova Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input id="confirmPassword" type="password" required disabled={isSubmitting} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-senac-blue outline-none transition-all text-slate-800 font-medium placeholder-slate-400 disabled:opacity-50" placeholder="Confirme sua senha" minLength={6} />
              </div>
            </div>
            
            <button type="submit" disabled={isSubmitting} className="w-full bg-senac-orange hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-xl transition-all mt-4 flex items-center justify-center gap-2 shadow-md shadow-senac-orange/30 hover:shadow-lg hover:shadow-senac-orange/40">
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <><ArrowRight size={18} /> Confirmar Nova Senha</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
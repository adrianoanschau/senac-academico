import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen w-full bg-[#f8f9fc] font-sans">
      {/* Left side: Visual Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#004a8d] relative overflow-hidden flex-col justify-center items-center p-12">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00386b]/60 to-transparent rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#f37021]/30 to-transparent rounded-full blur-3xl -ml-10 -mb-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00386b]/40 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-lg">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-8 border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
             <div className="w-10 h-10 bg-[#f37021] rounded-xl transform rotate-12"></div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Gestão Educacional<br/>com o <span className="text-[#f37021]">Senac.</span>
          </h1>
          <p className="text-xl text-blue-100 font-medium leading-relaxed">
            Acesse a plataforma para acompanhar turmas, alunos e potencializar a rotina acadêmica.
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-[2rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100">
          
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Senac Logo" className="h-16 object-contain" />
          </div>
          
          <p className="text-slate-400 mb-10 text-center font-medium text-sm">Bem-vindo(a) de volta! Insira suas credenciais.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
                  placeholder="usuario@senac.br"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-slate-700" htmlFor="password">
                  Senha
                </label>
                <a href="#" className="text-sm text-[#004a8d] hover:text-[#00386b] font-semibold transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-[#004a8d] outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#f37021] hover:bg-[#d96017] text-white font-bold py-4 px-4 rounded-xl transition-all mt-4 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgb(243,112,33,0.3)] hover:shadow-[0_6px_20px_rgb(243,112,33,0.4)]"
            >
              Entrar
              <ArrowRight size={18} />
            </button>
          </form>
          
          <div className="mt-10 text-center text-sm font-medium text-slate-400">
            <p>Precisa de ajuda? <a href="#" className="text-[#004a8d] font-bold hover:underline">Contate o suporte</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

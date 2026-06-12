import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { UserPlus, Loader2 } from 'lucide-react';
import { CanAccess } from './CanAccess';
import { type AppRole } from '../contexts/AuthContext';
import { alertDialog } from '../utils/dialog';
import { createClient } from '@supabase/supabase-js';

interface CreateUserFormData {
  email: string;
  password: string;
  role: Extract<AppRole, 'INSTRUCTOR' | 'COORDINATOR' | 'ADMIN' | 'SECRETARY'>;
}

export const CreateUserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    defaultValues: {
      role: 'INSTRUCTOR',
    },
  });

  const onSubmit: SubmitHandler<CreateUserFormData> = async (data) => {
    try {
      // Cria um client temporário do Supabase para não sobrescrever a sessão atual (Admin)
      // IMPORTANTE: Ajuste as variáveis (VITE_...) de acordo com as utilizadas no seu projeto.
      // Se usar Create React App, substitua import.meta.env por process.env.REACT_APP_...
      const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || '';
      const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';

      const tempClient = createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: false, // <-- É isto que impede o auto-login
          autoRefreshToken: false,
        },
      });

      const { error } = await tempClient.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            role: data.role,
          },
        },
      });

      if (error) throw error;
      
      alertDialog('Utilizador criado com sucesso!');
      reset();
    } catch (error) {
      console.error('Erro ao criar utilizador:', error);
      alertDialog('Ocorreu um erro ao tentar criar o utilizador. Verifique os dados e tente novamente.');
    }
  };

  return (
    <CanAccess roles={['ADMIN']}>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <UserPlus size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Criar Novo Utilizador</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">E-mail</label>
              <input
                type="email"
                {...register('email', { required: 'O e-mail é obrigatório.' })}
                className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-slate-800 outline-none transition-all text-slate-800 placeholder-slate-400"
                placeholder="exemplo@senac.br"
              />
              {errors.email && <span className="text-sm font-semibold text-rose-500 mt-1.5 block">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Senha Temporária</label>
              <input
                type="password"
                {...register('password', {
                  required: 'A senha é obrigatória.',
                  minLength: { value: 6, message: 'A senha deve ter no mínimo 6 caracteres.' },
                })}
                className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-slate-800 outline-none transition-all text-slate-800 placeholder-slate-400"
                placeholder="••••••"
              />
              {errors.password && <span className="text-sm font-semibold text-rose-500 mt-1.5 block">{errors.password.message}</span>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Papel (Role)</label>
              <select
                {...register('role', { required: 'O papel é obrigatório.' })}
                className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-slate-800 outline-none transition-all text-slate-800 cursor-pointer"
              >
                <option value="INSTRUCTOR">Professor(a)</option>
                <option value="COORDINATOR">Coordenador(a)</option>
                <option value="ADMIN">Administrador(a)</option>
                <option value="SECRETARY">Secretário(a)</option>
              </select>
              {errors.role && <span className="text-sm font-semibold text-rose-500 mt-1.5 block">{errors.role.message}</span>}
            </div>
          </div>

          <div className="flex justify-end pt-4 mt-2 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 disabled:opacity-70 transition-all shadow-md shadow-slate-800/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Criar Utilizador'
              )}
            </button>
          </div>
        </form>
      </div>
    </CanAccess>
  );
};
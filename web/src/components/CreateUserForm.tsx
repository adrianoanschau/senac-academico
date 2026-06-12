import React from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { UserPlus, Loader2 } from 'lucide-react';
import axios from 'axios';
import { CanAccess } from './CanAccess';
import { type AppRole } from '../contexts/AuthContext';
import { alertDialog } from '../utils/dialog';
import api from '../services/api';

interface CreateUserFormData {
  email: string;
  password: string;
  displayName?: string;
  phoneNumber?: string;
  roles: Extract<AppRole, 'INSTRUCTOR' | 'COORDINATOR' | 'ADMIN' | 'SECRETARY' | 'MEMBER'>[];
}

export const CreateUserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    defaultValues: {
      roles: ['MEMBER'],
    },
  });

  const onSubmit: SubmitHandler<CreateUserFormData> = async (data) => {
    try {
      const payload = {
        ...data,
        phoneNumber: data.phoneNumber ? data.phoneNumber.replace(/\D/g, '') : undefined,
      };

      await api.post('/users', payload);
      alertDialog('Usuário criado com sucesso!');
      reset();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      if (axios.isAxiosError(error) && error.response) {
        alertDialog(error.response.data.message || 'Falha ao criar o usuário na API.');
      } else {
        alertDialog('Ocorreu um erro ao tentar criar o usuário. Verifique os dados e tente novamente.');
      }
    }
  };

  return (
    <CanAccess roles={['ADMIN']}>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <UserPlus size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Criar Novo Usuário</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nome de Exibição</label>
              <input
                type="text"
                {...register('displayName')}
                className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-slate-800 outline-none transition-all text-slate-800 placeholder-slate-400"
                placeholder="Nome do usuário"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Telefone</label>
              <input
                type="tel"
                {...register('phoneNumber', {
                  onChange: (e) => {
                    let v = e.target.value.replace(/\D/g, '');
                    if (v.length > 11) v = v.substring(0, 11);
                    if (v.length > 7) {
                      e.target.value = `(${v.substring(0, 2)}) ${v.substring(2, 4)} ${v.substring(4, 7)}-${v.substring(7)}`;
                    } else if (v.length > 4) {
                      e.target.value = `(${v.substring(0, 2)}) ${v.substring(2, 4)} ${v.substring(4)}`;
                    } else if (v.length > 2) {
                      e.target.value = `(${v.substring(0, 2)}) ${v.substring(2)}`;
                    } else if (v.length > 0) {
                      e.target.value = `(${v.substring(0)}`;
                    }
                    setValue('phoneNumber', e.target.value);
                  }
                })}
                className="w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 focus:ring-slate-800 outline-none transition-all text-slate-800 placeholder-slate-400"
                placeholder="(00) 00 000-0000"
              />
            </div>

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
              <label className="block text-sm font-bold text-slate-700 mb-2">Papéis (Roles)</label>
              <Controller
                control={control}
                name="roles"
                rules={{ required: 'Selecione pelo menos um papel.' }}
                render={({ field: { onChange, value } }) => (
                  <div className="flex flex-wrap bg-[#f8f9fc] rounded-xl p-1.5 gap-1 border border-slate-100">
                    {([
                      { value: 'INSTRUCTOR', label: 'Professor(a)' },
                      { value: 'COORDINATOR', label: 'Coordenador(a)' },
                      { value: 'ADMIN', label: 'Administrador(a)' },
                      { value: 'SECRETARY', label: 'Secretário(a)' },
                      { value: 'MEMBER', label: 'Membro(a)' },
                    ] as const).map((role) => {
                      const isSelected = value?.includes(role.value);
                      return (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => {
                            const newValue = isSelected
                              ? value.filter((v) => v !== role.value)
                              : [...(value || []), role.value];
                            onChange(newValue);
                          }}
                          className={`flex-1 min-w-30 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
                            isSelected
                              ? 'bg-slate-800 text-white shadow-md'
                              : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'
                          }`}
                        >
                          {role.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              {errors.roles && <span className="text-sm font-semibold text-rose-500 mt-1.5 block">{errors.roles.message}</span>}
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
                'Criar Usuário'
              )}
            </button>
          </div>
        </form>
      </div>
    </CanAccess>
  );
};
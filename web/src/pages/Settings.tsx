import React, { lazy, Suspense, useState } from 'react';

import axios from 'axios';
import {
  Bell,
  Moon,
  Save,
  Settings as SettingsIcon,
  Shield,
  Sun,
  User,
} from 'lucide-react';

import { CanAccess } from '../components/CanAccess';
import {
  FormField,
  FormInput,
  PageCard,
  PageHeader,
  PageLayout,
  PrimaryButton,
} from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { alertDialog } from '../utils/dialog';
import { Role } from '../utils/roles';

const CreateUserForm = lazy(() =>
  import('../components/CreateUserForm').then((m) => ({
    default: m.CreateUserForm,
  })),
);

const ACCENT = 'senac' as const;

type Tab = 'profile' | 'preferences' | 'admin';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-senac-blue focus:ring-offset-2 ${
      checked ? 'bg-slate-800' : 'bg-slate-200'
    }`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

const tabButtonClass = (active: boolean) =>
  `flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
    active
      ? 'bg-slate-800 text-white shadow-md'
      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
  }`;

export const Settings: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const [displayName, setDisplayName] = useState(
    profile?.displayName || user?.user_metadata?.displayName || '',
  );
  const [phone, setPhone] = useState(() => {
    const v = (
      profile?.phoneNumber ||
      user?.user_metadata?.phoneNumber ||
      ''
    ).replace(/\D/g, '');
    if (!v) return '';
    if (v.length > 7)
      return `(${v.substring(0, 2)}) ${v.substring(2, 4)} ${v.substring(4, 7)}-${v.substring(7)}`;
    if (v.length > 4)
      return `(${v.substring(0, 2)}) ${v.substring(2, 4)} ${v.substring(4)}`;
    if (v.length > 2) return `(${v.substring(0, 2)}) ${v.substring(2)}`;
    return `(${v.substring(0)}`;
  });
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleColors: Record<string, string> = {
    [Role.ADMIN]: 'bg-rose-100 text-rose-700 border-rose-200',
    [Role.COORDINATOR]: 'bg-amber-100 text-amber-700 border-amber-200',
    [Role.INSTRUCTOR]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    [Role.SECRETARY]: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    [Role.MEMBER]: 'bg-slate-300 text-slate-700 border-slate-400',
  };

  const getInitials = (email?: string) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        displayName,
        phoneNumber: phone ? phone.replace(/\D/g, '') : '',
      };
      await api.patch('/users/profile', payload);
      await refreshProfile();
      alertDialog('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      if (axios.isAxiosError(error) && error.response) {
        alertDialog(
          error.response.data.message || 'Falha ao atualizar o perfil.',
        );
      } else {
        alertDialog('Ocorreu um erro ao atualizar o perfil. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const greetingName = profile?.displayName || profile?.email || user?.email;

  return (
    <PageLayout>
      <PageHeader
        accent={ACCENT}
        icon={<SettingsIcon size={28} />}
        title="Configurações"
        description={`Olá, ${greetingName}! Gerencie suas preferências e acessos aqui.`}
      />

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={tabButtonClass(activeTab === 'profile')}
          >
            <User className="mr-3 h-5 w-5" />
            Meu Perfil
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preferences')}
            className={tabButtonClass(activeTab === 'preferences')}
          >
            <SettingsIcon className="mr-3 h-5 w-5" />
            Preferências
          </button>

          <CanAccess roles={[Role.ADMIN, Role.SECRETARY, Role.COORDINATOR]}>
            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={tabButtonClass(activeTab === 'admin')}
            >
              <Shield className="mr-3 h-5 w-5" />
              Administração e Acessos
            </button>
          </CanAccess>
        </aside>

        <div className="flex-1 min-h-100">
          <PageCard>
            {activeTab === 'profile' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-semibold mb-6">
                  Informações Pessoais
                </h2>
                <div className="flex items-center gap-6 mb-8">
                  <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-2xl font-bold shadow-inner">
                    {getInitials(profile?.email || user?.email)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-lg">
                      {profile?.email || user?.email}
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {profile?.roles?.length ? (
                        profile.roles.map((role) => (
                          <span
                            key={role}
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${roleColors[role] || roleColors[Role.MEMBER]}`}
                          >
                            {role.toLowerCase()}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500 font-medium">
                          N/A
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleProfileSubmit}
                  className="flex flex-col gap-5 max-w-md"
                >
                  <FormField label="E-mail">
                    <FormInput
                      accent={ACCENT}
                      type="email"
                      disabled
                      value={profile?.email || user?.email || ''}
                      className="opacity-70 cursor-not-allowed"
                    />
                  </FormField>

                  <FormField label="Nome de Exibição">
                    <FormInput
                      accent={ACCENT}
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Como prefere ser chamado"
                    />
                  </FormField>

                  <FormField label="Telefone">
                    <FormInput
                      accent={ACCENT}
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '');
                        if (v.length > 11) v = v.substring(0, 11);
                        let formatted = v;
                        if (v.length > 7) {
                          formatted = `(${v.substring(0, 2)}) ${v.substring(2, 4)} ${v.substring(4, 7)}-${v.substring(7)}`;
                        } else if (v.length > 4) {
                          formatted = `(${v.substring(0, 2)}) ${v.substring(2, 4)} ${v.substring(4)}`;
                        } else if (v.length > 2) {
                          formatted = `(${v.substring(0, 2)}) ${v.substring(2)}`;
                        } else if (v.length > 0) {
                          formatted = `(${v.substring(0)}`;
                        }
                        setPhone(formatted);
                      }}
                      placeholder="(00) 00 000-0000"
                    />
                  </FormField>

                  <PrimaryButton
                    accent={ACCENT}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-fit"
                  >
                    <Save className="h-4 w-4" />
                    {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                  </PrimaryButton>
                </form>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-semibold mb-6">
                  Preferências do Sistema
                </h2>
                <div className="space-y-6 max-w-lg">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                        <Bell className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">
                          Notificações por E-mail
                        </p>
                        <p className="text-sm text-slate-500">
                          Receber alertas e avisos na caixa de entrada.
                        </p>
                      </div>
                    </div>
                    <Toggle
                      checked={emailNotifications}
                      onChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                        {darkMode ? (
                          <Moon className="h-5 w-5" />
                        ) : (
                          <Sun className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">
                          Modo Escuro
                        </p>
                        <p className="text-sm text-slate-500">
                          Alternar aparência do sistema.
                        </p>
                      </div>
                    </div>
                    <Toggle checked={darkMode} onChange={setDarkMode} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'admin' && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">
                    Administração e Acessos
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Gestão de usuários, papéis e permissões globais do sistema.
                  </p>
                </div>

                <Suspense
                  fallback={
                    <div className="h-64 flex items-center justify-center text-slate-500 font-medium">
                      Carregando formulário...
                    </div>
                  }
                >
                  <CreateUserForm />
                </Suspense>

                <div className="mt-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center h-64 text-slate-400">
                  <Shield className="h-12 w-12 mb-4 text-slate-300" />
                  <p className="font-medium">
                    Tabela de Gestão de Usuários e Papéis
                  </p>
                  <p className="text-sm mt-1">
                    Funcionalidade em desenvolvimento...
                  </p>
                </div>
              </div>
            )}
          </PageCard>
        </div>
      </div>
    </PageLayout>
  );
};

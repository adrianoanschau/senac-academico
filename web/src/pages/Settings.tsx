import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CanAccess } from '../components/CanAccess';
import { User, Settings as SettingsIcon, Shield, Save, Bell, Moon, Sun } from 'lucide-react';
import { CreateUserForm } from '../components/CreateUserForm';

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
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 ${
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

export const Settings: React.FC = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  // Estados dos formulários (simulados)
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const getInitials = (email?: string) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para salvar as informações de perfil iria aqui
  };

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Cabeçalho da Página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Configurações</h1>
        <p className="text-slate-500 mt-1">
          Olá, {profile?.email || user?.email}! Gira as tuas preferências e acessos aqui.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Menu Lateral de Navegação (Sidebar) */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
              activeTab === 'profile'
                ? 'bg-slate-800 text-white shadow-md'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <User className="mr-3 h-5 w-5" />
            Meu Perfil
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
              activeTab === 'preferences'
                ? 'bg-slate-800 text-white shadow-md'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <SettingsIcon className="mr-3 h-5 w-5" />
            Preferências
          </button>

          {/* Renderização condicional protegida por RBAC */}
          <CanAccess roles={['ADMIN', 'COORDINATOR']}>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeTab === 'admin'
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Shield className="mr-3 h-5 w-5" />
              Administração e Acessos
            </button>
          </CanAccess>
        </aside>

        {/* Área Principal de Conteúdo */}
        <main className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[400px]">
          
          {activeTab === 'profile' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xl font-semibold mb-6">Informações Pessoais</h2>
              <div className="flex items-center gap-6 mb-8">
                <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-2xl font-bold shadow-inner">
                  {getInitials(profile?.email || user?.email)}
                </div>
                <div>
                  <p className="font-medium text-slate-800 text-lg">{profile?.email || user?.email}</p>
                  <p className="text-sm text-slate-500 capitalize">Perfil: {profile?.role?.toLowerCase() || 'N/A'}</p>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-5 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    disabled
                    value={profile?.email || user?.email || ''}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome de Exibição</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Como prefere ser chamado"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 flex items-center justify-center px-6 py-2.5 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Alterações
                </button>
              </form>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xl font-semibold mb-6">Preferências do Sistema</h2>
              <div className="space-y-6 max-w-lg">
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Notificações por E-mail</p>
                      <p className="text-sm text-slate-500">Receber alertas e avisos na caixa de entrada.</p>
                    </div>
                  </div>
                  <Toggle checked={emailNotifications} onChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                      {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Modo Escuro</p>
                      <p className="text-sm text-slate-500">Alternar aparência do sistema.</p>
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
                <h2 className="text-xl font-semibold text-slate-800">Administração e Acessos</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Gestão de utilizadores, papéis e permissões globais do sistema.
                </p>
              </div>
              
              {/* Formulário de criação de utilizadores (Visível apenas para ADMIN) */}
              <CreateUserForm />

              {/* Placeholder da Tabela */}
              <div className="border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center h-64 text-slate-400">
                <Shield className="h-12 w-12 mb-4 text-slate-300" />
                <p className="font-medium">Tabela de Gestão de Utilizadores e Papéis</p>
                <p className="text-sm mt-1">Funcionalidade em desenvolvimento...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
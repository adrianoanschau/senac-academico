import React, { useState, lazy, Suspense } from "react";
import axios from "axios";
import {
  User,
  Settings as SettingsIcon,
  Shield,
  Save,
  Bell,
  Moon,
  Sun,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { CanAccess } from "../components/CanAccess";
import api from "../services/api";
import { alertDialog } from "../utils/dialog";

const CreateUserForm = lazy(() =>
  import("../components/CreateUserForm").then((m) => ({
    default: m.CreateUserForm,
  })),
);

type Tab = "profile" | "preferences" | "admin";

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
      checked ? "bg-slate-800" : "bg-slate-200"
    }`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

export const Settings: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Estados dos formulários (simulados)
  const [displayName, setDisplayName] = useState(
    profile?.displayName || user?.user_metadata?.displayName || "",
  );
  const [phone, setPhone] = useState(() => {
    const v = (
      profile?.phoneNumber ||
      user?.user_metadata?.phoneNumber ||
      ""
    ).replace(/\D/g, "");
    if (!v) return "";
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
    ADMIN: "bg-rose-100 text-rose-700 border-rose-200",
    COORDINATOR: "bg-amber-100 text-amber-700 border-amber-200",
    INSTRUCTOR: "bg-emerald-100 text-emerald-700 border-emerald-200",
    SECRETARY: "bg-indigo-100 text-indigo-700 border-indigo-200",
    MEMBER: "bg-slate-300 text-slate-700 border-slate-400",
  };

  const getInitials = (email?: string) => {
    if (!email) return "U";
    return email.substring(0, 2).toUpperCase();
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        displayName: displayName,
        phoneNumber: phone ? phone.replace(/\D/g, "") : "",
      };
      await api.patch("/users/profile", payload);
      await refreshProfile();
      alertDialog("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      if (axios.isAxiosError(error) && error.response) {
        alertDialog(
          error.response.data.message || "Falha ao atualizar o perfil.",
        );
      } else {
        alertDialog("Ocorreu um erro ao atualizar o perfil. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Cabeçalho da Página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Configurações</h1>
        <p className="text-slate-500 mt-1">
          Olá, {profile?.displayName || profile?.email || user?.email}! Gerencie
          suas preferências e acessos aqui.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Menu Lateral de Navegação (Sidebar) */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
              activeTab === "profile"
                ? "bg-slate-800 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <User className="mr-3 h-5 w-5" />
            Meu Perfil
          </button>

          <button
            onClick={() => setActiveTab("preferences")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
              activeTab === "preferences"
                ? "bg-slate-800 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <SettingsIcon className="mr-3 h-5 w-5" />
            Preferências
          </button>

          {/* Renderização condicional protegida por RBAC */}
          <CanAccess roles={["ADMIN", "COORDINATOR"]}>
            <button
              onClick={() => setActiveTab("admin")}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeTab === "admin"
                  ? "bg-slate-800 text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Shield className="mr-3 h-5 w-5" />
              Administração e Acessos
            </button>
          </CanAccess>
        </aside>

        {/* Área Principal de Conteúdo */}
        <main className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-100">
          {activeTab === "profile" && (
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
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${roleColors[role] || roleColors.MEMBER}`}
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
                className="space-y-5 max-w-md"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    disabled
                    value={profile?.email || user?.email || ""}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nome de Exibição
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Como prefere ser chamado"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "");
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
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 flex items-center justify-center px-6 py-2.5 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 disabled:opacity-70 transition-colors"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "preferences" && (
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
                      <p className="font-medium text-slate-800">Modo Escuro</p>
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

          {activeTab === "admin" && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-800">
                  Administração e Acessos
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Gestão de usuários, papéis e permissões globais do sistema.
                </p>
              </div>

              {/* Formulário de criação de usuários (Visível apenas para ADMIN) */}
              <Suspense
                fallback={
                  <div className="h-64 flex items-center justify-center text-slate-500 font-medium">
                    Carregando formulário...
                  </div>
                }
              >
                <CreateUserForm />
              </Suspense>

              {/* Placeholder da Tabela */}
              <div className="border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center h-64 text-slate-400">
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
        </main>
      </div>
    </div>
  );
};

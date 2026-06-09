import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutGrid, Folder, Settings, MessageSquare, LogOut, Bell, GraduationCap, Users, MapPin, CalendarDays, BookOpen, Layers, Library, CalendarClock } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  activeClass: string;
  inactiveClass: string;
  end?: boolean;
}

const NAV_ITEMS: NavItemProps[] = [
  { to: '/', label: 'Dashboard', icon: LayoutGrid, activeClass: 'bg-slate-800 text-white shadow-md shadow-slate-800/30', inactiveClass: 'text-slate-400 hover:text-slate-800 hover:bg-slate-800/10', end: true },
  { to: '/schedule', label: 'Cronograma', icon: CalendarClock, activeClass: 'bg-senac-blue text-white shadow-md shadow-senac-blue/30', inactiveClass: 'text-slate-300 hover:text-senac-blue hover:bg-senac-blue/10' },
  { to: '/class-groups', label: 'Turmas', icon: Layers, activeClass: 'bg-menu-turmas text-white shadow-md shadow-menu-turmas/30', inactiveClass: 'text-slate-300 hover:text-menu-turmas hover:bg-menu-turmas/10' },
  { to: '/courses', label: 'Cursos', icon: GraduationCap, activeClass: 'bg-menu-cursos text-white shadow-md shadow-menu-cursos/30', inactiveClass: 'text-slate-300 hover:text-menu-cursos hover:bg-menu-cursos/10' },
  { to: '/subjects', label: 'Unidades Curriculares', icon: BookOpen, activeClass: 'bg-menu-uc text-white shadow-md shadow-menu-uc/30', inactiveClass: 'text-slate-300 hover:text-menu-uc hover:bg-menu-uc/10' },
  { to: '/curriculums', label: 'Matriz Curricular', icon: Library, activeClass: 'bg-menu-matriz text-white shadow-md shadow-menu-matriz/30', inactiveClass: 'text-slate-300 hover:text-menu-matriz hover:bg-menu-matriz/10' },
  { to: '/professors', label: 'Professores', icon: Users, activeClass: 'bg-menu-professores text-white shadow-md shadow-menu-professores/30', inactiveClass: 'text-slate-300 hover:text-menu-professores hover:bg-menu-professores/10' },
  { to: '/rooms', label: 'Salas e Ambientes', icon: MapPin, activeClass: 'bg-menu-salas text-white shadow-md shadow-menu-salas/30', inactiveClass: 'text-slate-300 hover:text-menu-salas hover:bg-menu-salas/10' },
  { to: '/calendar-reserves', label: 'Períodos Especiais', icon: CalendarDays, activeClass: 'bg-menu-especiais text-white shadow-md shadow-menu-especiais/30', inactiveClass: 'text-slate-300 hover:text-menu-especiais hover:bg-menu-especiais/10' },
];

const BOTTOM_NAV_ITEMS: NavItemProps[] = [
  { to: '/students', label: 'Alunos', icon: Folder, activeClass: 'bg-senac-blue text-white shadow-md shadow-senac-blue/30', inactiveClass: 'text-slate-300 hover:text-senac-blue hover:bg-senac-blue/10' },
  { to: '/profile', label: 'Configurações e Perfil', icon: Settings, activeClass: 'bg-senac-blue text-white shadow-md shadow-senac-blue/30', inactiveClass: 'text-slate-300 hover:text-senac-blue hover:bg-senac-blue/10' },
];

const SidebarItem = ({ to, icon: Icon, label, activeClass, inactiveClass, end }: NavItemProps) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `group relative flex justify-center items-center h-12 w-12 rounded-2xl mx-auto transition-all duration-200 ${
        isActive ? activeClass : inactiveClass
      }`
    }
  >
    <Icon size={24} />
    <div className="absolute left-full ml-3 px-3 py-2 bg-white text-slate-700 text-sm font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 delay-150 group-hover:delay-0 whitespace-nowrap shadow-lg border border-slate-100 z-50 pointer-events-none flex items-center">
      {label}
    </div>
  </NavLink>
);

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans text-slate-800 overflow-hidden">
      <aside className="w-24 bg-white flex flex-col items-center py-8 shrink-0 shadow-[4px_0_24px_rgb(0,0,0,0.02)] z-20 overflow-visible">
        <div className="mb-12 shrink-0">
          <div className="w-12 h-12 flex items-center justify-center">
            <img src="/logo.png" alt="Senac" className="w-full h-full object-contain" />
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-6 w-full px-6 shrink-0">
          {NAV_ITEMS.map((item) => (
            <SidebarItem key={item.to} {...item} />
          ))}
          
          <div className="w-full border-t border-slate-100 my-2 shrink-0"></div>
          
          {BOTTOM_NAV_ITEMS.map((item) => (
            <SidebarItem key={item.to} {...item} />
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="group relative flex items-center justify-center h-12 w-12 rounded-2xl text-slate-300 hover:text-menu-especiais hover:bg-menu-especiais/10 transition-colors mt-8 shrink-0"
        >
          <LogOut size={24} />
          <div className="absolute left-full ml-3 px-3 py-2 bg-white text-slate-700 text-sm font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 delay-150 group-hover:delay-0 whitespace-nowrap shadow-lg border border-slate-100 z-50 pointer-events-none flex items-center">
            Sair
          </div>
        </button>
      </aside>

      <main className="flex-1 overflow-x-hidden overflow-y-auto px-10 py-8 bg-neutral-200">
        <Outlet />
      </main>

      <aside className="w-96 bg-white shrink-0 overflow-y-auto shadow-[-4px_0_24px_rgb(0,0,0,0.02)] z-10 hidden xl:block">
        <div className="p-8">
          <div className="flex justify-between items-center mb-10 text-sm font-semibold">
            <span className="text-slate-800 border-b-2 border-slate-800 pb-1 cursor-pointer">Perfil</span>
            <span className="text-slate-400 hover:text-slate-600 cursor-pointer pb-1">Ajuda e Dicas</span>
            <span className="text-slate-400 hover:text-slate-600 cursor-pointer pb-1">Avisos</span>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="relative cursor-pointer">
              <Bell size={24} className="text-slate-400" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-menu-especiais rounded-full border-2 border-white transition-colors"></div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-senac-orange to-senac-orange mb-3 transition-colors">
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-senac-blue text-white flex items-center justify-center font-bold text-xl transition-colors">
                  AD
                </div>
              </div>
              <h2 className="text-lg font-bold text-slate-800">Administrador</h2>
              <p className="text-sm text-slate-400 font-medium">Gestão Acadêmica</p>
            </div>

            <div className="cursor-pointer">
              <MessageSquare size={24} className="text-slate-400" />
            </div>
          </div>

          <hr className="border-slate-100 mb-8" />

          {/* Container "alvo" para as páginas renderizarem seus painéis contextuais */}
          <div id="context-panel-root"></div>
          
        </div>
      </aside>
    </div>
  );
};

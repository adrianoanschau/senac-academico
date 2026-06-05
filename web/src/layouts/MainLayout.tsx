import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutGrid, Folder, Settings, MessageSquare, LogOut, Bell, Search, GraduationCap, Users, MapPin, CalendarDays, BookOpen, Layers, Network, CalendarClock } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  activeClass: string;
  end?: boolean;
}

const NAV_ITEMS: NavItemProps[] = [
  { to: '/', label: 'Dashboard', icon: LayoutGrid, activeClass: 'bg-blue-50 text-[#004a8d]', end: true },
  { to: '/turmas', label: 'Turmas', icon: Layers, activeClass: 'bg-emerald-50 text-emerald-600' },
  { to: '/cronograma', label: 'Cronograma', icon: CalendarClock, activeClass: 'bg-blue-50 text-[#004a8d]' },
  { to: '/cursos', label: 'Cursos', icon: GraduationCap, activeClass: 'bg-blue-50 text-[#004a8d]' },
  { to: '/disciplinas', label: 'Unidades Curriculares', icon: BookOpen, activeClass: 'bg-indigo-50 text-indigo-500' },
  { to: '/matriz-curricular', label: 'Matriz Curricular', icon: Network, activeClass: 'bg-purple-50 text-purple-600' },
  { to: '/professores', label: 'Professores', icon: Users, activeClass: 'bg-blue-50 text-[#004a8d]' },
  { to: '/salas', label: 'Salas e Ambientes', icon: MapPin, activeClass: 'bg-orange-50 text-[#f37021]' },
  { to: '/feriados', label: 'Calendário Base', icon: CalendarDays, activeClass: 'bg-rose-50 text-rose-500' },
];

const BOTTOM_NAV_ITEMS: NavItemProps[] = [
  { to: '/alunos', label: 'Alunos', icon: Folder, activeClass: 'bg-blue-50 text-[#004a8d]' },
  { to: '/perfil', label: 'Configurações e Perfil', icon: Settings, activeClass: 'bg-blue-50 text-[#004a8d]' },
];

const SidebarItem = ({ to, icon: Icon, label, activeClass, end }: NavItemProps) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `group relative flex justify-center items-center h-12 w-12 rounded-2xl mx-auto transition-colors ${
        isActive ? activeClass : 'text-slate-300 hover:text-slate-500 hover:bg-slate-50'
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
          className="group relative flex items-center justify-center h-12 w-12 rounded-2xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors mt-8 shrink-0"
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
            <span className="text-slate-400 hover:text-slate-600 cursor-pointer pb-1">Histórico</span>
            <span className="text-slate-400 hover:text-slate-600 cursor-pointer pb-1">Turmas</span>
            <span className="text-slate-400 hover:text-slate-600 cursor-pointer pb-1">Estatísticas</span>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="relative cursor-pointer">
              <Bell size={24} className="text-slate-400" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#f37021] to-[#f37021] mb-3">
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-[#004a8d] text-white flex items-center justify-center font-bold text-xl">
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

          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Search size={18} className="text-slate-400" />
                <h3>Cursos em Andamento</h3>
              </div>
              <a href="#" className="text-sm text-[#f37021] font-semibold">Ver todos</a>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-[#004a8d] rounded-[1.5rem] p-5 text-white shadow-[0_8px_20px_rgb(0,74,141,0.3)]">
                <h4 className="font-bold mb-1 line-clamp-1">Téc. em TI</h4>
                <p className="text-xs text-blue-200 mb-6">Módulo 2</p>
                <div className="w-full bg-[#00386b] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#f37021] w-[68%] h-full rounded-full"></div>
                </div>
                <div className="text-xs font-bold mt-2 text-right">68%</div>
              </div>
              <div className="flex-1 bg-slate-50 rounded-[1.5rem] p-5 border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-1 line-clamp-1">Design</h4>
                <p className="text-xs text-slate-400 mb-6">Módulo 1</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#004a8d] w-[27%] h-full rounded-full"></div>
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2 text-right">27%</div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-slate-800 font-bold">Últimas Matrículas</h3>
              <a href="#" className="text-sm text-[#f37021] font-semibold">Ver todas</a>
            </div>
            
            <div className="flex flex-col gap-4">
              {[
                { name: 'João Silva', course: 'Tecnologia da Informação', init: 'JS' },
                { name: 'Maria Souza', course: 'Design Gráfico', init: 'MS' },
                { name: 'Carlos Santos', course: 'Administração', init: 'CS' }
              ].map((student, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                      {student.init}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{student.name}</p>
                      <p className="text-xs text-slate-400">{student.course}</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[#004a8d] hover:bg-slate-100 transition-colors">
                    <MessageSquare size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </aside>
    </div>
  );
};

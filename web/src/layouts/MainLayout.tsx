import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutGrid, Folder, Settings, MessageSquare, LogOut, Bell, Search, GraduationCap, Users, MapPin, CalendarDays, BookOpen, Layers, Network, CalendarClock } from 'lucide-react';

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans text-slate-800 overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-24 bg-white flex flex-col items-center py-8 shrink-0 shadow-[4px_0_24px_rgb(0,0,0,0.02)] z-10 overflow-y-auto">
        <div className="mb-12 shrink-0">
          {/* Logo Senac minimized / Icon format */}
          <div className="w-12 h-12 flex items-center justify-center">
            <img src="/logo.png" alt="Senac" className="w-full h-full object-contain" />
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-6 w-full px-6 shrink-0">
          <NavLink
            to="/"
            end
            title="Dashboard"
            className={({ isActive }) =>
              `flex justify-center items-center h-12 w-12 rounded-2xl mx-auto transition-colors ${
                isActive ? 'bg-blue-50 text-[#004a8d]' : 'text-slate-300 hover:text-slate-500'
              }`
            }
          >
            <LayoutGrid size={24} />
          </NavLink>
          <NavLink
            to="/cursos"
            title="Cursos"
            className={({ isActive }) =>
              `flex justify-center items-center h-12 w-12 rounded-2xl mx-auto transition-colors ${
                isActive ? 'bg-blue-50 text-[#004a8d]' : 'text-slate-300 hover:text-slate-500'
              }`
            }
          >
            <GraduationCap size={24} />
          </NavLink>
          <NavLink
            to="/professores"
            title="Professores"
            className={({ isActive }) =>
              `flex justify-center items-center h-12 w-12 rounded-2xl mx-auto transition-colors ${
                isActive ? 'bg-blue-50 text-[#004a8d]' : 'text-slate-300 hover:text-slate-500'
              }`
            }
          >
            <Users size={24} />
          </NavLink>
          <NavLink
            to="/salas"
            title="Salas e Ambientes"
            className={({ isActive }) =>
              `flex justify-center items-center h-12 w-12 rounded-2xl mx-auto transition-colors ${
                isActive ? 'bg-orange-50 text-[#f37021]' : 'text-slate-300 hover:text-slate-500'
              }`
            }
          >
            <MapPin size={24} />
          </NavLink>
          <NavLink
            to="/disciplinas"
            title="Unidades Curriculares"
            className={({ isActive }) =>
              `flex justify-center items-center h-12 w-12 rounded-2xl mx-auto transition-colors ${
                isActive ? 'bg-indigo-50 text-indigo-500' : 'text-slate-300 hover:text-slate-500'
              }`
            }
          >
            <BookOpen size={24} />
          </NavLink>
          <NavLink
            to="/turmas"
            title="Turmas"
            className={({ isActive }) =>
              `flex justify-center items-center h-12 w-12 rounded-2xl mx-auto transition-colors ${
                isActive ? 'bg-emerald-50 text-emerald-600' : 'text-slate-300 hover:text-slate-500'
              }`
            }
          >
            <Layers size={24} />
          </NavLink>
          <NavLink
            to="/aulas"
            title="Aulas e Encontros"
            className={({ isActive }) =>
              `flex justify-center items-center h-12 w-12 rounded-2xl mx-auto transition-colors ${
                isActive ? 'bg-blue-50 text-[#004a8d]' : 'text-slate-300 hover:text-slate-500'
              }`
            }
          >
            <CalendarClock size={24} />
          </NavLink>
          <NavLink
            to="/matriz-curricular"
            title="Matriz Curricular"
            className={({ isActive }) =>
              `flex justify-center items-center h-12 w-12 rounded-2xl mx-auto transition-colors ${
                isActive ? 'bg-purple-50 text-purple-600' : 'text-slate-300 hover:text-slate-500'
              }`
            }
          >
            <Network size={24} />
          </NavLink>
          <NavLink
            to="/feriados"
            title="Calendário Base"
            className={({ isActive }) =>
              `flex justify-center items-center h-12 w-12 rounded-2xl mx-auto transition-colors ${
                isActive ? 'bg-rose-50 text-rose-500' : 'text-slate-300 hover:text-slate-500'
              }`
            }
          >
            <CalendarDays size={24} />
          </NavLink>
          
          <div className="w-full border-t border-slate-100 my-2 shrink-0"></div>
          
          <NavLink
            to="/alunos"
            title="Alunos"
            className={({ isActive }) =>
              `flex justify-center items-center h-12 w-12 rounded-2xl mx-auto transition-colors ${
                isActive ? 'bg-blue-50 text-[#004a8d]' : 'text-slate-300 hover:text-slate-500'
              }`
            }
          >
            <Folder size={24} />
          </NavLink>
          <NavLink
            to="/perfil"
            title="Configurações e Perfil"
            className={({ isActive }) =>
              `flex justify-center items-center h-12 w-12 rounded-2xl mx-auto transition-colors ${
                isActive ? 'bg-blue-50 text-[#004a8d]' : 'text-slate-300 hover:text-slate-500'
              }`
            }
          >
            <Settings size={24} />
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          title="Sair"
          className="text-slate-300 hover:text-rose-500 transition-colors mt-8 shrink-0"
        >
          <LogOut size={24} />
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto px-10 py-8 bg-neutral-200">
        <Outlet />
      </main>

      {/* Right Sidebar (Profile & Widgets) */}
      <aside className="w-96 bg-white shrink-0 overflow-y-auto shadow-[-4px_0_24px_rgb(0,0,0,0.02)] z-10 hidden xl:block">
        <div className="p-8">
          {/* Top Tabs */}
          <div className="flex justify-between items-center mb-10 text-sm font-semibold">
            <span className="text-slate-800 border-b-2 border-slate-800 pb-1 cursor-pointer">Perfil</span>
            <span className="text-slate-400 hover:text-slate-600 cursor-pointer pb-1">Histórico</span>
            <span className="text-slate-400 hover:text-slate-600 cursor-pointer pb-1">Turmas</span>
            <span className="text-slate-400 hover:text-slate-600 cursor-pointer pb-1">Estatísticas</span>
          </div>

          {/* Profile Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative cursor-pointer">
              <Bell size={24} className="text-slate-400" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></div>
            </div>
            
            <div className="flex flex-col items-center">
              {/* Avatar with Senac orange progress ring */}
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

          {/* Current Courses / Projects */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Search size={18} className="text-slate-400" />
                <h3>Cursos em Andamento</h3>
              </div>
              <a href="#" className="text-sm text-[#f37021] font-semibold">Ver todos</a>
            </div>

            <div className="flex gap-4">
              {/* Dark Card - Senac Blue */}
              <div className="flex-1 bg-[#004a8d] rounded-[1.5rem] p-5 text-white shadow-[0_8px_20px_rgb(0,74,141,0.3)]">
                <h4 className="font-bold mb-1 line-clamp-1">Téc. em TI</h4>
                <p className="text-xs text-blue-200 mb-6">Módulo 2</p>
                <div className="w-full bg-[#00386b] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#f37021] w-[68%] h-full rounded-full"></div>
                </div>
                <div className="text-xs font-bold mt-2 text-right">68%</div>
              </div>
              {/* Light Card */}
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

          {/* Last Enrolled / Clients */}
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

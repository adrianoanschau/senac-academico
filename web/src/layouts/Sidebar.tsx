import React, { useState, useRef, useLayoutEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  Folder,
  Settings,
  LogOut,
  MoreHorizontal,
  GraduationCap,
  Users,
  MapPin,
  CalendarDays,
  BookOpen,
  Layers,
  Library,
  CalendarClock,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { alertDialog } from '../utils/dialog';

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
  { to: '/settings', label: 'Configurações', icon: Settings, activeClass: 'bg-senac-blue text-white shadow-md shadow-senac-blue/30', inactiveClass: 'text-slate-300 hover:text-senac-blue hover:bg-senac-blue/10' },
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

const MoreDropdown: React.FC<{ items: NavItemProps[] }> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group relative flex justify-center items-center h-12 w-12 rounded-2xl mx-auto transition-all duration-200 ${
          isOpen ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-800/10'
        }`}
      >
        <MoreHorizontal size={24} />
        <div className="absolute left-full ml-3 px-3 py-2 bg-white text-slate-700 text-sm font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 delay-150 group-hover:delay-0 whitespace-nowrap shadow-lg border border-slate-100 z-50 pointer-events-none flex items-center">
          Mais
        </div>
      </button>
      {isOpen && (
        <div className="absolute left-full bottom-0 ml-3 p-2 bg-white rounded-xl shadow-lg border border-slate-100 z-50 flex flex-col gap-2">
          {items.map((item) => <SidebarItem key={item.to} {...item} />)}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const navRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<NavItemProps[]>(NAV_ITEMS);
  const [hiddenItems, setHiddenItems] = useState<NavItemProps[]>([]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login', { replace: true });
      alertDialog('Você saiu da sua conta com sucesso.');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alertDialog('Ocorreu um erro ao tentar sair. Tente novamente.');
    }
  };

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const observer = new ResizeObserver(([entry]) => {
      const navHeight = entry.contentRect.height;
      const itemTotalHeight = 48 + 24; // h-12 (48px) + gap-6 (24px)
      const maxItems = Math.floor(navHeight / itemTotalHeight);

      if (NAV_ITEMS.length > maxItems && maxItems > 0) {
        const numVisible = maxItems - 1; // Leave space for the "more" button
        setVisibleItems(NAV_ITEMS.slice(0, numVisible));
        setHiddenItems(NAV_ITEMS.slice(numVisible));
      } else {
        setVisibleItems(NAV_ITEMS);
        setHiddenItems([]);
      }
    });

    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="w-24 bg-white flex flex-col items-center h-screen shrink-0 shadow-[4px_0_24px_rgb(0,0,0,0.02)] z-20 overflow-visible">
      <div className="py-8 shrink-0">
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="/logo.png" alt="Senac" className="w-full h-full object-contain" />
        </div>
      </div>

      <nav ref={navRef} className="flex-1 flex flex-col gap-6 w-full px-6 py-4">
        {visibleItems.map((item) => <SidebarItem key={item.to} {...item} />)}
        {hiddenItems.length > 0 && <MoreDropdown items={hiddenItems} />}
      </nav>

      <div className="shrink-0 flex flex-col items-center gap-6 w-full px-6 pb-8 pt-4">
        <div className="w-full border-t border-slate-100"></div>
        {BOTTOM_NAV_ITEMS.map((item) => <SidebarItem key={item.to} {...item} />)}
        <button onClick={handleLogout} className="group relative flex items-center justify-center h-12 w-12 rounded-2xl text-slate-300 hover:text-menu-especiais hover:bg-menu-especiais/10 transition-colors mx-auto">
          <LogOut size={24} />
          <div className="absolute left-full ml-3 px-3 py-2 bg-white text-slate-700 text-sm font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 delay-150 group-hover:delay-0 whitespace-nowrap shadow-lg border border-slate-100 z-50 pointer-events-none flex items-center">Sair</div>
        </button>
      </div>
    </aside>
  );
};
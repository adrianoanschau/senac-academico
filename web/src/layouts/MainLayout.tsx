import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserProfileCard } from '../components/UserProfileCard';
import { Sidebar } from './Sidebar';

export const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans text-slate-800 overflow-hidden">
      <Sidebar />

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

          <UserProfileCard />

          <hr className="border-slate-100 mb-8" />

          {/* Container "alvo" para as páginas renderizarem seus painéis contextuais */}
          <div id="context-panel-root"></div>
          
        </div>
      </aside>
    </div>
  );
};

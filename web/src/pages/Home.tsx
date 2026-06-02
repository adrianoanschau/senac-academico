import React from 'react';
import { Calendar, Search, MessageSquare } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Painel Geral</h1>
        <div className="flex items-center gap-2 text-slate-500 bg-white px-4 py-2 rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <span className="font-medium text-sm">02 Jun 2026</span>
          <Calendar size={18} className="text-[#f37021]" />
        </div>
      </div>

      {/* Hero Banner - Senac Blue */}
      <div className="bg-[#004a8d] rounded-[2rem] p-10 flex items-center justify-between mb-8 shadow-[0_10px_30px_rgb(0,74,141,0.2)] relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl font-bold text-white mb-4">Bem-vindo(a)!</h2>
          <p className="text-blue-100 leading-relaxed text-lg">
            A meta de retenção de alunos está <strong className="text-white">75%</strong> concluída nesta semana! Continue acompanhando para melhorar os resultados.
          </p>
        </div>
        {/* Placeholder Illustration / Icon */}
        <div className="hidden md:block relative z-10 mr-10">
           <div className="w-32 h-32 bg-[#00386b] rounded-full flex items-center justify-center opacity-80 shadow-inner">
              <MessageSquare size={48} className="text-[#f37021] opacity-90" />
           </div>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00386b]/80 to-transparent rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-40 w-40 h-40 bg-gradient-to-tr from-[#f37021]/30 to-transparent rounded-full blur-2xl -mb-10"></div>
      </div>

      {/* Main Chart (Line Chart Placeholder) */}
      <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] mb-8">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Evolução de Matrículas</h3>
          </div>
          <div className="flex flex-col items-end gap-3">
             <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                <span>01 Mai - 31 Mai</span>
                <Calendar size={16} className="text-slate-400" />
             </div>
             <div className="flex items-center gap-6 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#004a8d]"></div>
                  <span className="text-slate-800">Mês Atual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f37021]"></div>
                  <span className="text-slate-400">Mês Anterior</span>
                </div>
             </div>
          </div>
        </div>

        {/* Chart Graphic Placeholder using SVG */}
        <div className="w-full h-64 relative">
          {/* Y Axis Labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-400 font-medium">
            <span>500</span>
            <span>400</span>
            <span>300</span>
            <span>200</span>
            <span>100</span>
            <span>0</span>
          </div>
          
          {/* Grid Lines */}
          <div className="absolute left-10 right-0 top-0 h-full flex flex-col justify-between">
            <div className="border-t border-slate-100 w-full"></div>
            <div className="border-t border-slate-100 w-full"></div>
            <div className="border-t border-slate-100 w-full"></div>
            <div className="border-t border-slate-100 w-full"></div>
            <div className="border-t border-slate-100 w-full"></div>
            <div className="border-t border-slate-100 w-full"></div>
          </div>

          {/* SVG Curves Placeholder */}
          <svg className="absolute left-10 right-0 top-0 h-full w-[calc(100%-2.5rem)]" preserveAspectRatio="none" viewBox="0 0 100 100">
            {/* Previous Month - Orange Curve */}
            <path d="M0,80 C20,80 30,50 50,60 C70,70 80,30 100,40" fill="none" stroke="#f37021" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Current Month - Blue Curve */}
            <path d="M0,90 C15,90 25,60 40,40 C55,20 70,30 85,15 C90,10 95,15 100,20" fill="none" stroke="#004a8d" strokeWidth="3" />
            
            {/* Fill under Blue Curve */}
            <path d="M0,90 C15,90 25,60 40,40 C55,20 70,30 85,15 C90,10 95,15 100,20 L100,100 L0,100 Z" fill="url(#blue-gradient)" opacity="0.1" />

            <defs>
              <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#004a8d" stopOpacity="1" />
                <stop offset="100%" stopColor="#004a8d" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* X Axis Labels */}
          <div className="absolute left-10 right-0 -bottom-6 flex justify-between text-xs text-slate-400 font-medium">
            <span>Sem 1</span>
            <span>Sem 2</span>
            <span>Sem 3</span>
            <span>Sem 4</span>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        
        {/* Donut Chart */}
        <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-800">Cursos mais Procurados</h3>
            <Search size={18} className="text-slate-400" />
          </div>
          
          <div className="flex items-center gap-8 flex-1">
            <div className="relative w-36 h-36 shrink-0">
               <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                 {/* Light Blue / Gray */}
                 <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="50 100" />
                 {/* Blue */}
                 <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#004a8d" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-50" />
                 {/* Orange */}
                 <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f37021" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="-80" />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center flex-col">
                 <span className="text-2xl font-bold text-slate-800">45%</span>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 flex-1 text-sm font-semibold text-slate-800">
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#004a8d]"></div>
                 T.I.
               </div>
               <div className="text-right">45%</div>
               
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#f37021]"></div>
                 Design
               </div>
               <div className="text-right">25%</div>

               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                 Gastronomia
               </div>
               <div className="text-right">30%</div>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-800">Tarefas Administrativas</h3>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-semibold mb-8">
             <div className="flex items-center gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-[#004a8d]"></div>
               <span className="text-slate-800">Concluídas</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
               <span className="text-slate-400">Em andamento</span>
             </div>
          </div>
          
          {/* Simple Bar Chart SVG */}
          <div className="w-full h-32 flex items-end justify-between px-2 flex-1">
            {[40, 70, 45, 90, 60, 30].map((height, i) => (
              <div key={i} className="flex gap-1.5 items-end h-full">
                {/* Concluídas */}
                <div className="w-3 bg-[#004a8d] rounded-t-sm transition-all" style={{ height: `${height}%` }}></div>
                {/* Em andamento */}
                <div className="w-3 bg-slate-200 rounded-t-sm transition-all" style={{ height: `${height * 0.6}%` }}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between px-2 mt-4 text-xs font-medium text-slate-400">
            <span>Seg</span>
            <span>Ter</span>
            <span>Qua</span>
            <span>Qui</span>
            <span>Sex</span>
            <span>Sáb</span>
          </div>
        </div>

      </div>
    </div>
  );
};

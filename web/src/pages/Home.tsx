import React from 'react';

import {
  Calendar,
  Clock,
  GraduationCap,
  Layers,
  LayoutGrid,
  Lightbulb,
  MapPin,
  Users,
} from 'lucide-react';

import { ContextPanel } from '../components/ContextPanel';
import { StatCard } from '../components/dashboard/StatCard';
import {
  ContextSummaryCard,
  PageCard,
  PageHeader,
  PageLayout,
} from '../components/ui';
import { useDashboardStats } from '../hooks/useDashboardStats';

const ACCENT = 'senac' as const;

const currentDate = new Date()
  .toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
  .replace(/ de /g, ' ');

export const Home: React.FC = () => {
  const { stats, shiftData, topCourses, isLoading } = useDashboardStats();

  return (
    <PageLayout>
      <PageHeader
        accent={ACCENT}
        icon={<LayoutGrid size={28} />}
        title="Painel Geral"
        description="Acompanhe os principais indicadores da instituição."
        action={
          <div className="flex items-center gap-2 text-slate-500 bg-white px-4 py-2 rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <span className="font-medium text-sm capitalize">
              {currentDate}
            </span>
            <Calendar size={18} className="text-senac-orange" />
          </div>
        }
      />

      <div className="bg-slate-800 rounded-4xl p-10 flex items-center justify-between mb-8 shadow-lg shadow-slate-800/20 relative overflow-hidden transition-colors">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bem-vindo(a) ao Painel Geral!
          </h2>
          <p className="text-blue-100 leading-relaxed text-lg">
            Acompanhe aqui o volume de dados acadêmicos cadastrados no sistema.
            Você tem acesso rápido aos indicadores de turmas, cursos, ambientes
            e docentes da instituição.
          </p>
        </div>
        <div className="hidden md:block relative z-10 mr-10">
          <div className="w-32 h-32 bg-black/10 rounded-full flex items-center justify-center opacity-80 shadow-inner">
            <Calendar size={48} className="text-senac-orange opacity-90" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-slate-600/30 to-transparent rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-40 w-40 h-40 bg-linear-to-tr from-senac-orange/20 to-transparent rounded-full blur-2xl -mb-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<GraduationCap size={24} />}
          iconClassName="bg-menu-cursos/10 text-menu-cursos"
          label="Cursos"
          value={isLoading ? '-' : stats.courses}
        />
        <StatCard
          icon={<Layers size={24} />}
          iconClassName="bg-menu-turmas/10 text-menu-turmas"
          label="Turmas"
          value={isLoading ? '-' : stats.classGroups}
        />
        <StatCard
          icon={<Users size={24} />}
          iconClassName="bg-menu-professores/10 text-menu-professores"
          label="Professores"
          value={isLoading ? '-' : stats.professors}
        />
        <StatCard
          icon={<MapPin size={24} />}
          iconClassName="bg-menu-salas/10 text-menu-salas"
          label="Salas/Ambientes"
          value={isLoading ? '-' : stats.rooms}
        />
      </div>

      <PageCard
        isLoading={isLoading}
        loadingMessage="Carregando indicadores..."
      >
        <div className="flex justify-between items-start mb-10">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Evolução de Agendamentos (Estimativa)
            </h3>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
              <span>01 Mai - 31 Mai</span>
              <Calendar size={16} className="text-slate-400" />
            </div>
            <div className="flex items-center gap-6 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-senac-blue" />
                <span className="text-slate-800">Mês Atual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-senac-orange" />
                <span className="text-slate-400">Mês Anterior</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-64 relative">
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-400 font-medium">
            <span>500</span>
            <span>400</span>
            <span>300</span>
            <span>200</span>
            <span>100</span>
            <span>0</span>
          </div>
          <div className="absolute left-10 right-0 top-0 h-full flex flex-col justify-between">
            <div className="border-t border-slate-100 w-full" />
            <div className="border-t border-slate-100 w-full" />
            <div className="border-t border-slate-100 w-full" />
            <div className="border-t border-slate-100 w-full" />
            <div className="border-t border-slate-100 w-full" />
            <div className="border-t border-slate-100 w-full" />
          </div>
          <svg
            className="absolute left-10 right-0 top-0 h-full w-[calc(100%-2.5rem)]"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <path
              d="M0,80 C20,80 30,50 50,60 C70,70 80,30 100,40"
              fill="none"
              stroke="var(--theme-senac-orange)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M0,90 C15,90 25,60 40,40 C55,20 70,30 85,15 C90,10 95,15 100,20"
              fill="none"
              stroke="var(--theme-senac-blue)"
              strokeWidth="3"
            />
            <path
              d="M0,90 C15,90 25,60 40,40 C55,20 70,30 85,15 C90,10 95,15 100,20 L100,100 L0,100 Z"
              fill="url(#blue-gradient)"
              opacity="0.1"
            />
            <defs>
              <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#004a8d" stopOpacity="1" />
                <stop offset="100%" stopColor="#004a8d" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute left-10 right-0 -bottom-6 flex justify-between text-xs text-slate-400 font-medium">
            <span>Sem 1</span>
            <span>Sem 2</span>
            <span>Sem 3</span>
            <span>Sem 4</span>
          </div>
        </div>
      </PageCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <PageCard>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-800">
              Turmas por Turno
            </h3>
            <Clock size={18} className="text-slate-400" />
          </div>
          <div className="flex items-center gap-8 flex-1">
            <div className="relative w-36 h-36 shrink-0">
              {(() => {
                const total =
                  shiftData.Manhã + shiftData.Tarde + shiftData.Noite || 1;
                const pManha = (shiftData.Manhã / total) * 100;
                const pTarde = (shiftData.Tarde / total) * 100;
                const pNoite = (shiftData.Noite / total) * 100;

                return (
                  <svg
                    viewBox="0 0 36 36"
                    className="w-full h-full transform -rotate-90"
                  >
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#f8f9fc"
                      strokeWidth="4"
                    />
                    {pManha > 0 && (
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="4"
                        strokeDasharray={`${pManha} 100`}
                      />
                    )}
                    {pTarde > 0 && (
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--theme-senac-orange)"
                        strokeWidth="4"
                        strokeDasharray={`${pTarde} 100`}
                        strokeDashoffset={`-${pManha}`}
                      />
                    )}
                    {pNoite > 0 && (
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--theme-senac-blue)"
                        strokeWidth="4"
                        strokeDasharray={`${pNoite} 100`}
                        strokeDashoffset={`-${pManha + pTarde}`}
                      />
                    )}
                  </svg>
                );
              })()}
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold text-slate-800">
                  {stats.classGroups}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Turmas
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 flex-1 text-sm font-semibold text-slate-800">
              {(() => {
                const total =
                  shiftData.Manhã + shiftData.Tarde + shiftData.Noite || 1;
                return (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                      Manhã
                    </div>
                    <div className="text-right">
                      {Math.round((shiftData.Manhã / total) * 100)}%
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-senac-orange" />
                      Tarde
                    </div>
                    <div className="text-right">
                      {Math.round((shiftData.Tarde / total) * 100)}%
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-senac-blue" />
                      Noite
                    </div>
                    <div className="text-right">
                      {Math.round((shiftData.Noite / total) * 100)}%
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </PageCard>

        <PageCard>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-800">
              Turmas por Curso
            </h3>
            <GraduationCap size={18} className="text-slate-400" />
          </div>
          <div className="flex-1 flex flex-col justify-end gap-4">
            {topCourses.length === 0 && !isLoading && (
              <p className="text-sm text-slate-500 text-center m-auto">
                Nenhum dado disponível.
              </p>
            )}
            {topCourses.map((course) => {
              const maxCount = Math.max(...topCourses.map((c) => c.count), 1);
              const width = `${(course.count / maxCount) * 100}%`;
              return (
                <div key={course.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span className="truncate max-w-[80%]">{course.name}</span>
                    <span>{course.count} turmas</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-menu-cursos h-full rounded-full transition-all duration-1000"
                      style={{ width }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </PageCard>
      </div>

      <ContextPanel
        title="Painel Geral"
        description="Acompanhe os principais indicadores acadêmicos da instituição. Mantenha os dados de turmas e cursos atualizados para métricas precisas."
        icon={<Lightbulb className="text-amber-500" size={24} />}
        tips={[
          'Utilize o menu lateral para navegar rapidamente entre os módulos do sistema.',
          'Mantenha as informações sempre atualizadas para garantir que os indicadores reflitam a realidade.',
        ]}
      >
        <ContextSummaryCard
          title="Status do Sistema"
          icon={<Clock size={16} className="text-amber-500" />}
          rows={[
            {
              label: 'Banco de Dados',
              value: 'Conectado',
              valueClassName: 'text-emerald-600',
            },
            {
              label: 'API Acadêmica',
              value: 'Online',
              valueClassName: 'text-emerald-600',
            },
          ]}
        />
      </ContextPanel>
    </PageLayout>
  );
};

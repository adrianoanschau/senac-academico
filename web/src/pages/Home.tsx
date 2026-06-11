import React, { useState, useEffect } from 'react';
import { Calendar, GraduationCap, Layers, Users, MapPin, Clock, Lightbulb, LayoutGrid } from 'lucide-react';
import { ContextPanel } from '../components/ContextPanel';
import api from '../services/api';

interface Course {
  id: string | number;
  name: string;
}

interface Curriculum {
  id: string | number;
  courseId: string | number;
  course?: Course;
}

interface ClassGroup {
  id: string | number;
  shift: string;
  curriculumId?: string | number;
}

export const Home: React.FC = () => {
  const [stats, setStats] = useState({
    courses: 0,
    classGroups: 0,
    professors: 0,
    rooms: 0,
  });

  const [shiftData, setShiftData] = useState({
    Manhã: 0,
    Tarde: 0,
    Noite: 0
  });

  const [topCourses, setTopCourses] = useState<{name: string, count: number}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace(/ de /g, ' ');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, classGroupsRes, professorsRes, roomsRes, curriculumsRes] = await Promise.all([
          api.get('/courses').catch(() => ({ data: { data: [] } })),
          api.get('/class-groups').catch(() => ({ data: { data: [] } })),
          api.get('/professors').catch(() => ({ data: { data: [] } })),
          api.get('/rooms').catch(() => ({ data: { data: [] } })),
          api.get('/curriculums').catch(() => ({ data: { data: [] } })),
        ]);
        
        const coursesList = coursesRes.data.data || coursesRes.data || [];
        const classGroupsList = classGroupsRes.data.data || classGroupsRes.data || [];
        const professorsList = professorsRes.data.data || professorsRes.data || [];
        const roomsList = roomsRes.data.data || roomsRes.data || [];
        const curriculumsList = curriculumsRes.data.data || curriculumsRes.data || [];
        
        setStats({
          courses: coursesList.length,
          classGroups: classGroupsList.length,
          professors: professorsList.length,
          rooms: roomsList.length,
        });

        // Shifts distribution
        const shifts = { Manhã: 0, Tarde: 0, Noite: 0 };
        classGroupsList.forEach((cg: ClassGroup) => {
          if (cg.shift === 'Manhã') shifts.Manhã++;
          if (cg.shift === 'Tarde') shifts.Tarde++;
          if (cg.shift === 'Noite') shifts.Noite++;
        });
        setShiftData(shifts);

        // Top Courses by Class Groups
        const courseCounts: Record<string, number> = {};
        classGroupsList.forEach((cg: ClassGroup) => {
          let courseName = 'Não atribuído';
          if (cg.curriculumId) {
             const curriculum = curriculumsList.find((c: Curriculum) => c.id === cg.curriculumId);
             if (curriculum && curriculum.course) {
                courseName = curriculum.course.name;
             } else if (curriculum) {
                const course = coursesList.find((co: Course) => co.id === curriculum.courseId);
                if (course) courseName = course.name;
             }
          }
          courseCounts[courseName] = (courseCounts[courseName] || 0) + 1;
        });

        const sortedCourses = Object.entries(courseCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 4);

        setTopCourses(sortedCourses);

      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-slate-800/10 text-slate-800 rounded-xl">
              <LayoutGrid size={28} />
            </div>
            Painel Geral
          </h1>
          <p className="text-slate-500 mt-1">Acompanhe os principais indicadores da instituição.</p>
        </div>
        <div className="flex items-center gap-2 text-slate-500 bg-white px-4 py-2 rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <span className="font-medium text-sm capitalize">{currentDate}</span>
          <Calendar size={18} className="text-senac-orange" />
        </div>
      </div>

      {/* Hero Banner Dinâmico */}
      <div className="bg-slate-800 rounded-4xl p-10 flex items-center justify-between mb-8 shadow-lg shadow-slate-800/20 relative overflow-hidden transition-colors">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Bem-vindo(a) ao Painel Geral!</h2>
          <p className="text-blue-100 leading-relaxed text-lg">
            Acompanhe aqui o volume de dados acadêmicos cadastrados no sistema. Você tem acesso rápido aos indicadores de turmas, cursos, ambientes e docentes da instituição.
          </p>
        </div>
        {/* Placeholder Illustration / Icon */}
        <div className="hidden md:block relative z-10 mr-10">
           <div className="w-32 h-32 bg-black/10 rounded-full flex items-center justify-center opacity-80 shadow-inner">
              <Calendar size={48} className="text-senac-orange opacity-90" />
           </div>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-slate-600/30 to-transparent rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-40 w-40 h-40 bg-linear-to-tr from-senac-orange/20 to-transparent rounded-full blur-2xl -mb-10"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex items-center gap-4">
          <div className="p-4 bg-menu-cursos/10 text-menu-cursos rounded-xl">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Cursos</p>
            <p className="text-2xl font-bold text-slate-800">{isLoading ? '-' : stats.courses}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex items-center gap-4">
          <div className="p-4 bg-menu-turmas/10 text-menu-turmas rounded-xl">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Turmas</p>
            <p className="text-2xl font-bold text-slate-800">{isLoading ? '-' : stats.classGroups}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex items-center gap-4">
          <div className="p-4 bg-menu-professores/10 text-menu-professores rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Professores</p>
            <p className="text-2xl font-bold text-slate-800">{isLoading ? '-' : stats.professors}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex items-center gap-4">
          <div className="p-4 bg-menu-salas/10 text-menu-salas rounded-xl">
            <MapPin size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Salas/Ambientes</p>
            <p className="text-2xl font-bold text-slate-800">{isLoading ? '-' : stats.rooms}</p>
          </div>
        </div>
      </div>

      {/* Main Chart (Line Chart Placeholder) */}
      <div className="bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] mb-8">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Evolução de Agendamentos (Estimativa)</h3>
          </div>
          <div className="flex flex-col items-end gap-3">
             <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                <span>01 Mai - 31 Mai</span>
                <Calendar size={16} className="text-slate-400" />
             </div>
             <div className="flex items-center gap-6 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-senac-blue"></div>
                  <span className="text-slate-800">Mês Atual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-senac-orange"></div>
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
            <path d="M0,80 C20,80 30,50 50,60 C70,70 80,30 100,40" fill="none" stroke="var(--theme-senac-orange)" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Current Month - Blue Curve */}
            <path d="M0,90 C15,90 25,60 40,40 C55,20 70,30 85,15 C90,10 95,15 100,20" fill="none" stroke="var(--theme-senac-blue)" strokeWidth="3" />
            
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
        
        {/* Donut Chart - Shift Distribution */}
        <div className="bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-800">Turmas por Turno</h3>
            <Clock size={18} className="text-slate-400" />
          </div>
          
          <div className="flex items-center gap-8 flex-1">
            <div className="relative w-36 h-36 shrink-0">
               {/* Compute percentages */}
               {(() => {
                  const total = shiftData.Manhã + shiftData.Tarde + shiftData.Noite || 1;
                  const pManha = (shiftData.Manhã / total) * 100;
                  const pTarde = (shiftData.Tarde / total) * 100;
                  const pNoite = (shiftData.Noite / total) * 100;

                  return (
                     <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                       {/* Background empty ring */}
                       <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f8f9fc" strokeWidth="4" />
                       
                       {/* Manhã - Yellow/Amber */}
                       {pManha > 0 && <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray={`${pManha} 100`} />}
                       
                       {/* Tarde - Orange */}
                       {pTarde > 0 && <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--theme-senac-orange)" strokeWidth="4" strokeDasharray={`${pTarde} 100`} strokeDashoffset={`-${pManha}`} />}
                       
                       {/* Noite - Indigo/Blue */}
                       {pNoite > 0 && <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--theme-senac-blue)" strokeWidth="4" strokeDasharray={`${pNoite} 100`} strokeDashoffset={`-${pManha + pTarde}`} />}
                     </svg>
                  );
               })()}
               <div className="absolute inset-0 flex items-center justify-center flex-col">
                 <span className="text-2xl font-bold text-slate-800">{stats.classGroups}</span>
                 <span className="text-xs text-slate-500 font-medium">Turmas</span>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 flex-1 text-sm font-semibold text-slate-800">
               {(() => {
                 const total = shiftData.Manhã + shiftData.Tarde + shiftData.Noite || 1;
                 return (
                   <>
                     <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></div>
                       Manhã
                     </div>
                     <div className="text-right">{Math.round((shiftData.Manhã / total) * 100)}%</div>
                     
                     <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-senac-orange"></div>
                       Tarde
                     </div>
                     <div className="text-right">{Math.round((shiftData.Tarde / total) * 100)}%</div>

                     <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-senac-blue"></div>
                       Noite
                     </div>
                     <div className="text-right">{Math.round((shiftData.Noite / total) * 100)}%</div>
                   </>
                 )
               })()}
            </div>
          </div>
        </div>

        {/* Bar Chart - Top Courses */}
        <div className="bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-800">Turmas por Curso</h3>
            <GraduationCap size={18} className="text-slate-400" />
          </div>
          
          <div className="flex-1 flex flex-col justify-end gap-4">
            {topCourses.length === 0 && !isLoading && (
              <p className="text-sm text-slate-500 text-center m-auto">Nenhum dado disponível.</p>
            )}
            {topCourses.map((course, i) => {
              const maxCount = Math.max(...topCourses.map(c => c.count), 1);
              const width = `${(course.count / maxCount) * 100}%`;
              return (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span className="truncate max-w-[80%]">{course.name}</span>
                    <span>{course.count} turmas</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-menu-cursos h-full rounded-full transition-all duration-1000" 
                      style={{ width }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <ContextPanel
        title="Painel Geral"
        description="Acompanhe os principais indicadores acadêmicos da instituição. Mantenha os dados de turmas e cursos atualizados para métricas precisas."
        icon={<Lightbulb className="text-amber-500" size={24} />}
        tips={[
          'Utilize o menu lateral para navegar rapidamente entre os módulos do sistema.',
          'Mantenha as informações sempre atualizadas para garantir que os indicadores reflitam a realidade.'
        ]}
      >
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mt-4">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Clock size={16} className="text-amber-500" /> Status do Sistema
          </h4>
          <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Banco de Dados</div>
            <span className="font-bold text-emerald-600">Conectado</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-600">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> API Acadêmica</div>
            <span className="font-bold text-emerald-600">Online</span>
          </div>
        </div>
      </ContextPanel>
    </div>
  );
};

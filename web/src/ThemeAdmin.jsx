import { useState } from 'react';

export function ThemeAdmin() {
  // Cores iniciais mapeadas diretamente do seu index.css
  const [themeColors, setThemeColors] = useState({
    '--theme-senac-blue': '#004a8d',
    '--theme-senac-orange': '#f37021',
    '--theme-menu-cursos': '#8b5cf6',
    '--theme-menu-turmas': '#10b981',
    '--theme-menu-uc': '#f59e0b',
    '--theme-menu-matriz': '#f43f5e',
    '--theme-menu-professores': '#0ea5e9',
    '--theme-menu-salas': '#14b8a6',
    '--theme-menu-especiais': '#ef4444',
  });

  const handleColorChange = (cssVar, value) => {
    // 1. Atualiza o estado local para o input não perder a referência
    setThemeColors((prev) => ({ ...prev, [cssVar]: value }));
    
    // 2. Aplica a cor em tempo real no :root do HTML
    // Isso faz com que todas as classes do Tailwind v4 atualizem instantaneamente
    document.documentElement.style.setProperty(cssVar, value);
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-senac-blue mb-6">Administração de Temas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(themeColors).map(([cssVar, color]) => {
          // Limpa o nome da variável para exibição amigável (ex: --theme-menu-cursos -> menu cursos)
          const label = cssVar.replace('--theme-', '').replace(/-/g, ' ');
          
          return (
            <div key={cssVar} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-md">
              <label className="text-sm font-medium capitalize text-slate-700 dark:text-slate-300">
                {label}
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500 uppercase w-16">{color}</span>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(cssVar, e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Área de Preview demonstrando as classes dinâmicas geradas no index.css */}
      <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Pré-visualização nas Páginas</h3>
        <div className="flex flex-wrap gap-3">
          <button className="bg-senac-blue text-white px-4 py-2 rounded-md shadow transition-colors">Institucional (Blue)</button>
          <button className="bg-senac-orange text-white px-4 py-2 rounded-md shadow transition-colors">Destaque (Orange)</button>
          <div className="bg-menu-cursos text-white px-4 py-2 rounded-md shadow transition-colors">Módulo Cursos</div>
          <div className="bg-menu-turmas text-white px-4 py-2 rounded-md shadow transition-colors">Módulo Turmas</div>
        </div>
      </div>
    </div>
  );
}
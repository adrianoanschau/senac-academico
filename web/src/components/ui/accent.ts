export const accentPresets = {
  cursos: {
    iconBadge: 'bg-menu-cursos/10 text-menu-cursos',
    primaryButton:
      'bg-menu-cursos hover:opacity-90 text-white shadow-md shadow-menu-cursos/30',
    ring: 'focus:ring-menu-cursos',
    segmentActive: 'bg-menu-cursos text-white shadow-md',
    actionHover: 'hover:text-menu-cursos hover:bg-menu-cursos/10',
  },
  professores: {
    iconBadge: 'bg-menu-professores/10 text-menu-professores',
    primaryButton:
      'bg-menu-professores hover:opacity-90 text-white shadow-md shadow-menu-professores/30',
    ring: 'focus:ring-menu-professores',
    segmentActive: 'bg-menu-professores text-white shadow-md',
    actionHover: 'hover:text-menu-professores hover:bg-menu-professores/10',
  },
  salas: {
    iconBadge: 'bg-menu-salas/10 text-menu-salas',
    primaryButton:
      'bg-menu-salas hover:opacity-90 text-white shadow-md shadow-menu-salas/30',
    ring: 'focus:ring-menu-salas',
    segmentActive: 'bg-menu-salas text-white shadow-md',
    actionHover: 'hover:text-menu-salas hover:bg-menu-salas/10',
  },
  turmas: {
    iconBadge: 'bg-menu-turmas/10 text-menu-turmas',
    primaryButton:
      'bg-menu-turmas hover:opacity-90 text-white shadow-md shadow-menu-turmas/30',
    ring: 'focus:ring-menu-turmas',
    segmentActive: 'bg-menu-turmas text-white shadow-md',
    actionHover: 'hover:text-menu-turmas hover:bg-menu-turmas/10',
  },
  matriz: {
    iconBadge: 'bg-menu-matriz/10 text-menu-matriz',
    primaryButton:
      'bg-menu-matriz hover:opacity-90 text-white shadow-md shadow-menu-matriz/30',
    ring: 'focus:ring-menu-matriz',
    segmentActive: 'bg-menu-matriz text-white shadow-md',
    actionHover: 'hover:text-menu-matriz hover:bg-menu-matriz/10',
  },
  senac: {
    iconBadge: 'bg-senac-blue/10 text-senac-blue',
    primaryButton:
      'bg-senac-blue hover:opacity-90 text-white shadow-md shadow-senac-blue/30',
    ring: 'focus:ring-senac-blue',
    segmentActive: 'bg-senac-blue text-white shadow-md',
    actionHover: 'hover:text-senac-blue hover:bg-senac-blue/10',
  },
  especiais: {
    iconBadge: 'bg-menu-especiais/10 text-menu-especiais',
    primaryButton:
      'bg-menu-especiais hover:opacity-90 text-white shadow-md shadow-menu-especiais/30',
    ring: 'focus:ring-menu-especiais',
    segmentActive: 'bg-menu-especiais text-white shadow-md',
    actionHover: 'hover:text-menu-especiais hover:bg-menu-especiais/10',
  },
  operacional: {
    iconBadge: 'bg-orange-500/10 text-[#f37021]',
    primaryButton:
      'bg-[#f37021] hover:bg-[#d96017] text-white shadow-md shadow-orange-500/30',
    ring: 'focus:ring-[#f37021]',
    segmentActive: 'bg-[#f37021] text-white shadow-md',
    actionHover: 'hover:text-[#f37021] hover:bg-orange-50',
  },
  uc: {
    iconBadge: 'bg-menu-uc/10 text-menu-uc',
    primaryButton:
      'bg-menu-uc hover:opacity-90 text-white shadow-md shadow-menu-uc/30',
    ring: 'focus:ring-menu-uc',
    segmentActive: 'bg-menu-uc text-white shadow-md',
    actionHover: 'hover:text-menu-uc hover:bg-menu-uc/10',
  },
} as const;

export type AccentPreset = keyof typeof accentPresets;

export function getAccentClasses(preset: AccentPreset) {
  return accentPresets[preset];
}

export function getFormControlClass(preset: AccentPreset) {
  const { ring } = getAccentClasses(preset);
  return `w-full px-4 py-3 bg-[#f8f9fc] border-none rounded-xl focus:ring-2 ${ring} outline-none transition-all text-slate-800`;
}

import { z } from 'zod';

export const trackSequenceSchema = z.object({
  subjectId: z.string().min(1, 'A disciplina é obrigatória.'),
  professorId: z.string().min(1, 'O professor é obrigatório.'),
  roomId: z.string().optional(),
});

export const trackSchema = z.object({
  startTimeStr: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Início inválido.'),
  endTimeStr: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Término inválido.'),
  isPriority: z.boolean(),
  startDate: z.string().optional(),
  daysOfWeek: z
    .array(z.number().min(0).max(6))
    .min(1, 'Selecione pelo menos um dia da semana para esta trilha.'),
  sequence: z
    .array(trackSequenceSchema)
    .min(1, 'A trilha deve ter pelo menos uma disciplina na sequência.'),
});

export const planModuleSchema = z.object({
  classGroupId: z.string().min(1, 'A turma é obrigatória.'),
  module: z.string().optional(),
  startDate: z.string().min(1, 'A data de início é obrigatória.'),
  tracks: z
    .array(trackSchema)
    .min(1, 'Adicione pelo menos uma trilha de planejamento.'),
});

export type PlanModuleFormData = z.infer<typeof planModuleSchema>;

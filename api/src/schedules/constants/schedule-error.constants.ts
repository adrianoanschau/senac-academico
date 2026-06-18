import { ConflictException } from '@nestjs/common';

/** Ações reconhecidas pelo frontend em respostas HTTP 409. */
export const SCHEDULE_ERROR_ACTIONS = {
  CONFIRM_REQUIRED: 'CONFIRM_REQUIRED',
} as const;

export type ScheduleErrorAction =
  (typeof SCHEDULE_ERROR_ACTIONS)[keyof typeof SCHEDULE_ERROR_ACTIONS];

/** Corpo padronizado quando o adiamento exige confirmação do usuário. */
export interface ScheduleConfirmRequiredBody {
  message: string;
  action: typeof SCHEDULE_ERROR_ACTIONS.CONFIRM_REQUIRED;
  conflictingSubject: string;
}

export function throwPostponeConfirmRequired(
  conflictingSubject: string,
): never {
  throw new ConflictException({
    message: `A data solicitada já possui um conflito com a disciplina ${conflictingSubject}.`,
    action: SCHEDULE_ERROR_ACTIONS.CONFIRM_REQUIRED,
    conflictingSubject,
  } satisfies ScheduleConfirmRequiredBody);
}

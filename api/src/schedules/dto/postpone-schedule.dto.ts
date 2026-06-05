import { IsNotEmpty, IsString } from 'class-validator';

export class PostponeScheduleDto {
  @IsString()
  @IsNotEmpty({
    message: 'O motivo do cancelamento/reagendamento é obrigatório.',
  })
  reason: string;
}

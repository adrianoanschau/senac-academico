import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PostponeScheduleDto {
  @IsString()
  @IsNotEmpty({
    message: 'O motivo do cancelamento/reagendamento é obrigatório.',
  })
  reason: string;

  @IsOptional()
  @IsDateString()
  newDate?: string;
}

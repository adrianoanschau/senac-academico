import {
  IsDateString,
  IsArray,
  IsInt,
  IsOptional,
  IsUUID,
  Matches,
  Min,
  Max,
  ArrayNotEmpty,
} from 'class-validator';

export class MigrateRuleDto {
  @IsDateString(
    {},
    { message: 'transitionDate deve ser uma data em formato ISO 8601 válida' },
  )
  transitionDate: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'newDaysOfWeek não pode estar vazio' })
  @IsInt({
    each: true,
    message: 'Cada dia da semana deve ser um número inteiro',
  })
  @Min(0, {
    each: true,
    message: 'O dia da semana deve ser no mínimo 0 (Domingo)',
  })
  @Max(6, {
    each: true,
    message: 'O dia da semana deve ser no máximo 6 (Sábado)',
  })
  newDaysOfWeek: number[];

  @IsOptional()
  @IsUUID('all', { message: 'newProfessorId deve ser um UUID válido' })
  newProfessorId?: string;

  @IsOptional()
  @IsUUID('all', { message: 'newRoomId deve ser um UUID válido' })
  newRoomId?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'newStartTimeStr deve estar no formato HH:mm',
  })
  newStartTimeStr?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'newEndTimeStr deve estar no formato HH:mm',
  })
  newEndTimeStr?: string;
}

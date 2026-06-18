import { ClassStatus } from '@/prisma/generated';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class FindSchedulesQueryDto {
  @ValidateIf((query: FindSchedulesQueryDto) => query.end !== undefined)
  @IsDateString()
  @IsNotEmpty()
  start?: string;

  @ValidateIf((query: FindSchedulesQueryDto) => query.start !== undefined)
  @IsDateString()
  @IsNotEmpty()
  end?: string;

  @IsOptional()
  @IsUUID()
  classGroupId?: string;

  @IsOptional()
  @IsUUID()
  professorId?: string;

  @IsOptional()
  @IsUUID()
  roomId?: string;

  @IsOptional()
  @IsUUID()
  subjectId?: string;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    if (value === undefined || value === null || value === '') return undefined;
    return Array.isArray(value) ? value : [value];
  })
  @IsEnum(ClassStatus, { each: true })
  status?: ClassStatus[];

  @IsOptional()
  @IsString()
  search?: string;
}

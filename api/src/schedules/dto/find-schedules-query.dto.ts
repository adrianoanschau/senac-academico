import { ClassStatus } from '@/prisma/generated';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { SCHEDULES_MAX_PAGE_LIMIT } from '../constants/schedule-query.constants';

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
  @Transform(({ value }: { value: unknown }): ClassStatus[] | undefined => {
    if (value === undefined || value === null || value === '') return undefined;
    return (Array.isArray(value) ? value : [value]) as ClassStatus[];
  })
  @IsEnum(ClassStatus, { each: true })
  status?: ClassStatus[];

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(SCHEDULES_MAX_PAGE_LIMIT)
  limit?: number;

  @IsOptional()
  @IsDateString()
  cursor?: string;
}

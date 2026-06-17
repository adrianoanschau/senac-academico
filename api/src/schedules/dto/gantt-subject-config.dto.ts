import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GanttSubjectConfigDto {
  @IsUUID()
  @IsNotEmpty()
  curriculumSubjectId: string;

  @IsUUID()
  @IsNotEmpty()
  subjectId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(6, { each: true })
  daysOfWeek: number[];

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsBoolean()
  isPriority?: boolean;

  @IsOptional()
  @IsUUID()
  dependsOnId?: string | null;

  @IsOptional()
  @IsUUID()
  professorId?: string;

  @IsOptional()
  @IsUUID()
  roomId?: string;
}

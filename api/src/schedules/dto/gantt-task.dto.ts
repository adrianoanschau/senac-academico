import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import { GanttSessionDto } from './gantt-session.dto';

export class GanttTaskDto {
  @IsUUID()
  @IsNotEmpty()
  curriculumSubjectId: string;

  @IsUUID()
  @IsNotEmpty()
  subjectId: string;

  @IsOptional()
  @IsUUID()
  dependsOnId?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(6, { each: true })
  daysOfWeek: number[];

  @IsUUID()
  @IsNotEmpty()
  professorId: string;

  @IsUUID()
  @IsNotEmpty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  subjectCode: string;

  @IsString()
  @IsNotEmpty()
  subjectName: string;

  @IsInt()
  @Min(1)
  hours: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GanttSessionDto)
  sessions: GanttSessionDto[];
}

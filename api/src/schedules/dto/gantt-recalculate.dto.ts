import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';
import { GanttSubjectConfigDto } from './gantt-subject-config.dto';

export class GanttRecalculateDto {
  @IsUUID()
  @IsNotEmpty()
  classGroupId: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  moduleNumber: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  startTimeStr: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  endTimeStr: string;

  @IsUUID()
  @IsNotEmpty()
  movedTaskId: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  newStartDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GanttSubjectConfigDto)
  subjects: GanttSubjectConfigDto[];
}

import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';
import { GanttSubjectConfigDto } from './gantt-subject-config.dto';

export class GanttBlueprintDto {
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GanttSubjectConfigDto)
  subjects: GanttSubjectConfigDto[];
}

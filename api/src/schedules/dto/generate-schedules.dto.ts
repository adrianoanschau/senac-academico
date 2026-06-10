import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class GenerateSchedulesDto {
  @IsUUID()
  @IsNotEmpty()
  classGroupId: string;

  @IsUUID()
  @IsNotEmpty()
  subjectId: string;

  @IsUUID()
  @IsNotEmpty()
  professorId: string;

  @IsUUID()
  @IsNotEmpty()
  roomId: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(6, { each: true })
  daysOfWeek: number[];

  @IsString()
  @IsNotEmpty()
  startTimeStr: string;

  @IsString()
  @IsNotEmpty()
  endTimeStr: string;

  @IsOptional()
  @IsUUID()
  dependsOnRuleId?: string;
}

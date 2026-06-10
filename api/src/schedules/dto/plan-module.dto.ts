import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class TrackSequenceDto {
  @IsUUID()
  @IsNotEmpty()
  subjectId: string;

  @IsUUID()
  @IsNotEmpty()
  professorId: string;

  @IsOptional()
  @IsUUID()
  roomId?: string;
}

export class TrackDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(6, { each: true })
  daysOfWeek: number[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TrackSequenceDto)
  sequence: TrackSequenceDto[];
}

export class PlanModuleDto {
  @IsUUID()
  @IsNotEmpty()
  classGroupId: string;

  @IsOptional()
  @IsUUID()
  moduleId?: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TrackDto)
  tracks: TrackDto[];
}

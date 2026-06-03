import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateClassGroupDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  shift: string;

  @IsDateString()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @IsDateString()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;

  @IsUUID()
  @IsNotEmpty()
  curriculumId: string;
}

import { Type } from 'class-transformer';
import {
  IsDate,
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

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsUUID()
  @IsNotEmpty()
  curriculumId: string;
}

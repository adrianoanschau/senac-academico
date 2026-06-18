import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class FindSubjectsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  moduleNumber?: number;

  @IsOptional()
  @IsUUID()
  classGroupId?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsUUID()
  excludeCurriculumId?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  includeCurriculums?: boolean;
}

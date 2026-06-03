import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class CurriculumSubjectDto {
  @IsUUID()
  @IsNotEmpty()
  subjectId: string;

  @IsInt()
  @Min(1)
  module: number;
}

export class CreateCurriculumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CurriculumSubjectDto)
  subjects: CurriculumSubjectDto[];
}

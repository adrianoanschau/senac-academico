import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateSubjectDto } from '../../subjects/dto/create-subject.dto';

export class AddSubjectToCurriculumDto {
  @IsOptional()
  @IsUUID()
  subjectId?: string;

  @IsInt()
  @Min(1)
  module: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSubjectDto)
  createSubject?: CreateSubjectDto;
}

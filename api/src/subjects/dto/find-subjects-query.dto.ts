import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FindSubjectsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  moduleNumber?: number;
}

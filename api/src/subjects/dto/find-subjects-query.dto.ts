import { IsInt, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class FindSubjectsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  moduleNumber?: number;

  @IsOptional()
  @IsUUID()
  classGroupId?: string;
}

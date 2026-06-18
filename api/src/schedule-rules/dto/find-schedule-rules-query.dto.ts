import { IsOptional, IsUUID } from 'class-validator';

export class FindScheduleRulesQueryDto {
  @IsOptional()
  @IsUUID()
  classGroupId?: string;
}

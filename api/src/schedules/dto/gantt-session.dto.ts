import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class GanttSessionDto {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  endTime: Date;
}

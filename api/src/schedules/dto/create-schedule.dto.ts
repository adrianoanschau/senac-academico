import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateScheduleDto {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  endTime: Date;

  @IsUUID()
  @IsNotEmpty()
  classGroupId: string;

  @IsUUID()
  @IsNotEmpty()
  subjectId: string;

  @IsUUID()
  @IsNotEmpty()
  professorId: string;

  @IsUUID()
  @IsNotEmpty()
  roomId: string;
}

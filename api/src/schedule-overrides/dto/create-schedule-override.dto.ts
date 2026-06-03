import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OverrideType } from '@/prisma/generated';

export class CreateScheduleOverrideDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  endTime: Date;

  @IsEnum(OverrideType, {
    message: 'O tipo deve ser BLOCK ou EXTRA_DAY',
  })
  @IsNotEmpty()
  type: OverrideType;
}

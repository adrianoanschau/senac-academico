import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleOverrideDto } from './create-schedule-override.dto';

export class UpdateScheduleOverrideDto extends PartialType(CreateScheduleOverrideDto) {}

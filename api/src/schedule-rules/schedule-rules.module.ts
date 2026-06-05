import { Module } from '@nestjs/common';
import { ScheduleRulesService } from './schedule-rules.service';
import { ScheduleRulesController } from './schedule-rules.controller';

@Module({
  controllers: [ScheduleRulesController],
  providers: [ScheduleRulesService],
})
export class ScheduleRulesModule {}

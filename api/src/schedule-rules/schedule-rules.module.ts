import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { ScheduleRulesController } from './schedule-rules.controller';
import { ScheduleRulesService } from './schedule-rules.service';

@Module({
  controllers: [ScheduleRulesController],
  providers: [ScheduleRulesService, PrismaService],
})
export class ScheduleRulesModule {}

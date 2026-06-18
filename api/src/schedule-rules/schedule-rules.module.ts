import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ScheduleRulesService } from './schedule-rules.service';
import { ScheduleRulesController } from './schedule-rules.controller';

@Module({
  controllers: [ScheduleRulesController],
  providers: [ScheduleRulesService, PrismaService],
})
export class ScheduleRulesModule {}

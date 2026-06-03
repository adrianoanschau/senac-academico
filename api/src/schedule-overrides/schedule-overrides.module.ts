import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ScheduleOverridesService } from './schedule-overrides.service';
import { ScheduleOverridesController } from './schedule-overrides.controller';

@Module({
  controllers: [ScheduleOverridesController],
  providers: [ScheduleOverridesService, PrismaService],
})
export class ScheduleOverridesModule {}

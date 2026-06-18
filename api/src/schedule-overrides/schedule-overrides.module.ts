import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { ScheduleOverridesController } from './schedule-overrides.controller';
import { ScheduleOverridesService } from './schedule-overrides.service';

@Module({
  controllers: [ScheduleOverridesController],
  providers: [ScheduleOverridesService, PrismaService],
})
export class ScheduleOverridesModule {}

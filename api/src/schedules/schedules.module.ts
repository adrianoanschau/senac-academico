import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { ScheduleGeneratorService } from './schedule-generator.service';
import { ModuleOrchestratorService } from './module-orchestrator.service';

@Module({
  controllers: [SchedulesController],
  providers: [
    SchedulesService,
    PrismaService,
    ScheduleGeneratorService,
    ModuleOrchestratorService,
  ],
})
export class SchedulesModule {}

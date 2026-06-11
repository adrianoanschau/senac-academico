import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { ScheduleGeneratorService } from './schedule-generator.service';
import { ModuleOrchestratorService } from './module-orchestrator.service';
import { RuleDependencyListener } from './listeners/rule-dependency.listener';

@Module({
  controllers: [SchedulesController],
  providers: [
    SchedulesService,
    PrismaService,
    ScheduleGeneratorService,
    ModuleOrchestratorService,
    RuleDependencyListener,
  ],
})
export class SchedulesModule {}

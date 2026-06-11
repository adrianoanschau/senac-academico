import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { ScheduleGeneratorService } from './schedule-generator.service';
import { ModuleOrchestratorService } from './module-orchestrator.service';
import { RuleDependencyListener } from './listeners/rule-dependency.listener';
import { ClassCompletionCronService } from './class-completion-cron.service';

@Module({
  controllers: [SchedulesController],
  providers: [
    SchedulesService,
    PrismaService,
    ScheduleGeneratorService,
    ModuleOrchestratorService,
    RuleDependencyListener,
    ClassCompletionCronService,
  ],
})
export class SchedulesModule {}

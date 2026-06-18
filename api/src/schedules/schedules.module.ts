import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { ClassCompletionCronService } from './class-completion-cron.service';
import { ScheduleConflictService } from './conflict/schedule-conflict.service';
import { GanttPlannerService } from './gantt-planner.service';
import { RuleDependencyListener } from './listeners/rule-dependency.listener';
import { ModuleOrchestratorService } from './module-orchestrator.service';
import { SchedulePostponeService } from './reschedule/schedule-postpone.service';
import { ScheduleRuleLifecycleService } from './rules/schedule-rule-lifecycle.service';
import { ScheduleGeneratorService } from './schedule-generator.service';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

@Module({
  controllers: [SchedulesController],
  providers: [
    SchedulesService,
    PrismaService,
    ScheduleGeneratorService,
    ScheduleConflictService,
    ScheduleRuleLifecycleService,
    SchedulePostponeService,
    ModuleOrchestratorService,
    GanttPlannerService,
    RuleDependencyListener,
    ClassCompletionCronService,
  ],
})
export class SchedulesModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { ScheduleGeneratorService } from './schedule-generator.service';
import { ModuleOrchestratorService } from './module-orchestrator.service';
import { RuleDependencyListener } from './listeners/rule-dependency.listener';
import { ClassCompletionCronService } from './class-completion-cron.service';
import { GanttPlannerService } from './gantt-planner.service';
import { ScheduleConflictService } from './conflict/schedule-conflict.service';
import { ScheduleRuleLifecycleService } from './rules/schedule-rule-lifecycle.service';
import { SchedulePostponeService } from './reschedule/schedule-postpone.service';

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

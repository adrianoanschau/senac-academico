import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { ClassStatus } from '@/prisma/generated';
import { PrismaService } from '@/prisma/prisma.service';

import {
  emitRuleEndDateChanged,
  RULE_EVENTS,
  RuleEndDateChangedEvent,
} from '../events/rule-end-date-changed.event';
import { SchedulesService } from '../schedules.service';
import { dayAfterInScheduleTz } from '../utils/schedule-date.utils';
import {
  computeRuleRemainingHours,
  dependentRuleWhere,
  resolveRuleRootId,
  RULE_DOMINO_CONSUMED_STATUSES,
  ruleFamilyWhere,
} from '../utils/schedule-rule.utils';
import { formatRuleDependencyLog } from './rule-dependency.logger';

@Injectable()
export class RuleDependencyListener {
  private readonly logger = new Logger(RuleDependencyListener.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly schedulesService: SchedulesService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent(RULE_EVENTS.END_DATE_CHANGED)
  async handleRuleEndDateChanged(event: RuleEndDateChangedEvent) {
    this.logger.log(
      formatRuleDependencyLog('domino.received', {
        ruleId: event.ruleId,
        classGroupId: event.classGroupId,
        newEndDate: event.newEndDate.toISOString(),
      }),
    );

    try {
      const dependentRule = await this.prisma.scheduleRule.findFirst({
        where: dependentRuleWhere(event.ruleId),
      });

      if (!dependentRule) {
        this.logger.log(
          formatRuleDependencyLog('domino.chain_end', {
            ruleId: event.ruleId,
            reason: 'no_dependent_rule',
          }),
        );
        return;
      }

      const dependentRootId = resolveRuleRootId(dependentRule);
      const newStartDate = dayAfterInScheduleTz(event.newEndDate);

      await this.prisma.schedule.deleteMany({
        where: ruleFamilyWhere(dependentRootId, [
          ClassStatus.PLANNED,
          ClassStatus.SCHEDULED,
        ]),
      });

      const remainingHours = await computeRuleRemainingHours(
        this.prisma,
        dependentRule,
        dependentRootId,
        RULE_DOMINO_CONSUMED_STATUSES,
      );

      if (remainingHours <= 0) {
        this.logger.log(
          formatRuleDependencyLog('domino.hours_exhausted', {
            ruleId: event.ruleId,
            dependentRuleId: dependentRule.id,
            dependentRootId,
          }),
        );
        return;
      }

      this.logger.log(
        formatRuleDependencyLog('domino.recalculate', {
          ruleId: event.ruleId,
          dependentRuleId: dependentRule.id,
          dependentRootId,
          newStartDate: newStartDate.toISOString(),
          remainingHours,
        }),
      );

      const bulkResult = await this.schedulesService.generateBulk({
        classGroupId: dependentRule.classGroupId,
        subjectId: dependentRule.subjectId,
        professorId: dependentRule.professorId,
        roomId: dependentRule.roomId,
        startDate: newStartDate,
        daysOfWeek: dependentRule.daysOfWeek,
        startTimeStr: dependentRule.startTimeStr,
        endTimeStr: dependentRule.endTimeStr,
        dependsOnRuleId: event.ruleId,
        remainingHours,
        existingRuleId: dependentRule.id,
      });

      if (bulkResult.lastClassEndDate) {
        emitRuleEndDateChanged(
          this.eventEmitter,
          dependentRootId,
          bulkResult.lastClassEndDate,
          dependentRule.classGroupId,
        );

        this.logger.log(
          formatRuleDependencyLog('domino.completed', {
            ruleId: event.ruleId,
            dependentRuleId: dependentRule.id,
            dependentRootId,
            generatedCount: bulkResult.generatedCount,
            lastClassEndDate: bulkResult.lastClassEndDate.toISOString(),
          }),
        );
      }
    } catch (error) {
      this.logger.error(
        formatRuleDependencyLog('domino.error', {
          ruleId: event.ruleId,
          classGroupId: event.classGroupId,
          message: error instanceof Error ? error.message : String(error),
        }),
        error instanceof Error ? error.stack : undefined,
      );
    }
  }
}

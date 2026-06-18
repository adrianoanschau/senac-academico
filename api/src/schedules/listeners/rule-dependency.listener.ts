import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '@/prisma/prisma.service';
import { ClassStatus } from '@/prisma/generated';
import {
  RULE_EVENTS,
  RuleEndDateChangedEvent,
} from '../events/rule-end-date-changed.event';
import { SchedulesService } from '../schedules.service';
import { dayAfterInScheduleTz } from '../utils/schedule-date.utils';
import {
  computeRemainingHours,
  resolveOriginalTotalHours,
  sumScheduleDurationMinutes,
} from '../utils/schedule-hours.utils';
import {
  dependentRuleWhere,
  resolveRuleRootId,
  ruleFamilyWhere,
} from '../utils/schedule-rule.utils';

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
      `[Efeito Dominó] Regra ${event.ruleId} (Turma: ${event.classGroupId}) teve data final alterada para ${event.newEndDate.toISOString()}.`,
    );

    try {
      const dependentRule = await this.prisma.scheduleRule.findFirst({
        where: dependentRuleWhere(event.ruleId),
      });

      if (!dependentRule) {
        this.logger.log(
          `[Efeito Dominó] Fim da cadeia. Nenhuma disciplina depende da regra ${event.ruleId}.`,
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

      const rootRule = dependentRule.rootRuleId
        ? await this.prisma.scheduleRule.findUnique({
            where: { id: dependentRule.rootRuleId },
          })
        : null;

      const completedClasses = await this.prisma.schedule.findMany({
        where: ruleFamilyWhere(dependentRootId, [ClassStatus.COMPLETED]),
      });

      const consumedMinutes = sumScheduleDurationMinutes(completedClasses);
      const originalTotalHours = resolveOriginalTotalHours(
        dependentRule,
        rootRule,
      );
      const remainingHours = computeRemainingHours(
        originalTotalHours,
        consumedMinutes,
      );

      if (remainingHours <= 0) {
        this.logger.log(
          `[Efeito Dominó] A regra dependente ${dependentRule.id} já teve toda a sua carga horária concluída.`,
        );
        return;
      }

      this.logger.log(
        `[Efeito Dominó] Recalculando ${dependentRule.id} a partir de ${newStartDate.toISOString()} com ${remainingHours}h restantes.`,
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
        this.eventEmitter.emit(
          RULE_EVENTS.END_DATE_CHANGED,
          new RuleEndDateChangedEvent(
            dependentRootId,
            bulkResult.lastClassEndDate,
            dependentRule.classGroupId,
          ),
        );
      }
    } catch (error) {
      this.logger.error(
        `[Efeito Dominó] Erro crítico ao propagar reagendamento: ${error instanceof Error ? error.message : error}`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }
}

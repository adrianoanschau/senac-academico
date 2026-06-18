import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { findOrThrow } from '@/common/entity.utils';
import { ClassStatus, Prisma } from '@/prisma/generated';
import { PrismaService } from '@/prisma/prisma.service';

import { MigrateRuleDto } from '../dto/migrate-rule.dto';
import { emitRuleEndDateChanged } from '../events/rule-end-date-changed.event';
import { ScheduleGeneratorService } from '../schedule-generator.service';
import {
  dayAfterInScheduleTz,
  startOfScheduleDay,
} from '../utils/schedule-date.utils';
import {
  buildScheduleProjections,
  persistPlannedSchedules,
} from '../utils/schedule-generation.utils';
import {
  computeRuleRemainingHours,
  resolveRuleRootId,
  RULE_MIGRATE_CONSUMED_STATUSES,
  ruleFamilyWhere,
} from '../utils/schedule-rule.utils';

@Injectable()
export class ScheduleRuleLifecycleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly generatorService: ScheduleGeneratorService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async migrateRulePattern(ruleId: string, dto: MigrateRuleDto) {
    const oldRule = findOrThrow(
      await this.prisma.scheduleRule.findUnique({
        where: { id: ruleId },
      }),
      `Regra de agendamento com ID ${ruleId} não encontrada.`,
    );

    const startOfDay = startOfScheduleDay(new Date(dto.transitionDate));
    const targetRootId = resolveRuleRootId(oldRule);

    const { newRule, lastClassEndDate } = await this.prisma.$transaction(
      async (tx) => {
        await tx.schedule.deleteMany({
          where: {
            AND: [
              ruleFamilyWhere(targetRootId, [
                ClassStatus.PLANNED,
                ClassStatus.SCHEDULED,
              ]),
              { startTime: { gte: startOfDay } },
            ],
          },
        });

        const remainingHours = await computeRuleRemainingHours(
          tx,
          oldRule,
          targetRootId,
          RULE_MIGRATE_CONSUMED_STATUSES,
        );

        if (remainingHours <= 0) {
          throw new BadRequestException(
            'A carga horária original já foi totalmente consumida.',
          );
        }

        const newRule = await tx.scheduleRule.create({
          data: {
            classGroupId: oldRule.classGroupId,
            subjectId: oldRule.subjectId,
            totalHours: remainingHours,
            daysOfWeek: dto.newDaysOfWeek || oldRule.daysOfWeek,
            startTimeStr: dto.newStartTimeStr || oldRule.startTimeStr,
            endTimeStr: dto.newEndTimeStr || oldRule.endTimeStr,
            professorId: dto.newProfessorId || oldRule.professorId,
            roomId: dto.newRoomId || oldRule.roomId,
            rootRuleId: targetRootId,
          },
        });

        const projections = await buildScheduleProjections(
          tx,
          this.generatorService,
          {
            from: startOfDay,
            classGroupId: newRule.classGroupId,
            professorId: newRule.professorId,
            roomId: newRule.roomId,
            daysOfWeek: newRule.daysOfWeek,
            startTimeStr: newRule.startTimeStr,
            endTimeStr: newRule.endTimeStr,
            totalHours: remainingHours,
          },
        );

        const { lastClassEndDate } = await persistPlannedSchedules(
          tx,
          newRule,
          projections,
        );

        return { newRule, lastClassEndDate };
      },
    );

    if (lastClassEndDate) {
      emitRuleEndDateChanged(
        this.eventEmitter,
        targetRootId,
        lastClassEndDate,
        oldRule.classGroupId,
      );
    }

    return {
      message: 'Padrão de aulas migrado com sucesso!',
      newRuleId: newRule.id,
    };
  }

  async publishRule(
    ruleId: string,
  ): Promise<{ message: string; count: number }> {
    const rule = findOrThrow(
      await this.prisma.scheduleRule.findUnique({
        where: { id: ruleId },
      }),
      `Regra de agendamento com ID ${ruleId} não encontrada.`,
    );

    const targetRootId = resolveRuleRootId(rule);

    const result = await this.prisma.schedule.updateMany({
      where: {
        ...ruleFamilyWhere(targetRootId, [ClassStatus.PLANNED]),
      },
      data: {
        status: ClassStatus.SCHEDULED,
      },
    });

    return {
      message: 'Aulas efetivadas com sucesso!',
      count: result.count,
    };
  }

  findRuleFamilyLastClass(
    ruleId: string,
    client: Prisma.TransactionClient | PrismaService = this.prisma,
  ) {
    return client.schedule.findFirst({
      where: ruleFamilyWhere(ruleId),
      orderBy: { endTime: 'desc' },
    });
  }

  async resolveDependencyStartDate(
    dependsOnRuleId: string,
    client: Prisma.TransactionClient | PrismaService = this.prisma,
  ): Promise<Date> {
    const dependencyLastClass = await client.schedule.findFirst({
      where: {
        ...ruleFamilyWhere(dependsOnRuleId, [
          ClassStatus.PLANNED,
          ClassStatus.SCHEDULED,
          ClassStatus.COMPLETED,
        ]),
      },
      orderBy: { endTime: 'desc' },
    });

    if (!dependencyLastClass) {
      throw new BadRequestException(
        `Falha no encadeamento: A disciplina anterior (Regra ID: ${dependsOnRuleId}) não possui aulas válidas futuras.`,
      );
    }

    return dayAfterInScheduleTz(dependencyLastClass.endTime);
  }
}

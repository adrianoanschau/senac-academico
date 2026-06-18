import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { ClassStatus, Prisma } from '@/prisma/generated';
import { PrismaService } from '@/prisma/prisma.service';

import { ScheduleConflictService } from '../conflict/schedule-conflict.service';
import { throwPostponeConfirmRequired } from '../constants/schedule-error.constants';
import { emitRuleEndDateChanged } from '../events/rule-end-date-changed.event';
import { ScheduleRuleLifecycleService } from '../rules/schedule-rule-lifecycle.service';
import {
  dayAfterInScheduleTz,
  findFirstRuleOccurrence as findFirstRuleOccurrenceSlot,
  parseFixedPostponeSlot,
} from '../utils/schedule-date.utils';
import {
  dependentRuleWhere,
  resolveRuleRootId,
  ruleFamilyWhere,
} from '../utils/schedule-rule.utils';

@Injectable()
export class SchedulePostponeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly conflictService: ScheduleConflictService,
    private readonly ruleLifecycleService: ScheduleRuleLifecycleService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async postponeClass(
    id: string,
    reason: string,
    newDateStr?: string,
    force?: boolean,
  ) {
    const original = await this.prisma.schedule.findUnique({
      where: { id },
      include: { rule: true },
    });

    if (!original?.rule) {
      throw new BadRequestException(
        `Aula com ID ${id} não possui regra atrelada para recálculo.`,
      );
    }

    const targetRootId = resolveRuleRootId(original.rule);

    const newSchedule = await this.prisma.$transaction((tx) =>
      this.postponeClassInTransaction(
        tx,
        id,
        reason,
        newDateStr,
        force,
        new Set<string>(),
      ),
    );

    const lastClass =
      await this.ruleLifecycleService.findRuleFamilyLastClass(targetRootId);

    if (lastClass) {
      emitRuleEndDateChanged(
        this.eventEmitter,
        targetRootId,
        lastClass.endTime,
        original.classGroupId,
      );
    }

    return {
      message: 'Reagendamento concluído com sucesso!',
      newSchedule,
    };
  }

  private async postponeClassInTransaction(
    tx: Prisma.TransactionClient,
    scheduleId: string,
    reason: string,
    newDateStr: string | undefined,
    force: boolean | undefined,
    visiting: Set<string>,
    chainTarget?: { startTime: Date; endTime: Date },
  ) {
    if (visiting.has(scheduleId)) {
      throw new BadRequestException(
        'Ciclo detectado ao propagar o adiamento entre disciplinas.',
      );
    }
    visiting.add(scheduleId);

    const classToMove = await tx.schedule.findUnique({
      where: { id: scheduleId },
      include: { rule: true },
    });

    if (!classToMove || !classToMove.rule) {
      throw new BadRequestException(
        `Aula com ID ${scheduleId} não possui regra atrelada para recálculo.`,
      );
    }

    const scheduleCtx = {
      id: classToMove.id,
      endTime: classToMove.endTime,
      rule: classToMove.rule,
    };

    if (classToMove.status === ClassStatus.COMPLETED) {
      throw new BadRequestException('Aulas concluídas não podem ser adiadas.');
    }

    const { rule } = scheduleCtx;
    const targetRootId = resolveRuleRootId(rule);
    const originalStatus = classToMove.status;

    let slot = await this.resolvePostponeSlot(
      tx,
      scheduleCtx,
      targetRootId,
      newDateStr,
      chainTarget,
    );

    const conflict = await this.conflictService.findPostponeConflict(
      tx,
      slot,
      rule,
      [scheduleId],
    );

    if (conflict) {
      if (newDateStr && !force) {
        throwPostponeConfirmRequired(conflict.subject?.name || 'Desconhecida');
      }

      if (!conflict.rule) {
        throw new BadRequestException(
          'A aula conflitante não possui uma regra atrelada para recálculo.',
        );
      }

      const nextChainTarget = await this.resolveChainTargetSlot(
        tx,
        conflict.rule,
        conflict.id,
      );

      await this.postponeClassInTransaction(
        tx,
        conflict.id,
        reason,
        undefined,
        true,
        visiting,
        nextChainTarget,
      );

      if (!newDateStr && !chainTarget) {
        slot = await this.computeEndOfRuleSlot(tx, scheduleCtx, targetRootId);
      }
    }

    if (classToMove.status === ClassStatus.PLANNED) {
      await tx.schedule.delete({ where: { id: scheduleId } });
    } else {
      await tx.schedule.update({
        where: { id: scheduleId },
        data: { status: ClassStatus.CANCELLED, cancelReason: reason },
      });
    }

    if (!newDateStr && !chainTarget) {
      slot = await this.computeEndOfRuleSlot(tx, scheduleCtx, targetRootId);
    }

    return tx.schedule.create({
      data: {
        classGroupId: rule.classGroupId,
        subjectId: rule.subjectId,
        professorId: rule.professorId,
        roomId: rule.roomId,
        ruleId: rule.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        status: originalStatus,
      },
    });
  }

  private async resolvePostponeSlot(
    tx: Prisma.TransactionClient,
    schedule: {
      id: string;
      endTime: Date;
      rule: {
        daysOfWeek: number[];
        startTimeStr: string;
        endTimeStr: string;
      };
    },
    targetRootId: string,
    newDateStr?: string,
    chainTarget?: { startTime: Date; endTime: Date },
  ): Promise<{ startTime: Date; endTime: Date }> {
    if (newDateStr) {
      return parseFixedPostponeSlot(newDateStr, schedule.rule);
    }

    if (chainTarget) {
      return chainTarget;
    }

    return this.computeEndOfRuleSlot(tx, schedule, targetRootId);
  }

  private async computeEndOfRuleSlot(
    tx: Prisma.TransactionClient,
    schedule: {
      id: string;
      endTime: Date;
      rule: {
        daysOfWeek: number[];
        startTimeStr: string;
        endTimeStr: string;
      };
    },
    targetRootId: string,
  ): Promise<{ startTime: Date; endTime: Date }> {
    const lastClass = await tx.schedule.findFirst({
      where: {
        AND: [ruleFamilyWhere(targetRootId), { id: { not: schedule.id } }],
      },
      orderBy: { endTime: 'desc' },
    });

    const nextDateToSearch = dayAfterInScheduleTz(
      lastClass?.endTime ?? schedule.endTime,
    );

    return this.findFirstRuleOccurrence(
      nextDateToSearch,
      schedule.rule.daysOfWeek,
      schedule.rule.startTimeStr,
      schedule.rule.endTimeStr,
    );
  }

  private async resolveChainTargetSlot(
    tx: Prisma.TransactionClient,
    rule: {
      id: string;
      rootRuleId: string | null;
      daysOfWeek: number[];
      startTimeStr: string;
      endTimeStr: string;
    },
    movingScheduleId: string,
  ): Promise<{ startTime: Date; endTime: Date }> {
    const ruleRootId = resolveRuleRootId(rule);

    const dependentRule = await tx.scheduleRule.findFirst({
      where: dependentRuleWhere(ruleRootId, rule.id),
    });

    if (!dependentRule) {
      const moving = await tx.schedule.findUnique({
        where: { id: movingScheduleId },
        include: { rule: true },
      });
      if (!moving || !moving.rule) {
        throw new BadRequestException('Aula em cascata não encontrada.');
      }
      return this.computeEndOfRuleSlot(
        tx,
        {
          id: moving.id,
          endTime: moving.endTime,
          rule: moving.rule,
        },
        ruleRootId,
      );
    }

    const dependentRootId = resolveRuleRootId(dependentRule);
    const firstDependentClass = await tx.schedule.findFirst({
      where: ruleFamilyWhere(dependentRootId, [
        ClassStatus.PLANNED,
        ClassStatus.SCHEDULED,
      ]),
      orderBy: { startTime: 'asc' },
    });

    if (!firstDependentClass) {
      const moving = await tx.schedule.findUnique({
        where: { id: movingScheduleId },
        include: { rule: true },
      });
      if (!moving || !moving.rule) {
        throw new BadRequestException('Aula em cascata não encontrada.');
      }
      return this.computeEndOfRuleSlot(
        tx,
        {
          id: moving.id,
          endTime: moving.endTime,
          rule: moving.rule,
        },
        ruleRootId,
      );
    }

    return {
      startTime: firstDependentClass.startTime,
      endTime: firstDependentClass.endTime,
    };
  }

  private findFirstRuleOccurrence(
    fromDate: Date,
    daysOfWeek: number[],
    startTimeStr: string,
    endTimeStr: string,
  ): { startTime: Date; endTime: Date } {
    const slot = findFirstRuleOccurrenceSlot(
      fromDate,
      daysOfWeek,
      startTimeStr,
      endTimeStr,
    );

    if (!slot) {
      throw new BadRequestException(
        'Erro ao projetar nova data: não há dias válidos no próximo ano.',
      );
    }

    return slot;
  }
}

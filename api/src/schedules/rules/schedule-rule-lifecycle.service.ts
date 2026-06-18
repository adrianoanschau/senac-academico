import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClassStatus, Prisma } from '@/prisma/generated';
import { PrismaService } from '@/prisma/prisma.service';
import { ScheduleGeneratorService } from '../schedule-generator.service';
import { MigrateRuleDto } from '../dto/migrate-rule.dto';
import {
  RULE_EVENTS,
  RuleEndDateChangedEvent,
} from '../events/rule-end-date-changed.event';
import { dayAfterInScheduleTz, startOfScheduleDay } from '../utils/schedule-date.utils';
import {
  computeRemainingHours,
  resolveOriginalTotalHours,
  sumScheduleDurationMinutes,
} from '../utils/schedule-hours.utils';
import {
  resolveRuleRootId,
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
    const oldRule = await this.prisma.scheduleRule.findUnique({
      where: { id: ruleId },
    });

    if (!oldRule) {
      throw new NotFoundException(
        `Regra de agendamento com ID ${ruleId} não encontrada.`,
      );
    }

    const startOfDay = startOfScheduleDay(new Date(dto.transitionDate));
    const targetRootId = resolveRuleRootId(oldRule);

    const { newRule, lastClassEndDate } = await this.prisma.$transaction(
      async (tx) => {
        const rootRule = oldRule.rootRuleId
          ? await tx.scheduleRule.findUnique({
              where: { id: oldRule.rootRuleId },
            })
          : null;
        const originalTotalHours = resolveOriginalTotalHours(oldRule, rootRule);

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

        const validClasses = await tx.schedule.findMany({
          where: ruleFamilyWhere(targetRootId, [
            ClassStatus.COMPLETED,
            ClassStatus.SCHEDULED,
            ClassStatus.PLANNED,
          ]),
        });

        const consumedMinutes = sumScheduleDurationMinutes(validClasses);
        const remainingHours = computeRemainingHours(
          originalTotalHours,
          consumedMinutes,
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

        const searchLimitDate = new Date(startOfDay);
        searchLimitDate.setFullYear(searchLimitDate.getFullYear() + 1);

        const orConditions: Prisma.ScheduleWhereInput[] = [];
        if (newRule.classGroupId)
          orConditions.push({ classGroupId: newRule.classGroupId });
        if (newRule.professorId)
          orConditions.push({ professorId: newRule.professorId });
        if (newRule.roomId) orConditions.push({ roomId: newRule.roomId });

        const existingSchedules = await tx.schedule.findMany({
          where: {
            ...(orConditions.length > 0 && { OR: orConditions }),
            startTime: { gte: startOfDay },
            endTime: { lte: searchLimitDate },
            status: { in: [ClassStatus.PLANNED, ClassStatus.SCHEDULED] },
          },
          select: { startTime: true, endTime: true },
        });

        const projections = await this.generatorService.generateProjections(
          startOfDay,
          newRule.daysOfWeek,
          newRule.startTimeStr,
          newRule.endTimeStr,
          remainingHours,
          existingSchedules,
        );

        if (projections.length > 0) {
          await tx.schedule.createMany({
            data: projections.map((proj) => ({
              classGroupId: newRule.classGroupId,
              subjectId: newRule.subjectId,
              professorId: newRule.professorId,
              roomId: newRule.roomId,
              startTime: proj.startTime,
              endTime: proj.endTime,
              ruleId: newRule.id,
              status: ClassStatus.PLANNED,
            })),
          });
        }

        const lastClassEndDate =
          projections.length > 0
            ? projections[projections.length - 1].endTime
            : null;

        return { newRule, lastClassEndDate };
      },
    );

    if (lastClassEndDate) {
      this.eventEmitter.emit(
        RULE_EVENTS.END_DATE_CHANGED,
        new RuleEndDateChangedEvent(
          targetRootId,
          lastClassEndDate,
          oldRule.classGroupId,
        ),
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
    const rule = await this.prisma.scheduleRule.findUnique({
      where: { id: ruleId },
    });

    if (!rule) {
      throw new NotFoundException(
        `Regra de agendamento com ID ${ruleId} não encontrada.`,
      );
    }

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

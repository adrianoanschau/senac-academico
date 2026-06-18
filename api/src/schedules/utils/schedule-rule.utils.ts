import { ClassStatus, Prisma } from '@/prisma/generated';
import { PrismaService } from '@/prisma/prisma.service';
import { computeRemainingHoursForClasses } from './schedule-hours.utils';

export const RULE_MIGRATE_CONSUMED_STATUSES: ClassStatus[] = [
  ClassStatus.COMPLETED,
  ClassStatus.SCHEDULED,
  ClassStatus.PLANNED,
];

export const RULE_DOMINO_CONSUMED_STATUSES: ClassStatus[] = [
  ClassStatus.COMPLETED,
];

export function resolveRuleRootId(rule: {
  id: string;
  rootRuleId: string | null;
}): string {
  return rule.rootRuleId ?? rule.id;
}

export function ruleFamilyWhere(
  ruleId: string,
  statuses: ClassStatus[] = [
    ClassStatus.SCHEDULED,
    ClassStatus.PLANNED,
    ClassStatus.COMPLETED,
  ],
): Prisma.ScheduleWhereInput {
  return {
    OR: [{ ruleId }, { rule: { rootRuleId: ruleId } }],
    status: { in: statuses },
  };
}

export function dependentRuleWhere(
  predecessorRuleId: string,
  alternatePredecessorId?: string,
): Prisma.ScheduleRuleWhereInput {
  if (
    alternatePredecessorId &&
    alternatePredecessorId !== predecessorRuleId
  ) {
    return {
      OR: [
        { dependsOnRuleId: predecessorRuleId },
        { dependsOnRuleId: alternatePredecessorId },
      ],
    };
  }

  return {
    dependsOnRuleId: predecessorRuleId,
  };
}

export interface PlannedScheduleRuleContext {
  id: string;
  classGroupId: string;
  subjectId: string;
  professorId: string;
  roomId: string;
}

export function mapSlotsToPlannedSchedules(
  rule: PlannedScheduleRuleContext,
  slots: Array<{ startTime: Date; endTime: Date }>,
): Prisma.ScheduleCreateManyInput[] {
  return slots.map((slot) => ({
    classGroupId: rule.classGroupId,
    subjectId: rule.subjectId,
    professorId: rule.professorId,
    roomId: rule.roomId,
    startTime: slot.startTime,
    endTime: slot.endTime,
    ruleId: rule.id,
    status: ClassStatus.PLANNED,
  }));
}

type ScheduleReadClient = PrismaService | Prisma.TransactionClient;

export async function computeRuleRemainingHours(
  client: ScheduleReadClient,
  rule: { totalHours: number; rootRuleId: string | null },
  rootId: string,
  consumedStatuses: ClassStatus[],
): Promise<number> {
  const rootRule = rule.rootRuleId
    ? await client.scheduleRule.findUnique({
        where: { id: rule.rootRuleId },
      })
    : null;

  const consumedClasses = await client.schedule.findMany({
    where: ruleFamilyWhere(rootId, consumedStatuses),
  });

  return computeRemainingHoursForClasses(rule, consumedClasses, rootRule);
}

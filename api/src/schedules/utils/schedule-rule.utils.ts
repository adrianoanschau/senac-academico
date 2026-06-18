import { ClassStatus, Prisma } from '@/prisma/generated';

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

export function ruleFamilyScheduleWhere(
  ruleId: string,
  statuses: ClassStatus[],
): Prisma.ScheduleWhereInput {
  return ruleFamilyWhere(ruleId, statuses);
}

import { Prisma } from '@/prisma/generated';
import { PrismaService } from '@/prisma/prisma.service';
import {
  ProjectedSchedule,
  ScheduleGeneratorService,
} from '../schedule-generator.service';
import { fetchOccupiedSlots } from './schedule-query.utils';
import {
  mapSlotsToPlannedSchedules,
  PlannedScheduleRuleContext,
} from './schedule-rule.utils';

type ScheduleReadClient = PrismaService | Prisma.TransactionClient;

export interface BuildScheduleProjectionsParams {
  from: Date;
  classGroupId: string;
  professorId: string;
  roomId: string;
  daysOfWeek: number[];
  startTimeStr: string;
  endTimeStr: string;
  totalHours: number;
}

export interface UpsertRuleForGenerationParams {
  existingRuleId?: string;
  dependsOnRuleId?: string | null;
  classGroupId: string;
  subjectId: string;
  professorId: string;
  roomId: string;
  daysOfWeek: number[];
  startTimeStr: string;
  endTimeStr: string;
  totalHours: number;
}

export interface PersistPlannedSchedulesResult {
  generatedCount: number;
  lastClassEndDate: Date | null;
  lastClassDate: Date | null;
}

export interface PersistGeneratedScheduleBatchResult
  extends PersistPlannedSchedulesResult {
  ruleId: string;
}

export async function buildScheduleProjections(
  client: ScheduleReadClient,
  generator: ScheduleGeneratorService,
  params: BuildScheduleProjectionsParams,
): Promise<ProjectedSchedule[]> {
  const existingSchedules = await fetchOccupiedSlots(client, {
    from: params.from,
    classGroupId: params.classGroupId,
    professorIds: params.professorId,
    roomIds: params.roomId,
  });

  return generator.generateProjections(
    params.from,
    params.daysOfWeek,
    params.startTimeStr,
    params.endTimeStr,
    params.totalHours,
    existingSchedules,
  );
}

export async function upsertRuleForGeneration(
  tx: Prisma.TransactionClient,
  params: UpsertRuleForGenerationParams,
): Promise<string> {
  const {
    existingRuleId,
    dependsOnRuleId,
    classGroupId,
    subjectId,
    professorId,
    roomId,
    daysOfWeek,
    startTimeStr,
    endTimeStr,
    totalHours,
  } = params;

  if (existingRuleId) {
    await tx.scheduleRule.update({
      where: { id: existingRuleId },
      data: {
        daysOfWeek,
        startTimeStr,
        endTimeStr,
        professorId,
        roomId,
        dependsOnRuleId,
      },
    });
    return existingRuleId;
  }

  const rule = await tx.scheduleRule.create({
    data: {
      daysOfWeek,
      startTimeStr,
      endTimeStr,
      totalHours,
      classGroupId,
      subjectId,
      professorId,
      roomId,
      dependsOnRuleId,
    },
  });

  return rule.id;
}

export async function persistPlannedSchedules(
  tx: Prisma.TransactionClient,
  rule: PlannedScheduleRuleContext,
  projections: Array<{ startTime: Date; endTime: Date }>,
): Promise<PersistPlannedSchedulesResult> {
  if (projections.length === 0) {
    return {
      generatedCount: 0,
      lastClassEndDate: null,
      lastClassDate: null,
    };
  }

  const created = await tx.schedule.createMany({
    data: mapSlotsToPlannedSchedules(rule, projections),
  });

  const lastProjection = projections[projections.length - 1];

  return {
    generatedCount: created.count,
    lastClassEndDate: lastProjection.endTime,
    lastClassDate: lastProjection.startTime,
  };
}

export async function persistGeneratedScheduleBatch(
  tx: Prisma.TransactionClient,
  params: UpsertRuleForGenerationParams,
  projections: Array<{ startTime: Date; endTime: Date }>,
): Promise<PersistGeneratedScheduleBatchResult> {
  const ruleId = await upsertRuleForGeneration(tx, params);

  const persistResult = await persistPlannedSchedules(
    tx,
    {
      id: ruleId,
      classGroupId: params.classGroupId,
      subjectId: params.subjectId,
      professorId: params.professorId,
      roomId: params.roomId,
    },
    projections,
  );

  return {
    ruleId,
    ...persistResult,
  };
}

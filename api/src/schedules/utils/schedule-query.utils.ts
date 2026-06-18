import { ClassStatus, Prisma } from '@/prisma/generated';
import { PrismaService } from '@/prisma/prisma.service';
import { addYears } from './schedule-date.utils';
import { FindSchedulesQueryDto } from '../dto/find-schedules-query.dto';
import {
  SCHEDULES_DEFAULT_PAGE_LIMIT,
  SCHEDULES_MAX_PAGE_LIMIT,
} from '../constants/schedule-query.constants';

export { SCHEDULES_DEFAULT_PAGE_LIMIT, SCHEDULES_MAX_PAGE_LIMIT };

export interface SchedulesPageMeta {
  limit: number;
  hasMore: boolean;
  nextCursor: string | null;
}

export interface SchedulesFindAllResult<T> {
  data: T[];
  meta?: SchedulesPageMeta;
}

export function buildScheduleWhereInput(
  query: FindSchedulesQueryDto,
): Prisma.ScheduleWhereInput {
  const {
    start,
    end,
    classGroupId,
    professorId,
    roomId,
    subjectId,
    status,
    search,
    cursor,
  } = query;

  const andConditions: Prisma.ScheduleWhereInput[] = [];

  if (start && end) {
    andConditions.push(...buildDateRangeOverlapConditions(start, end));
  }

  if (cursor) {
    andConditions.push({ startTime: { gt: new Date(cursor) } });
  }

  if (search) {
    andConditions.push({
      OR: [
        {
          subject: {
            name: { contains: search, mode: 'insensitive' },
          },
        },
        {
          subject: {
            code: { contains: search, mode: 'insensitive' },
          },
        },
        {
          professor: {
            name: { contains: search, mode: 'insensitive' },
          },
        },
        {
          classGroup: {
            code: { contains: search, mode: 'insensitive' },
          },
        },
        {
          room: {
            name: { contains: search, mode: 'insensitive' },
          },
        },
      ],
    });
  }

  const whereCondition: Prisma.ScheduleWhereInput = {
    ...(andConditions.length > 0 && { AND: andConditions }),
  };

  if (classGroupId) whereCondition.classGroupId = classGroupId;
  if (professorId) whereCondition.professorId = professorId;
  if (roomId) whereCondition.roomId = roomId;
  if (subjectId) whereCondition.subjectId = subjectId;

  if (status?.length) {
    whereCondition.status = { in: status as ClassStatus[] };
  }

  return whereCondition;
}

export function resolveSchedulePageLimit(limit?: number): number | undefined {
  if (limit === undefined) {
    return undefined;
  }

  return Math.min(Math.max(limit, 1), SCHEDULES_MAX_PAGE_LIMIT);
}

export function buildOverlapWhere(slot: {
  startTime: Date;
  endTime: Date;
}): Pick<Prisma.ScheduleWhereInput, 'startTime' | 'endTime'> {
  return {
    startTime: { lt: slot.endTime },
    endTime: { gt: slot.startTime },
  };
}

export function buildDateRangeOverlapConditions(
  start: string,
  end: string,
): Prisma.ScheduleWhereInput[] {
  return [
    { startTime: { lt: new Date(end) } },
    { endTime: { gt: new Date(start) } },
  ];
}

export interface OccupiedSlotsResourceFilter {
  classGroupId?: string;
  professorIds?: string | string[];
  roomIds?: string | string[];
}

function normalizeIdList(ids?: string | string[]): string[] {
  if (!ids) return [];
  const list = Array.isArray(ids) ? ids : [ids];
  return list.filter(Boolean);
}

export function buildResourceOrConditions(
  resources: OccupiedSlotsResourceFilter,
): Prisma.ScheduleWhereInput[] {
  const conditions: Prisma.ScheduleWhereInput[] = [];

  if (resources.classGroupId) {
    conditions.push({ classGroupId: resources.classGroupId });
  }

  const professorIds = normalizeIdList(resources.professorIds);
  if (professorIds.length === 1) {
    conditions.push({ professorId: professorIds[0] });
  } else if (professorIds.length > 1) {
    conditions.push({ professorId: { in: professorIds } });
  }

  const roomIds = normalizeIdList(resources.roomIds);
  if (roomIds.length === 1) {
    conditions.push({ roomId: roomIds[0] });
  } else if (roomIds.length > 1) {
    conditions.push({ roomId: { in: roomIds } });
  }

  return conditions;
}

type ScheduleReadClient = PrismaService | Prisma.TransactionClient;

export async function fetchOccupiedSlots(
  client: ScheduleReadClient,
  params: {
    from: Date;
    yearsAhead?: number;
    classGroupId?: string;
    professorIds?: string | string[];
    roomIds?: string | string[];
  },
): Promise<Array<{ startTime: Date; endTime: Date }>> {
  const { from, yearsAhead = 1, classGroupId, professorIds, roomIds } =
    params;

  const orConditions = buildResourceOrConditions({
    classGroupId,
    professorIds,
    roomIds,
  });

  const searchLimit = addYears(from, yearsAhead);

  return client.schedule.findMany({
    where: {
      ...(orConditions.length > 0 && { OR: orConditions }),
      startTime: { gte: from },
      endTime: { lte: searchLimit },
      status: { in: [ClassStatus.PLANNED, ClassStatus.SCHEDULED] },
    },
    select: { startTime: true, endTime: true },
  });
}

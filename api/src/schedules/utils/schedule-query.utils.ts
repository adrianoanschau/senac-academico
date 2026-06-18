import { ClassStatus, Prisma } from '@/prisma/generated';
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
    andConditions.push(
      { startTime: { lt: new Date(end) } },
      { endTime: { gt: new Date(start) } },
    );
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

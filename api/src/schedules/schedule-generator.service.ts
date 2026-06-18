import { Injectable } from '@nestjs/common';

import { OverrideType } from '@/prisma/generated';

import { PrismaService } from '../prisma/prisma.service';
import {
  buildScheduleSlotWithDuration,
  dailyClassDurationMinutes,
  dayAfterInScheduleTz,
  getScheduleWeekday,
  intervalsOverlap,
  startOfScheduleDay,
} from './utils/schedule-date.utils';
import { hoursToMinutes } from './utils/schedule-hours.utils';

export interface ProjectedSchedule {
  startTime: Date;
  endTime: Date;
  durationInMinutes: number;
}

interface CachedOverrides {
  expiresAt: number;
  items: Array<{
    type: OverrideType;
    startTime: Date;
    endTime: Date;
  }>;
}

const OVERRIDES_CACHE_TTL_MS = 60_000;

@Injectable()
export class ScheduleGeneratorService {
  private overridesCache: CachedOverrides | null = null;

  constructor(private readonly prisma: PrismaService) {}

  async generateProjections(
    startDate: Date,
    daysOfWeek: number[],
    startTimeStr: string,
    endTimeStr: string,
    totalSubjectHours: number,
    existingSchedules: { startTime: Date; endTime: Date }[] = [],
  ): Promise<ProjectedSchedule[]> {
    const projections: ProjectedSchedule[] = [];
    let remainingMinutes = hoursToMinutes(totalSubjectHours);
    const dailyClassDuration = dailyClassDurationMinutes(
      startTimeStr,
      endTimeStr,
    );

    const overrides = await this.loadOverridesFrom(startDate);

    let cursorDate = startOfScheduleDay(startDate);
    let safetyCounter = 0;
    const MAX_DAYS_PROJECTION = 730;

    while (remainingMinutes > 0 && safetyCounter < MAX_DAYS_PROJECTION) {
      safetyCounter++;
      const dayOfWeek = getScheduleWeekday(cursorDate);

      const minutesForThisClass =
        remainingMinutes < dailyClassDuration
          ? remainingMinutes
          : dailyClassDuration;

      const { startTime: proposedStart, endTime: proposedEnd } =
        buildScheduleSlotWithDuration(
          cursorDate,
          startTimeStr,
          minutesForThisClass,
        );

      const proposedSlot = { startTime: proposedStart, endTime: proposedEnd };

      const isBlocked = overrides.some(
        (override) =>
          override.type === OverrideType.BLOCK &&
          intervalsOverlap(proposedSlot, override),
      );

      if (isBlocked) {
        cursorDate = dayAfterInScheduleTz(cursorDate);
        continue;
      }

      const isExtraDay = overrides.some(
        (override) =>
          override.type === OverrideType.EXTRA_DAY &&
          override.startTime <= proposedStart &&
          override.endTime >= proposedEnd,
      );

      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isAllowedDay = daysOfWeek.includes(dayOfWeek);

      if (isExtraDay || (!isWeekend && isAllowedDay)) {
        if (
          existingSchedules.some((schedule) =>
            intervalsOverlap(proposedSlot, schedule),
          )
        ) {
          cursorDate = dayAfterInScheduleTz(cursorDate);
          continue;
        }

        projections.push({
          startTime: proposedStart,
          endTime: proposedEnd,
          durationInMinutes: minutesForThisClass,
        });

        remainingMinutes -= minutesForThisClass;
      }

      cursorDate = dayAfterInScheduleTz(cursorDate);
    }

    return projections;
  }

  clearOverridesCache(): void {
    this.overridesCache = null;
  }

  private async loadOverridesFrom(startDate: Date) {
    const now = Date.now();

    if (!this.overridesCache || this.overridesCache.expiresAt <= now) {
      const items = await this.prisma.scheduleOverride.findMany({
        orderBy: { startTime: 'asc' },
      });

      this.overridesCache = {
        items,
        expiresAt: now + OVERRIDES_CACHE_TTL_MS,
      };
    }

    return this.overridesCache.items.filter(
      (override) => override.endTime >= startDate,
    );
  }
}

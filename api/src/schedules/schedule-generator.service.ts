import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  buildScheduleSlotWithDuration,
  dailyClassDurationMinutes,
  dayAfterInScheduleTz,
  getScheduleWeekday,
  startOfScheduleDay,
} from './utils/schedule-date.utils';
import { hoursToMinutes } from './utils/schedule-hours.utils';

export interface ProjectedSchedule {
  startTime: Date;
  endTime: Date;
  durationInMinutes: number;
}

@Injectable()
export class ScheduleGeneratorService {
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

    const overrides = await this.prisma.scheduleOverride.findMany({
      where: {
        endTime: { gte: startDate },
      },
    });

    let cursorDate = startOfScheduleDay(startDate);
    let safetyCounter = 0;
    const MAX_DAYS_PROJECTION = 730;

    const hasConflict = (
      targetStartTime: Date,
      targetEndTime: Date,
      schedules: { startTime: Date; endTime: Date }[],
    ) => {
      return schedules.some(
        (schedule) =>
          schedule.startTime < targetEndTime &&
          schedule.endTime > targetStartTime,
      );
    };

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

      const isBlocked = overrides.some(
        (override) =>
          override.type === 'BLOCK' &&
          override.startTime < proposedEnd &&
          override.endTime > proposedStart,
      );

      if (isBlocked) {
        cursorDate = dayAfterInScheduleTz(cursorDate);
        continue;
      }

      const isExtraDay = overrides.some(
        (override) =>
          override.type === 'EXTRA_DAY' &&
          override.startTime <= proposedStart &&
          override.endTime >= proposedEnd,
      );

      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isAllowedDay = daysOfWeek.includes(dayOfWeek);

      if (isExtraDay || (!isWeekend && isAllowedDay)) {
        if (hasConflict(proposedStart, proposedEnd, existingSchedules)) {
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
}

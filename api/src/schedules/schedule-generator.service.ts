import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
  ): Promise<ProjectedSchedule[]> {
    const projections: ProjectedSchedule[] = [];
    // Usa Math.round para evitar dízimas de ponto flutuante que causam criação de aulas fantasmas
    let remainingMinutes = Math.round(totalSubjectHours * 60);

    const [startHour, startMin] = startTimeStr.split(':').map(Number);
    const [endHour, endMin] = endTimeStr.split(':').map(Number);
    const dailyClassDuration =
      endHour * 60 + endMin - (startHour * 60 + startMin);

    const overrides = await this.prisma.scheduleOverride.findMany({
      where: {
        endTime: { gte: startDate },
      },
    });

    const cursorDate = new Date(startDate);
    cursorDate.setHours(0, 0, 0, 0);

    let safetyCounter = 0;
    const MAX_DAYS_PROJECTION = 730;

    while (remainingMinutes > 0 && safetyCounter < MAX_DAYS_PROJECTION) {
      safetyCounter++;
      const dayOfWeek = cursorDate.getDay();

      const proposedStart = new Date(cursorDate);
      proposedStart.setHours(startHour, startMin, 0, 0);

      const minutesForThisClass =
        remainingMinutes < dailyClassDuration
          ? remainingMinutes
          : dailyClassDuration;

      const proposedEnd = new Date(proposedStart);
      proposedEnd.setMinutes(proposedStart.getMinutes() + minutesForThisClass);

      const isBlocked = overrides.some(
        (override) =>
          override.type === 'BLOCK' &&
          override.startTime < proposedEnd &&
          override.endTime > proposedStart,
      );

      if (isBlocked) {
        cursorDate.setDate(cursorDate.getDate() + 1);
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
        projections.push({
          startTime: proposedStart,
          endTime: proposedEnd,
          durationInMinutes: minutesForThisClass,
        });

        remainingMinutes -= minutesForThisClass;
      }

      cursorDate.setDate(cursorDate.getDate() + 1);
    }

    return projections;
  }
}

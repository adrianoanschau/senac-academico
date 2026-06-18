import { Injectable } from '@nestjs/common';

import { findOrThrow } from '@/common/entity.utils';
import { assertValidTimeRange } from '@/common/validation.utils';
import { PrismaService } from '@/prisma/prisma.service';

import { CreateScheduleOverrideDto } from './dto/create-schedule-override.dto';
import { UpdateScheduleOverrideDto } from './dto/update-schedule-override.dto';

@Injectable()
export class ScheduleOverridesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createScheduleOverrideDto: CreateScheduleOverrideDto) {
    const { startTime, endTime } = createScheduleOverrideDto;
    assertValidTimeRange(startTime, endTime);

    return this.prisma.scheduleOverride.create({
      data: createScheduleOverrideDto,
    });
  }

  async findAll() {
    return this.prisma.scheduleOverride.findMany({
      orderBy: { startTime: 'asc' },
    });
  }

  async findOne(id: string) {
    const override = await this.prisma.scheduleOverride.findUnique({
      where: { id },
    });

    return findOrThrow(
      override,
      `Regra de calendário com ID ${id} não encontrada.`,
    );
  }

  async update(
    id: string,
    updateScheduleOverrideDto: UpdateScheduleOverrideDto,
  ) {
    const existing = await this.findOne(id);
    const startTime = updateScheduleOverrideDto.startTime ?? existing.startTime;
    const endTime = updateScheduleOverrideDto.endTime ?? existing.endTime;
    assertValidTimeRange(startTime, endTime);

    return this.prisma.scheduleOverride.update({
      where: { id },
      data: updateScheduleOverrideDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.scheduleOverride.delete({
      where: { id },
    });
  }
}

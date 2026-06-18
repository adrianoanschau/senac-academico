import { Injectable } from '@nestjs/common';

import { findOrThrow } from '@/common/entity.utils';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ScheduleRulesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(classGroupId?: string) {
    return this.prisma.scheduleRule.findMany({
      where: classGroupId ? { classGroupId } : undefined,
      include: {
        subject: true,
        professor: true,
        room: true,
        classGroup: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const rule = await this.prisma.scheduleRule.findUnique({
      where: { id },
      include: {
        subject: true,
        professor: true,
        room: true,
        classGroup: true,
        schedules: {
          orderBy: { startTime: 'asc' },
        },
      },
    });

    return findOrThrow(
      rule,
      `Regra de agendamento com ID ${id} não encontrada.`,
    );
  }
}

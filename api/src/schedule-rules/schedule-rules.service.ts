import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    if (!rule) {
      throw new NotFoundException(
        `Regra de agendamento com ID ${id} não encontrada.`,
      );
    }

    return rule;
  }
}

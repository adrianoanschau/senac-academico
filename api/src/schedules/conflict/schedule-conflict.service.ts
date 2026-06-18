import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ClassStatus, Prisma } from '@/prisma/generated';
import { PrismaService } from '@/prisma/prisma.service';

export interface ScheduleConflictParams {
  startTime: Date;
  endTime: Date;
  roomId: string;
  professorId: string;
  excludeId?: string;
}

@Injectable()
export class ScheduleConflictService {
  constructor(private readonly prisma: PrismaService) {}

  async assertNoScheduleConflicts(
    params: ScheduleConflictParams,
  ): Promise<void> {
    const { startTime, endTime, roomId, professorId, excludeId } = params;

    if (startTime >= endTime) {
      throw new BadRequestException(
        'O horário de início deve ser obrigatoriamente anterior ao horário de término.',
      );
    }

    const excludeFilter: Prisma.ScheduleWhereInput = excludeId
      ? { id: { not: excludeId } }
      : {};

    const roomConflict = await this.prisma.schedule.findFirst({
      where: {
        roomId,
        startTime: { lt: endTime },
        endTime: { gt: startTime },
        status: { not: ClassStatus.CANCELLED },
        ...excludeFilter,
      },
      include: { classGroup: true },
    });

    if (roomConflict) {
      throw new ConflictException(
        `Choque de Sala: Este ambiente já está ocupado pela turma ${roomConflict.classGroup.code} neste mesmo horário.`,
      );
    }

    const professorConflict = await this.prisma.schedule.findFirst({
      where: {
        professorId,
        startTime: { lt: endTime },
        endTime: { gt: startTime },
        status: { not: ClassStatus.CANCELLED },
        ...excludeFilter,
      },
      include: { classGroup: true },
    });

    if (professorConflict) {
      throw new ConflictException(
        `Choque de Professor: Este professor já está dando aula para a turma ${professorConflict.classGroup.code} neste mesmo horário.`,
      );
    }
  }

  findPostponeConflict(
    tx: Prisma.TransactionClient,
    slot: { startTime: Date; endTime: Date },
    rule: {
      classGroupId: string;
      professorId: string;
      roomId: string;
    },
    excludeIds: string[],
  ) {
    return tx.schedule.findFirst({
      where: {
        OR: [
          { classGroupId: rule.classGroupId },
          { professorId: rule.professorId },
          { roomId: rule.roomId },
        ],
        startTime: { lt: slot.endTime },
        endTime: { gt: slot.startTime },
        status: { in: [ClassStatus.SCHEDULED, ClassStatus.PLANNED] },
        id: { notIn: excludeIds },
      },
      include: { subject: true, rule: true },
    });
  }
}

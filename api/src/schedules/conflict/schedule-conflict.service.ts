import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { ClassStatus, Prisma } from '@/prisma/generated';
import { PrismaService } from '@/prisma/prisma.service';

import {
  buildOverlapWhere,
  buildResourceOrConditions,
} from '../utils/schedule-query.utils';

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

    const slot = { startTime, endTime };
    const excludeFilter: Prisma.ScheduleWhereInput = excludeId
      ? { id: { not: excludeId } }
      : {};

    const roomConflict = await this.findPersistedOverlapConflict(
      { roomId },
      slot,
      excludeFilter,
    );

    if (roomConflict) {
      throw new ConflictException(
        `Choque de Sala: Este ambiente já está ocupado pela turma ${roomConflict.classGroup.code} neste mesmo horário.`,
      );
    }

    const professorConflict = await this.findPersistedOverlapConflict(
      { professorId },
      slot,
      excludeFilter,
    );

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
    const orConditions = buildResourceOrConditions({
      classGroupId: rule.classGroupId,
      professorIds: rule.professorId,
      roomIds: rule.roomId,
    });

    return tx.schedule.findFirst({
      where: {
        ...(orConditions.length > 0 && { OR: orConditions }),
        ...buildOverlapWhere(slot),
        status: { in: [ClassStatus.SCHEDULED, ClassStatus.PLANNED] },
        id: { notIn: excludeIds },
      },
      include: { subject: true, rule: true },
    });
  }

  private findPersistedOverlapConflict(
    resourceFilter: Prisma.ScheduleWhereInput,
    slot: { startTime: Date; endTime: Date },
    excludeFilter: Prisma.ScheduleWhereInput,
  ) {
    return this.prisma.schedule.findFirst({
      where: {
        ...resourceFilter,
        ...buildOverlapWhere(slot),
        status: { not: ClassStatus.CANCELLED },
        ...excludeFilter,
      },
      include: { classGroup: true },
    });
  }
}

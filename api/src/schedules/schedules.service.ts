import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma, ClassStatus } from '@/prisma/generated';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleGeneratorService } from './schedule-generator.service';
import { GenerateSchedulesDto } from './dto/generate-schedules.dto';
import { MigrateRuleDto } from './dto/migrate-rule.dto';
import { FindSchedulesQueryDto } from './dto/find-schedules-query.dto';
import { throwPostponeConfirmRequired } from './constants/schedule-error.constants';
import {
  dayAfterInScheduleTz,
  findFirstRuleOccurrence as findFirstRuleOccurrenceSlot,
  parseFixedPostponeSlot,
  startOfScheduleDay,
} from './utils/schedule-date.utils';
import {
  computeRemainingHours,
  resolveOriginalTotalHours,
  sumScheduleDurationMinutes,
} from './utils/schedule-hours.utils';
import {
  dependentRuleWhere,
  resolveRuleRootId,
  ruleFamilyWhere,
} from './utils/schedule-rule.utils';
import {
  RULE_EVENTS,
  RuleEndDateChangedEvent,
} from './events/rule-end-date-changed.event';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly generatorService: ScheduleGeneratorService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const { startTime, endTime, roomId, professorId } = createScheduleDto;

    await this.assertNoScheduleConflicts({
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      roomId,
      professorId,
    });

    return this.prisma.schedule.create({
      data: createScheduleDto,
      include: {
        professor: true,
        room: true,
        subject: true,
        classGroup: true,
      },
    });
  }

  async findAll(query: FindSchedulesQueryDto) {
    const {
      start,
      end,
      classGroupId,
      professorId,
      roomId,
      subjectId,
      status,
      search,
    } = query;

    const andConditions: Prisma.ScheduleWhereInput[] = [];

    if (start && end) {
      andConditions.push(
        { startTime: { lt: new Date(end) } },
        { endTime: { gt: new Date(start) } },
      );
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
      whereCondition.status = { in: status };
    }

    return this.prisma.schedule.findMany({
      where: whereCondition,
      include: {
        professor: true,
        room: true,
        subject: true,
        classGroup: {
          include: {
            curriculum: {
              include: { course: true },
            },
          },
        },
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async findOne(id: string) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
      include: {
        professor: true,
        room: true,
        subject: true,
        classGroup: true,
      },
    });

    if (!schedule) {
      throw new NotFoundException(`Aula com ID ${id} não encontrada.`);
    }

    return schedule;
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    const existing = await this.findOne(id);

    const startTime = updateScheduleDto.startTime ?? existing.startTime;
    const endTime = updateScheduleDto.endTime ?? existing.endTime;
    const roomId = updateScheduleDto.roomId ?? existing.roomId;
    const professorId = updateScheduleDto.professorId ?? existing.professorId;

    await this.assertNoScheduleConflicts({
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      roomId,
      professorId,
      excludeId: id,
    });

    return this.prisma.schedule.update({
      where: { id },
      data: updateScheduleDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.schedule.delete({
      where: { id },
    });
  }

  async generateBulk(dto: GenerateSchedulesDto) {
    const {
      classGroupId,
      subjectId,
      professorId,
      roomId,
      startDate,
      daysOfWeek,
      startTimeStr,
      endTimeStr,
      dependsOnRuleId,
      remainingHours,
      existingRuleId,
    } = dto;

    // 1. Busca a disciplina
    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) {
      throw new NotFoundException(`Disciplina não encontrada.`);
    }

    // 2. Resolução Dinâmica de Data (A Magia da Lista Encadeada)
    let actualStartDate = new Date(startDate);

    if (dependsOnRuleId) {
      actualStartDate = await this.resolveDependencyStartDate(dependsOnRuleId);
    }

    // 3. Define um limite seguro de busca (ex: data de início + 1 ano)
    const searchLimitDate = new Date(actualStartDate);
    searchLimitDate.setFullYear(searchLimitDate.getFullYear() + 1);

    // 4. UMA única query no Prisma buscando schedules existentes nesse período para validar conflitos
    const existingSchedules = await this.prisma.schedule.findMany({
      where: {
        OR: [{ classGroupId }, { professorId }, { roomId }],
        startTime: { gte: actualStartDate },
        endTime: { lte: searchLimitDate },
        status: { in: [ClassStatus.PLANNED, ClassStatus.SCHEDULED] },
      },
      select: { startTime: true, endTime: true },
    });

    // 5. Chama o Motor para projetar as datas (agora resiliente a conflitos)
    const projections = await this.generatorService.generateProjections(
      actualStartDate,
      daysOfWeek,
      startTimeStr,
      endTimeStr,
      remainingHours !== undefined ? remainingHours : subject.hours,
      existingSchedules,
    );

    if (projections.length === 0) {
      throw new BadRequestException(
        'Não foi possível gerar nenhuma data válida com estes parâmetros.',
      );
    }

    // 6. Salva a Regra e as Aulas numa Transação Segura (via createMany)
    // O $transaction garante que ou tudo é salvo perfeitamente, ou nada é salvo.
    const result = await this.prisma.$transaction(async (prisma) => {
      // A. Atualiza a Regra Existente ou Cria uma Nova (ScheduleRule)
      let ruleId = existingRuleId;

      if (existingRuleId) {
        await prisma.scheduleRule.update({
          where: { id: existingRuleId },
          data: {
            daysOfWeek,
            startTimeStr,
            endTimeStr,
            professorId,
            roomId,
            dependsOnRuleId,
          },
        });
      } else {
        const rule = await prisma.scheduleRule.create({
          data: {
            daysOfWeek,
            startTimeStr,
            endTimeStr,
            totalHours: subject.hours,
            classGroupId,
            subjectId,
            professorId,
            roomId,
            dependsOnRuleId,
          },
        });
        ruleId = rule.id;
      }

      // B. Prepara o array de aulas, agora injetando o ruleId
      const schedulesToCreate = projections.map((proj) => ({
        classGroupId,
        subjectId,
        professorId,
        roomId,
        startTime: proj.startTime,
        endTime: proj.endTime,
        ruleId: ruleId as string, // <-- Conecta a aula à sua regra de origem
        status: ClassStatus.PLANNED, // Opcional, pois é o default, mas bom para clareza
      }));

      // C. Salva todas as aulas
      const createdSchedules = await prisma.schedule.createMany({
        data: schedulesToCreate,
      });

      return { count: createdSchedules.count, ruleId: ruleId as string };
    });

    const lastProjection = projections[projections.length - 1];

    return {
      message: `Grade gerada com sucesso! ${result.count} aulas foram alocadas e a regra foi salva no histórico.`,
      generatedCount: result.count,
      ruleId: result.ruleId,
      lastClassDate: lastProjection.startTime,
      lastClassEndDate: lastProjection.endTime,
    };
  }

  async migrateRulePattern(ruleId: string, dto: MigrateRuleDto) {
    // 1. Busca a regra antiga
    const oldRule = await this.prisma.scheduleRule.findUnique({
      where: { id: ruleId },
    });

    if (!oldRule) {
      throw new NotFoundException(
        `Regra de agendamento com ID ${ruleId} não encontrada.`,
      );
    }

    const startOfDay = startOfScheduleDay(new Date(dto.transitionDate));

    const targetRootId = resolveRuleRootId(oldRule);

    // Limpeza, criação da regra e geração das aulas numa única transação
    const { newRule, lastClassEndDate } = await this.prisma.$transaction(
      async (tx) => {
        const rootRule = oldRule.rootRuleId
          ? await tx.scheduleRule.findUnique({
              where: { id: oldRule.rootRuleId },
            })
          : null;
        const originalTotalHours = resolveOriginalTotalHours(oldRule, rootRule);

        await tx.schedule.deleteMany({
          where: {
            AND: [
              ruleFamilyWhere(targetRootId, [
                ClassStatus.PLANNED,
                ClassStatus.SCHEDULED,
              ]),
              { startTime: { gte: startOfDay } },
            ],
          },
        });

        const validClasses = await tx.schedule.findMany({
          where: ruleFamilyWhere(targetRootId, [
            ClassStatus.COMPLETED,
            ClassStatus.SCHEDULED,
            ClassStatus.PLANNED,
          ]),
        });

        const consumedMinutes = sumScheduleDurationMinutes(validClasses);
        const remainingHours = computeRemainingHours(
          originalTotalHours,
          consumedMinutes,
        );

        if (remainingHours <= 0) {
          throw new BadRequestException(
            'A carga horária original já foi totalmente consumida.',
          );
        }

        const newRule = await tx.scheduleRule.create({
          data: {
            classGroupId: oldRule.classGroupId,
            subjectId: oldRule.subjectId,
            totalHours: remainingHours,
            daysOfWeek: dto.newDaysOfWeek || oldRule.daysOfWeek,
            startTimeStr: dto.newStartTimeStr || oldRule.startTimeStr,
            endTimeStr: dto.newEndTimeStr || oldRule.endTimeStr,
            professorId: dto.newProfessorId || oldRule.professorId,
            roomId: dto.newRoomId || oldRule.roomId,
            rootRuleId: targetRootId,
          },
        });

        const searchLimitDate = new Date(startOfDay);
        searchLimitDate.setFullYear(searchLimitDate.getFullYear() + 1);

        const orConditions: Prisma.ScheduleWhereInput[] = [];
        if (newRule.classGroupId)
          orConditions.push({ classGroupId: newRule.classGroupId });
        if (newRule.professorId)
          orConditions.push({ professorId: newRule.professorId });
        if (newRule.roomId) orConditions.push({ roomId: newRule.roomId });

        const existingSchedules = await tx.schedule.findMany({
          where: {
            ...(orConditions.length > 0 && { OR: orConditions }),
            startTime: { gte: startOfDay },
            endTime: { lte: searchLimitDate },
            status: { in: [ClassStatus.PLANNED, ClassStatus.SCHEDULED] },
          },
          select: { startTime: true, endTime: true },
        });

        const projections = await this.generatorService.generateProjections(
          startOfDay,
          newRule.daysOfWeek,
          newRule.startTimeStr,
          newRule.endTimeStr,
          remainingHours,
          existingSchedules,
        );

        if (projections.length > 0) {
          await tx.schedule.createMany({
            data: projections.map((proj) => ({
              classGroupId: newRule.classGroupId,
              subjectId: newRule.subjectId,
              professorId: newRule.professorId,
              roomId: newRule.roomId,
              startTime: proj.startTime,
              endTime: proj.endTime,
              ruleId: newRule.id,
              status: ClassStatus.PLANNED,
            })),
          });
        }

        const lastClassEndDate =
          projections.length > 0
            ? projections[projections.length - 1].endTime
            : null;

        return { newRule, lastClassEndDate };
      },
    );

    if (lastClassEndDate) {
      this.eventEmitter.emit(
        RULE_EVENTS.END_DATE_CHANGED,
        new RuleEndDateChangedEvent(
          targetRootId,
          lastClassEndDate,
          oldRule.classGroupId,
        ),
      );
    }

    return {
      message: 'Padrão de aulas migrado com sucesso!',
      newRuleId: newRule.id,
    };
  }

  async publishRule(
    ruleId: string,
  ): Promise<{ message: string; count: number }> {
    const rule = await this.prisma.scheduleRule.findUnique({
      where: { id: ruleId },
    });

    if (!rule) {
      throw new NotFoundException(
        `Regra de agendamento com ID ${ruleId} não encontrada.`,
      );
    }

    const targetRootId = resolveRuleRootId(rule);

    const result = await this.prisma.schedule.updateMany({
      where: {
        ...ruleFamilyWhere(targetRootId, [ClassStatus.PLANNED]),
      },
      data: {
        status: ClassStatus.SCHEDULED,
      },
    });

    return {
      message: 'Aulas efetivadas com sucesso!',
      count: result.count,
    };
  }

  // MÉTODOS PÚBLICOS
  async postponeClass(
    id: string,
    reason: string,
    newDateStr?: string,
    force?: boolean,
  ) {
    const original = await this.prisma.schedule.findUnique({
      where: { id },
      include: { rule: true },
    });

    if (!original?.rule) {
      throw new BadRequestException(
        `Aula com ID ${id} não possui regra atrelada para recálculo.`,
      );
    }

    const targetRootId = resolveRuleRootId(original.rule);

    const newSchedule = await this.prisma.$transaction((tx) =>
      this.postponeClassInTransaction(
        tx,
        id,
        reason,
        newDateStr,
        force,
        new Set<string>(),
      ),
    );

    const lastClass = await this.findRuleFamilyLastClass(targetRootId);
    if (lastClass) {
      this.eventEmitter.emit(
        RULE_EVENTS.END_DATE_CHANGED,
        new RuleEndDateChangedEvent(
          targetRootId,
          lastClass.endTime,
          original.classGroupId,
        ),
      );
    }

    return {
      message: 'Reagendamento concluído com sucesso!',
      newSchedule,
    };
  }

  private async postponeClassInTransaction(
    tx: Prisma.TransactionClient,
    scheduleId: string,
    reason: string,
    newDateStr: string | undefined,
    force: boolean | undefined,
    visiting: Set<string>,
    chainTarget?: { startTime: Date; endTime: Date },
  ) {
    if (visiting.has(scheduleId)) {
      throw new BadRequestException(
        'Ciclo detectado ao propagar o adiamento entre disciplinas.',
      );
    }
    visiting.add(scheduleId);

    const classToMove = await tx.schedule.findUnique({
      where: { id: scheduleId },
      include: { rule: true },
    });

    if (!classToMove || !classToMove.rule) {
      throw new BadRequestException(
        `Aula com ID ${scheduleId} não possui regra atrelada para recálculo.`,
      );
    }

    const scheduleCtx = {
      id: classToMove.id,
      endTime: classToMove.endTime,
      rule: classToMove.rule,
    };

    if (classToMove.status === ClassStatus.COMPLETED) {
      throw new BadRequestException('Aulas concluídas não podem ser adiadas.');
    }

    const { rule } = scheduleCtx;
    const targetRootId = resolveRuleRootId(rule);
    const originalStatus = classToMove.status;

    let slot = await this.resolvePostponeSlot(
      tx,
      scheduleCtx,
      targetRootId,
      newDateStr,
      chainTarget,
    );

    const conflict = await this.findPostponeConflict(tx, slot, rule, [
      scheduleId,
    ]);

    if (conflict) {
      if (newDateStr && !force) {
        throwPostponeConfirmRequired(
          conflict.subject?.name || 'Desconhecida',
        );
      }

      if (!conflict.rule) {
        throw new BadRequestException(
          'A aula conflitante não possui uma regra atrelada para recálculo.',
        );
      }

      const nextChainTarget = await this.resolveChainTargetSlot(
        tx,
        conflict.rule,
        conflict.id,
      );

      await this.postponeClassInTransaction(
        tx,
        conflict.id,
        reason,
        undefined,
        true,
        visiting,
        nextChainTarget,
      );

      if (!newDateStr && !chainTarget) {
        slot = await this.computeEndOfRuleSlot(
          tx,
          scheduleCtx,
          targetRootId,
        );
      }
    }

    if (classToMove.status === ClassStatus.PLANNED) {
      await tx.schedule.delete({ where: { id: scheduleId } });
    } else {
      await tx.schedule.update({
        where: { id: scheduleId },
        data: { status: ClassStatus.CANCELLED, cancelReason: reason },
      });
    }

    if (!newDateStr && !chainTarget) {
      slot = await this.computeEndOfRuleSlot(tx, scheduleCtx, targetRootId);
    }

    return tx.schedule.create({
      data: {
        classGroupId: rule.classGroupId,
        subjectId: rule.subjectId,
        professorId: rule.professorId,
        roomId: rule.roomId,
        ruleId: rule.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        status: originalStatus,
      },
    });
  }

  private async resolvePostponeSlot(
    tx: Prisma.TransactionClient,
    schedule: {
      id: string;
      endTime: Date;
      rule: {
        daysOfWeek: number[];
        startTimeStr: string;
        endTimeStr: string;
      };
    },
    targetRootId: string,
    newDateStr?: string,
    chainTarget?: { startTime: Date; endTime: Date },
  ): Promise<{ startTime: Date; endTime: Date }> {
    if (newDateStr) {
      return parseFixedPostponeSlot(newDateStr, schedule.rule);
    }

    if (chainTarget) {
      return chainTarget;
    }

    return this.computeEndOfRuleSlot(tx, schedule, targetRootId);
  }

  /** Primeira vaga após a última aula da disciplina (adiamento raiz). */
  private async computeEndOfRuleSlot(
    tx: Prisma.TransactionClient,
    schedule: {
      id: string;
      endTime: Date;
      rule: {
        daysOfWeek: number[];
        startTimeStr: string;
        endTimeStr: string;
      };
    },
    targetRootId: string,
  ): Promise<{ startTime: Date; endTime: Date }> {
    const lastClass = await tx.schedule.findFirst({
      where: {
        AND: [ruleFamilyWhere(targetRootId), { id: { not: schedule.id } }],
      },
      orderBy: { endTime: 'desc' },
    });

    const nextDateToSearch = dayAfterInScheduleTz(
      lastClass?.endTime ?? schedule.endTime,
    );

    return this.findFirstRuleOccurrence(
      nextDateToSearch,
      schedule.rule.daysOfWeek,
      schedule.rule.startTimeStr,
      schedule.rule.endTimeStr,
    );
  }

  /**
   * Na cascata, a aula deslocada ocupa o horário da primeira aula da UC dependente.
   * Se não houver dependente, vai para o fim da própria disciplina.
   */
  private async resolveChainTargetSlot(
    tx: Prisma.TransactionClient,
    rule: {
      id: string;
      rootRuleId: string | null;
      daysOfWeek: number[];
      startTimeStr: string;
      endTimeStr: string;
    },
    movingScheduleId: string,
  ): Promise<{ startTime: Date; endTime: Date }> {
    const ruleRootId = resolveRuleRootId(rule);

    const dependentRule = await tx.scheduleRule.findFirst({
      where: dependentRuleWhere(ruleRootId, rule.id),
    });

    if (!dependentRule) {
      const moving = await tx.schedule.findUnique({
        where: { id: movingScheduleId },
        include: { rule: true },
      });
      if (!moving || !moving.rule) {
        throw new BadRequestException('Aula em cascata não encontrada.');
      }
      return this.computeEndOfRuleSlot(
        tx,
        {
          id: moving.id,
          endTime: moving.endTime,
          rule: moving.rule,
        },
        ruleRootId,
      );
    }

    const dependentRootId = resolveRuleRootId(dependentRule);
    const firstDependentClass = await tx.schedule.findFirst({
      where: ruleFamilyWhere(dependentRootId, [
        ClassStatus.PLANNED,
        ClassStatus.SCHEDULED,
      ]),
      orderBy: { startTime: 'asc' },
    });

    if (!firstDependentClass) {
      const moving = await tx.schedule.findUnique({
        where: { id: movingScheduleId },
        include: { rule: true },
      });
      if (!moving || !moving.rule) {
        throw new BadRequestException('Aula em cascata não encontrada.');
      }
      return this.computeEndOfRuleSlot(
        tx,
        {
          id: moving.id,
          endTime: moving.endTime,
          rule: moving.rule,
        },
        ruleRootId,
      );
    }

    return {
      startTime: firstDependentClass.startTime,
      endTime: firstDependentClass.endTime,
    };
  }

  /** Primeira ocorrência da regra a partir de uma data, mesmo que já ocupada. */
  private findFirstRuleOccurrence(
    fromDate: Date,
    daysOfWeek: number[],
    startTimeStr: string,
    endTimeStr: string,
  ): { startTime: Date; endTime: Date } {
    const slot = findFirstRuleOccurrenceSlot(
      fromDate,
      daysOfWeek,
      startTimeStr,
      endTimeStr,
    );

    if (!slot) {
      throw new BadRequestException(
        'Erro ao projetar nova data: não há dias válidos no próximo ano.',
      );
    }

    return slot;
  }

  private async findPostponeConflict(
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

  private async assertNoScheduleConflicts(params: {
    startTime: Date;
    endTime: Date;
    roomId: string;
    professorId: string;
    excludeId?: string;
  }): Promise<void> {
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

  private async findRuleFamilyLastClass(
    ruleId: string,
    client: Prisma.TransactionClient | PrismaService = this.prisma,
  ) {
    return client.schedule.findFirst({
      where: ruleFamilyWhere(ruleId),
      orderBy: { endTime: 'desc' },
    });
  }

  private async resolveDependencyStartDate(
    dependsOnRuleId: string,
    client: Prisma.TransactionClient | PrismaService = this.prisma,
  ): Promise<Date> {
    const dependencyLastClass = await client.schedule.findFirst({
      where: {
        ...ruleFamilyWhere(dependsOnRuleId, [
          ClassStatus.PLANNED,
          ClassStatus.SCHEDULED,
          ClassStatus.COMPLETED,
        ]),
      },
      orderBy: { endTime: 'desc' },
    });

    if (!dependencyLastClass) {
      throw new BadRequestException(
        `Falha no encadeamento: A disciplina anterior (Regra ID: ${dependsOnRuleId}) não possui aulas válidas futuras.`,
      );
    }

    return dayAfterInScheduleTz(dependencyLastClass.endTime);
  }
}

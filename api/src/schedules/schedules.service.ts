import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma, ClassStatus } from '@/prisma/generated';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleGeneratorService } from './schedule-generator.service';
import { GenerateSchedulesDto } from './dto/generate-schedules.dto';
import { MigrateRuleDto } from './dto/migrate-rule.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
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

    // TS Erro fix: Comparadores lógicos em TS exigem coerção clara para Date ou números
    if (new Date(startTime) >= new Date(endTime)) {
      throw new BadRequestException(
        'O horário de início deve ser obrigatoriamente anterior ao horário de término.',
      );
    }

    const roomConflict = await this.prisma.schedule.findFirst({
      where: {
        roomId: roomId,
        startTime: { lt: new Date(endTime) },
        endTime: { gt: new Date(startTime) },
        status: { not: ClassStatus.CANCELLED },
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
        professorId: professorId,
        startTime: { lt: new Date(endTime) },
        endTime: { gt: new Date(startTime) },
        status: { not: ClassStatus.CANCELLED },
      },
      include: { classGroup: true },
    });

    if (professorConflict) {
      throw new ConflictException(
        `Choque de Professor: Este professor já está dando aula para a turma ${professorConflict.classGroup.code} neste mesmo horário.`,
      );
    }

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

  async findAll(
    start?: string,
    end?: string,
    classGroupId?: string,
    professorId?: string,
    roomId?: string,
    subjectId?: string,
    status?: string | string[],
  ) {
    const whereCondition: Prisma.ScheduleWhereInput = {};

    if (start && end) {
      whereCondition.startTime = { gte: new Date(start) };
      whereCondition.endTime = { lte: new Date(end) };
    }

    if (classGroupId) whereCondition.classGroupId = classGroupId;
    if (professorId) whereCondition.professorId = professorId;
    if (roomId) whereCondition.roomId = roomId;
    if (subjectId) whereCondition.subjectId = subjectId;

    if (status) {
      if (Array.isArray(status)) {
        whereCondition.status = { in: status as ClassStatus[] };
      } else {
        whereCondition.status = status as ClassStatus;
      }
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
    await this.findOne(id);

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
      // Busca a última aula projetada da regra da qual dependemos
      const dependencyLastClass = await this.prisma.schedule.findFirst({
        where: {
          ruleId: dependsOnRuleId,
          status: { not: ClassStatus.CANCELLED },
        },
        orderBy: { startTime: 'desc' },
      });

      if (!dependencyLastClass) {
        throw new BadRequestException(
          `Falha no encadeamento: A disciplina anterior (Regra ID: ${dependsOnRuleId}) não possui aulas válidas futuras.`,
        );
      }

      // Sobrescreve a data inicial para garantir que a nova regra comece após o término da dependência
      actualStartDate = new Date(dependencyLastClass.startTime);
      actualStartDate.setDate(actualStartDate.getDate() + 1);
      actualStartDate.setHours(0, 0, 0, 0);
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

    return {
      message: `Grade gerada com sucesso! ${result.count} aulas foram alocadas e a regra foi salva no histórico.`,
      generatedCount: result.count,
      ruleId: result.ruleId,
      lastClassDate: projections[projections.length - 1].startTime,
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

    const startOfDay = new Date(dto.transitionDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const targetRootId: string = oldRule.rootRuleId ?? oldRule.id;

    // ETAPA 1: Limpeza e criação da regra (Dentro da Transação)
    const { newRule, remainingHours } = await this.prisma.$transaction(
      async (tx) => {
        let originalTotalHours = oldRule.totalHours;
        if (oldRule.rootRuleId) {
          const rootRule = await tx.scheduleRule.findUnique({
            where: { id: oldRule.rootRuleId },
          });
          if (rootRule) {
            originalTotalHours = rootRule.totalHours;
          }
        }

        // 2. Deleta todas as aulas a partir da data de corte que não foram finalizadas
        await tx.schedule.deleteMany({
          where: {
            OR: [
              { ruleId: targetRootId },
              { rule: { is: { rootRuleId: targetRootId } } },
            ],
            startTime: { gte: startOfDay },
            status: { in: [ClassStatus.PLANNED, ClassStatus.SCHEDULED] },
          },
        });

        // 3. Calcula a carga horária já cumprida (aulas válidas que não foram deletadas)
        const validClasses = await tx.schedule.findMany({
          where: {
            OR: [
              { ruleId: targetRootId },
              { rule: { is: { rootRuleId: targetRootId } } },
            ],
            status: {
              in: [
                ClassStatus.COMPLETED,
                ClassStatus.SCHEDULED,
                ClassStatus.PLANNED,
              ],
            },
          },
        });

        const consumedMinutes = validClasses.reduce((acc, curr) => {
          return (
            acc +
            Math.round(
              (curr.endTime.getTime() - curr.startTime.getTime()) / 60000,
            )
          );
        }, 0);

        // Trabalhamos com minutos redondos para evitar problemas de precisão ponto flutuante
        const originalTotalMinutes = Math.round(originalTotalHours * 60);
        const remainingMinutes = originalTotalMinutes - consumedMinutes;
        const remainingHours = remainingMinutes / 60;

        if (remainingHours <= 0) {
          throw new BadRequestException(
            'A carga horária original já foi totalmente consumida.',
          );
        }

        // 4. Cria a nova regra aplicando as substituições caso existam
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

        return { newRule, remainingHours };
      },
    );

    // ETAPA 2: Geração e salvamento das novas aulas (Fora da Transação)
    // 5. Busca aulas existentes para evitar conflito na nova geração
    const searchLimitDate = new Date(startOfDay);
    searchLimitDate.setFullYear(searchLimitDate.getFullYear() + 1);

    const orConditions: Prisma.ScheduleWhereInput[] = [];
    if (newRule.classGroupId)
      orConditions.push({ classGroupId: newRule.classGroupId });
    if (newRule.professorId)
      orConditions.push({ professorId: newRule.professorId });
    if (newRule.roomId) orConditions.push({ roomId: newRule.roomId });

    const existingSchedules = await this.prisma.schedule.findMany({
      where: {
        ...(orConditions.length > 0 && { OR: orConditions }),
        startTime: { gte: startOfDay },
        endTime: { lte: searchLimitDate },
        status: { in: [ClassStatus.PLANNED, ClassStatus.SCHEDULED] },
      },
      select: { startTime: true, endTime: true },
    });

    // 6. Agora que a exclusão foi comitada, geramos as projeções resilientes a conflitos
    const projections = await this.generatorService.generateProjections(
      startOfDay,
      newRule.daysOfWeek,
      newRule.startTimeStr,
      newRule.endTimeStr,
      remainingHours,
      existingSchedules,
    );

    if (projections.length > 0) {
      // Salvamos usando a conexão principal (this.prisma)
      await this.prisma.schedule.createMany({
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

    // 6. Retorno de sucesso
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

    const targetRootId = rule.rootRuleId || rule.id;

    const result = await this.prisma.schedule.updateMany({
      where: {
        OR: [
          { ruleId: targetRootId },
          { rule: { is: { rootRuleId: targetRootId } } },
        ],
        status: ClassStatus.PLANNED,
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
    const eventsToEmit: RuleEndDateChangedEvent[] = [];

    const result = await this.prisma.$transaction(async (tx) => {
      const classToCancel = await tx.schedule.findUnique({
        where: { id },
        include: { rule: true },
      });

      if (!classToCancel || !classToCancel.rule) {
        throw new BadRequestException(
          `Aula com ID ${id} não possui regra atrelada para recálculo.`,
        );
      }

      if (classToCancel.status === ClassStatus.COMPLETED) {
        throw new BadRequestException(
          'Aulas concluídas não podem ser adiadas.',
        );
      }

      const originalStatus = classToCancel.status;

      const { rule } = classToCancel;
      const targetRootId = rule.rootRuleId || rule.id;

      // Identifica todas as regras descendentes (filhas, netas) para ignorar os conflitos com elas
      const descendantRuleIds: string[] = [];
      let currentIdsToSearch = [rule.id];

      while (currentIdsToSearch.length > 0) {
        const children = await tx.scheduleRule.findMany({
          where: { dependsOnRuleId: { in: currentIdsToSearch } },
          select: { id: true },
        });
        currentIdsToSearch = children.map((c) => c.id);
        if (currentIdsToSearch.length > 0) {
          descendantRuleIds.push(...currentIdsToSearch);
        }
      }

      // Efetivação: Salva o cancelamento ou deleção da aula original
      if (classToCancel.status === ClassStatus.PLANNED) {
        await tx.schedule.delete({ where: { id } });
      } else {
        await tx.schedule.update({
          where: { id },
          data: { status: ClassStatus.CANCELLED, cancelReason: reason },
        });
      }

      // Encontra a ÚLTIMA aula agendada desta mesma regra
      const lastClass = await tx.schedule.findFirst({
        where: {
          OR: [
            { ruleId: targetRootId },
            { rule: { rootRuleId: targetRootId } },
          ],
          status: {
            in: [
              ClassStatus.SCHEDULED,
              ClassStatus.PLANNED,
              ClassStatus.COMPLETED,
            ],
          },
        },
        orderBy: { startTime: 'desc' },
      });

      // A data base para procurar a próxima alocação é a data da aula sendo adiada,
      // ou a última aula ativa existente (caso a aula adiada fosse no meio do cronograma).
      const baseDateForSearch = lastClass
        ? new Date(
            Math.max(
              lastClass.startTime.getTime(),
              classToCancel.startTime.getTime(),
            ),
          )
        : classToCancel.startTime;

      const nextDateToSearch = new Date(baseDateForSearch);
      // FORÇA O SALTO INICIAL: Garante que a busca avançará para o próximo dia letivo livre
      nextDateToSearch.setDate(nextDateToSearch.getDate() + 1);
      nextDateToSearch.setHours(0, 0, 0, 0);

      const [startH, startM] = rule.startTimeStr.split(':').map(Number);
      const [endH, endM] = rule.endTimeStr.split(':').map(Number);
      const singleClassHours = (endH * 60 + endM - (startH * 60 + startM)) / 60;

      let newProj: { startTime: Date; endTime: Date };

      if (newDateStr) {
        const dateString = newDateStr.includes('T')
          ? newDateStr
          : `${newDateStr}T12:00:00`;
        const parsedDate = new Date(dateString);
        const proposedStart = new Date(
          parsedDate.getFullYear(),
          parsedDate.getMonth(),
          parsedDate.getDate(),
          startH,
          startM,
        );
        const proposedEnd = new Date(
          parsedDate.getFullYear(),
          parsedDate.getMonth(),
          parsedDate.getDate(),
          endH,
          endM,
        );

        const conflict = await tx.schedule.findFirst({
          where: {
            OR: [
              { classGroupId: rule.classGroupId },
              { professorId: rule.professorId },
              { roomId: rule.roomId },
            ],
            startTime: { lt: proposedEnd },
            endTime: { gt: proposedStart },
            status: { in: [ClassStatus.SCHEDULED, ClassStatus.PLANNED] },
            ...(descendantRuleIds.length > 0 && {
              ruleId: { notIn: descendantRuleIds },
            }),
          },
          include: { subject: true, rule: true },
        });

        if (conflict) {
          if (!force) {
            throw new ConflictException({
              message: `A data solicitada já possui um conflito com a disciplina ${conflict.subject?.name || 'Desconhecida'}.`,
              action: 'CONFIRM_REQUIRED',
              conflictingSubject: conflict.subject?.name || 'Desconhecida',
            });
          }

          // FORCE = TRUE: Lógica de adiamento simples na aula conflitante
          if (!conflict.rule) {
            throw new BadRequestException(
              'A aula conflitante não possui uma regra atrelada para recálculo.',
            );
          }

          const conflictTargetRootId =
            conflict.rule.rootRuleId || conflict.rule.id;
          const lastConflictClass = await tx.schedule.findFirst({
            where: {
              OR: [
                { ruleId: conflictTargetRootId },
                { rule: { rootRuleId: conflictTargetRootId } },
              ],
              status: {
                in: [
                  ClassStatus.SCHEDULED,
                  ClassStatus.PLANNED,
                  ClassStatus.COMPLETED,
                ],
              },
            },
            orderBy: { startTime: 'desc' },
          });

          const conflictBaseDate = lastConflictClass
            ? new Date(
                Math.max(
                  lastConflictClass.startTime.getTime(),
                  conflict.startTime.getTime(),
                ),
              )
            : conflict.startTime;

          const conflictNextDate = new Date(conflictBaseDate);
          conflictNextDate.setDate(conflictNextDate.getDate() + 1);
          conflictNextDate.setHours(0, 0, 0, 0);

          const conflictLimitDate = new Date(conflictNextDate);
          conflictLimitDate.setFullYear(conflictLimitDate.getFullYear() + 1);

          const conflictExisting = await tx.schedule.findMany({
            where: {
              OR: [
                { classGroupId: conflict.rule.classGroupId },
                { professorId: conflict.rule.professorId },
                { roomId: conflict.rule.roomId },
              ],
              startTime: { gte: conflictNextDate },
              endTime: { lte: conflictLimitDate },
              status: { in: [ClassStatus.PLANNED, ClassStatus.SCHEDULED] },
              id: { not: conflict.id }, // Ignora ela mesma na busca do novo dia
            },
            select: { startTime: true, endTime: true },
          });

          const [cStartH, cStartM] = conflict.rule.startTimeStr
            .split(':')
            .map(Number);
          const [cEndH, cEndM] = conflict.rule.endTimeStr
            .split(':')
            .map(Number);
          const cHours = (cEndH * 60 + cEndM - (cStartH * 60 + cStartM)) / 60;

          const conflictProjs = await this.generatorService.generateProjections(
            conflictNextDate,
            conflict.rule.daysOfWeek,
            conflict.rule.startTimeStr,
            conflict.rule.endTimeStr,
            cHours,
            conflictExisting,
          );

          if (conflictProjs.length === 0) {
            throw new BadRequestException(
              'Erro ao realocar aula conflitante: não há horários livres no próximo ano letivo.',
            );
          }

          // Atualiza a aula conflitante que perdeu o lugar para a nova data
          await tx.schedule.update({
            where: { id: conflict.id },
            data: {
              startTime: conflictProjs[0].startTime,
              endTime: conflictProjs[0].endTime,
            },
          });

          // Agenda a emissão de evento de recalculo para as dependentes da aula atropelada
          eventsToEmit.push(
            new RuleEndDateChangedEvent(
              conflict.rule.id,
              conflictProjs[0].startTime,
              conflict.classGroupId,
            ),
          );
        }
        newProj = { startTime: proposedStart, endTime: proposedEnd };
      } else {
        const searchLimitDate = new Date(nextDateToSearch);
        searchLimitDate.setFullYear(searchLimitDate.getFullYear() + 1);

        const existingSchedules = await tx.schedule.findMany({
          where: {
            OR: [
              { classGroupId: rule.classGroupId },
              { professorId: rule.professorId },
              { roomId: rule.roomId },
            ],
            startTime: { gte: nextDateToSearch },
            endTime: { lte: searchLimitDate },
            status: { in: [ClassStatus.PLANNED, ClassStatus.SCHEDULED] },
            ...(descendantRuleIds.length > 0 && {
              ruleId: { notIn: descendantRuleIds },
            }),
          },
          select: { startTime: true, endTime: true },
        });

        const projections = await this.generatorService.generateProjections(
          nextDateToSearch,
          rule.daysOfWeek,
          rule.startTimeStr,
          rule.endTimeStr,
          singleClassHours,
          existingSchedules,
        );

        if (projections.length === 0) {
          throw new BadRequestException(
            'Erro ao projetar nova data: não há horários livres no próximo ano.',
          );
        }
        newProj = projections[0];
      }

      // Cria a aula nova no fim da fila
      return tx.schedule.create({
        data: {
          classGroupId: rule.classGroupId,
          subjectId: rule.subjectId,
          professorId: rule.professorId,
          roomId: rule.roomId,
          ruleId: rule.id,
          startTime: newProj.startTime,
          endTime: newProj.endTime,
          status: originalStatus,
        },
      });
    });

    if (result.ruleId) {
      eventsToEmit.push(
        new RuleEndDateChangedEvent(
          result.ruleId,
          result.startTime, // Esta é a data da nova última aula empurrada pro final
          result.classGroupId,
        ),
      );
    }

    for (const event of eventsToEmit) {
      console.log(
        '[EVENT EMIT] Disparando RULE_EVENTS.END_DATE_CHANGED para a ruleId:',
        event.ruleId,
        'com nova data:',
        event.newEndDate,
      );
      this.eventEmitter.emit(RULE_EVENTS.END_DATE_CHANGED, event);
    }

    return {
      message: `Reagendamento concluído com sucesso!`,
      newSchedule: result,
    };
  }
}

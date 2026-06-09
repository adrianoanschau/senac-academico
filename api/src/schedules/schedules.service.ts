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

@Injectable()
export class SchedulesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly generatorService: ScheduleGeneratorService,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const { startTime, endTime, roomId, professorId } = createScheduleDto;

    if (startTime >= endTime) {
      throw new BadRequestException(
        'O horário de início deve ser obrigatoriamente anterior ao horário de término.',
      );
    }

    const roomConflict = await this.prisma.schedule.findFirst({
      where: {
        roomId: roomId,
        startTime: { lt: endTime },
        endTime: { gt: startTime },
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
        startTime: { lt: endTime },
        endTime: { gt: startTime },
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
    } = dto;

    // 1. Busca a disciplina
    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) {
      throw new NotFoundException(`Disciplina não encontrada.`);
    }

    // 2. Chama o Motor para projetar as datas
    const projections = await this.generatorService.generateProjections(
      startDate,
      daysOfWeek,
      startTimeStr,
      endTimeStr,
      subject.hours,
    );

    if (projections.length === 0) {
      throw new BadRequestException(
        'Não foi possível gerar nenhuma data válida com estes parâmetros.',
      );
    }

    // 3. Validação Anti-Choque
    for (const proj of projections) {
      const roomConflict = await this.prisma.schedule.findFirst({
        where: {
          roomId,
          startTime: { lt: proj.endTime },
          endTime: { gt: proj.startTime },
          status: { not: ClassStatus.CANCELLED },
        },
        include: { classGroup: true },
      });

      if (roomConflict) {
        const dateFormatted = proj.startTime.toLocaleDateString('pt-BR');
        throw new ConflictException(
          `Geração abortada: A sala está ocupada no dia ${dateFormatted} pela turma ${roomConflict.classGroup.code}.`,
        );
      }

      const professorConflict = await this.prisma.schedule.findFirst({
        where: {
          professorId,
          startTime: { lt: proj.endTime },
          endTime: { gt: proj.startTime },
          status: { not: ClassStatus.CANCELLED },
        },
        include: { classGroup: true },
      });

      if (professorConflict) {
        const dateFormatted = proj.startTime.toLocaleDateString('pt-BR');
        throw new ConflictException(
          `Geração abortada: O professor está dando aula no dia ${dateFormatted} para a turma ${professorConflict.classGroup.code}.`,
        );
      }
    }

    // 4. Salva a Regra e as Aulas numa Transação Segura
    // O $transaction garante que ou tudo é salvo perfeitamente, ou nada é salvo.
    const result = await this.prisma.$transaction(async (prisma) => {
      // A. Cria a "Memória" (ScheduleRule)
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
        },
      });

      // B. Prepara o array de aulas, agora injetando o ruleId
      const schedulesToCreate = projections.map((proj) => ({
        classGroupId,
        subjectId,
        professorId,
        roomId,
        startTime: proj.startTime,
        endTime: proj.endTime,
        ruleId: rule.id, // <-- Conecta a aula à sua regra de origem
        status: ClassStatus.SCHEDULED, // Opcional, pois é o default, mas bom para clareza
      }));

      // C. Salva todas as aulas
      const createdSchedules = await prisma.schedule.createMany({
        data: schedulesToCreate,
      });

      return createdSchedules;
    });

    return {
      message: `Grade gerada com sucesso! ${result.count} aulas foram alocadas e a regra foi salva no histórico.`,
      generatedCount: result.count,
    };
  }

  // MÉTODOS PÚBLICOS
  async postponeClass(id: string, reason: string) {
    const result = await this.prisma.$transaction(async (tx) => {
      // Passamos o motivo para dentro da transação
      return this.executeCascadePostpone(id, tx, reason);
    });

    return {
      message: `Reagendamento concluído com sucesso!`,
      newSchedule: result,
    };
  }

  // MÉTODO PRIVADO (A Magia da Cascata)
  private async executeCascadePostpone(
    id: string,
    tx: Prisma.TransactionClient,
    reason: string,
  ) {
    // 1. Busca a aula atual (usando o tx em vez de this.prisma)
    const classToCancel = await tx.schedule.findUnique({
      where: { id },
      include: { rule: true },
    });

    if (!classToCancel || !classToCancel.rule) {
      throw new BadRequestException(
        `Aula com ID ${id} não possui regra atrelada para recálculo.`,
      );
    }

    const { rule } = classToCancel;

    // 2. Encontra a ÚLTIMA aula agendada desta mesma regra
    const lastClass = await tx.schedule.findFirst({
      where: {
        ruleId: rule.id,
        status: { in: [ClassStatus.SCHEDULED, ClassStatus.COMPLETED] },
      },
      orderBy: { startTime: 'desc' },
    });

    if (!lastClass) {
      throw new BadRequestException(
        'Nenhuma aula anterior encontrada para recalcular a data.',
      );
    }

    const nextDateToSearch = new Date(lastClass.startTime);
    nextDateToSearch.setDate(nextDateToSearch.getDate() + 1);

    // 3. Pede ao motor para projetar 1 nova data
    const [startH, startM] = rule.startTimeStr.split(':').map(Number);
    const [endH, endM] = rule.endTimeStr.split(':').map(Number);
    const singleClassHours = (endH * 60 + endM - (startH * 60 + startM)) / 60;

    const projections = await this.generatorService.generateProjections(
      nextDateToSearch,
      rule.daysOfWeek,
      rule.startTimeStr,
      rule.endTimeStr,
      singleClassHours,
    );

    if (projections.length === 0)
      throw new BadRequestException('Erro ao projetar nova data.');
    const newProj = projections[0];

    // ==========================================
    // 4. O EFEITO CASCATA (Análise de Conflitos)
    // ==========================================

    // A. Conflito Interno: A nova data bate com outra disciplina da MESMA turma?
    const internalConflict = await tx.schedule.findFirst({
      where: {
        classGroupId: rule.classGroupId,
        startTime: { lt: newProj.endTime },
        endTime: { gt: newProj.startTime },
        status: 'SCHEDULED',
      },
    });

    if (internalConflict) {
      // O EFEITO DOMINÓ: Se uma aula precisou ser empurrada por causa de outra,
      // injetamos um motivo automático informando a origem da cascata!
      await this.executeCascadePostpone(
        internalConflict.id,
        tx,
        `Empurrada automaticamente em cascata (Motivo original: ${reason})`,
      );
    }

    // B. Conflitos Externos: Após resolver a turma, a sala/professor estão livres?
    // Se a sala estiver ocupada por OUTRA turma, aí sim damos erro fatal.
    const externalRoomConflict = await tx.schedule.findFirst({
      where: {
        roomId: rule.roomId,
        classGroupId: { not: rule.classGroupId }, // Ignora a própria turma
        startTime: { lt: newProj.endTime },
        endTime: { gt: newProj.startTime },
        status: ClassStatus.SCHEDULED,
      },
      include: { classGroup: true },
    });

    if (externalRoomConflict) {
      throw new ConflictException(
        `Fim da Linha: A cascata parou porque a sala precisa ser usada pela turma ${externalRoomConflict.classGroup.code} no dia ${newProj.startTime.toLocaleDateString()}.`,
      );
    }

    const externalProfConflict = await tx.schedule.findFirst({
      where: {
        professorId: rule.professorId,
        classGroupId: { not: rule.classGroupId },
        startTime: { lt: newProj.endTime },
        endTime: { gt: newProj.startTime },
        status: ClassStatus.SCHEDULED,
      },
      include: { classGroup: true },
    });

    if (externalProfConflict) {
      throw new ConflictException(
        `Fim da Linha: O professor esbarrou na aula da turma ${externalProfConflict.classGroup.code}.`,
      );
    }

    // 5. Efetivação: Salva o cancelamento e a sua justificação
    await tx.schedule.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelReason: reason,
      },
    });

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
        status: 'SCHEDULED',
      },
    });
  }
}

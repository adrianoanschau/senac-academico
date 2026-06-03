import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@/prisma/generated';
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
  ) {
    const whereCondition: Prisma.ScheduleWhereInput = {};

    if (start && end) {
      whereCondition.startTime = { gte: new Date(start) };
      whereCondition.endTime = { lte: new Date(end) };
    }

    if (classGroupId) whereCondition.classGroupId = classGroupId;
    if (professorId) whereCondition.professorId = professorId;
    if (roomId) whereCondition.roomId = roomId;

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

    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) {
      throw new NotFoundException(`Disciplina não encontrada.`);
    }

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

    for (const proj of projections) {
      const roomConflict = await this.prisma.schedule.findFirst({
        where: {
          roomId,
          startTime: { lt: proj.endTime },
          endTime: { gt: proj.startTime },
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

    const schedulesToCreate = projections.map((proj) => ({
      classGroupId,
      subjectId,
      professorId,
      roomId,
      startTime: proj.startTime,
      endTime: proj.endTime,
    }));

    const result = await this.prisma.schedule.createMany({
      data: schedulesToCreate,
    });

    return {
      message: `Grade gerada com sucesso! ${result.count} aulas foram alocadas.`,
      generatedCount: result.count,
    };
  }
}

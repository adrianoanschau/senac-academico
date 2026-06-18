import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ClassStatus, Prisma } from '@/prisma/generated';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleGeneratorService } from './schedule-generator.service';
import { GenerateSchedulesDto } from './dto/generate-schedules.dto';
import { MigrateRuleDto } from './dto/migrate-rule.dto';
import { FindSchedulesQueryDto } from './dto/find-schedules-query.dto';
import { ScheduleConflictService } from './conflict/schedule-conflict.service';
import { ScheduleRuleLifecycleService } from './rules/schedule-rule-lifecycle.service';
import { SchedulePostponeService } from './reschedule/schedule-postpone.service';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly generatorService: ScheduleGeneratorService,
    private readonly conflictService: ScheduleConflictService,
    private readonly ruleLifecycleService: ScheduleRuleLifecycleService,
    private readonly postponeService: SchedulePostponeService,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const { startTime, endTime, roomId, professorId } = createScheduleDto;

    await this.conflictService.assertNoScheduleConflicts({
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

    await this.conflictService.assertNoScheduleConflicts({
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

    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) {
      throw new NotFoundException(`Disciplina não encontrada.`);
    }

    let actualStartDate = new Date(startDate);

    if (dependsOnRuleId) {
      actualStartDate =
        await this.ruleLifecycleService.resolveDependencyStartDate(
          dependsOnRuleId,
        );
    }

    const searchLimitDate = new Date(actualStartDate);
    searchLimitDate.setFullYear(searchLimitDate.getFullYear() + 1);

    const existingSchedules = await this.prisma.schedule.findMany({
      where: {
        OR: [{ classGroupId }, { professorId }, { roomId }],
        startTime: { gte: actualStartDate },
        endTime: { lte: searchLimitDate },
        status: { in: [ClassStatus.PLANNED, ClassStatus.SCHEDULED] },
      },
      select: { startTime: true, endTime: true },
    });

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
        'Não foi possível gerar nenhuma data válida com estes parámetros.',
      );
    }

    const result = await this.prisma.$transaction(async (prisma) => {
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

      const schedulesToCreate = projections.map((proj) => ({
        classGroupId,
        subjectId,
        professorId,
        roomId,
        startTime: proj.startTime,
        endTime: proj.endTime,
        ruleId: ruleId as string,
        status: ClassStatus.PLANNED,
      }));

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

  migrateRulePattern(ruleId: string, dto: MigrateRuleDto) {
    return this.ruleLifecycleService.migrateRulePattern(ruleId, dto);
  }

  publishRule(ruleId: string) {
    return this.ruleLifecycleService.publishRule(ruleId);
  }

  postponeClass(
    id: string,
    reason: string,
    newDateStr?: string,
    force?: boolean,
  ) {
    return this.postponeService.postponeClass(id, reason, newDateStr, force);
  }
}

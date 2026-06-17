import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ClassStatus, Prisma } from '@/prisma/generated';
import { PrismaService } from '@/prisma/prisma.service';
import { ScheduleGeneratorService } from './schedule-generator.service';
import { GanttBlueprintDto } from './dto/gantt-blueprint.dto';
import { GanttPublishDto } from './dto/gantt-publish.dto';
import { GanttRecalculateDto } from './dto/gantt-recalculate.dto';
import { GanttSubjectConfigDto } from './dto/gantt-subject-config.dto';

export interface GanttSessionSlot {
  startTime: Date;
  endTime: Date;
}

export interface GanttConflict {
  type: 'PROFESSOR' | 'ROOM' | 'CLASS_GROUP';
  message: string;
  taskIds: string[];
  sessionStart: string;
  sessionEnd: string;
}

export interface GanttBlueprintTask {
  id: string;
  curriculumSubjectId: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  hours: number;
  dependsOnId: string | null;
  daysOfWeek: number[];
  professorId?: string;
  roomId?: string;
  start: string;
  end: string;
  sessions: GanttSessionSlot[];
}

export interface GanttBlueprintResult {
  blueprintId: string;
  classGroupId: string;
  moduleNumber: number;
  startTimeStr: string;
  endTimeStr: string;
  tasks: GanttBlueprintTask[];
  conflicts: GanttConflict[];
  canPublish: boolean;
}

interface CurriculumSubjectRow {
  id: string;
  subjectId: string;
  dependsOnId: string | null;
  subject: {
    id: string;
    code: string;
    name: string;
    hours: number;
  };
}

interface ScheduledTaskInternal {
  curriculumSubjectId: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  hours: number;
  dependsOnId: string | null;
  daysOfWeek: number[];
  professorId?: string;
  roomId?: string;
  sessions: GanttSessionSlot[];
  start: Date;
  end: Date;
}

@Injectable()
export class GanttPlannerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly generatorService: ScheduleGeneratorService,
  ) {}

  async buildBlueprint(dto: GanttBlueprintDto): Promise<GanttBlueprintResult> {
    const context = await this.loadContext(
      dto.classGroupId,
      dto.moduleNumber,
      dto.subjects,
    );

    const tasks = await this.scheduleTasksInOrder(
      context.curriculumSubjects,
      dto.subjects,
      dto.startTimeStr,
      dto.endTimeStr,
      dto.classGroupId,
      [],
    );

    const conflicts = this.detectConflicts(tasks, dto.classGroupId);
    return this.toBlueprintResult(dto, tasks, conflicts);
  }

  async recalculate(dto: GanttRecalculateDto): Promise<GanttBlueprintResult> {
    const context = await this.loadContext(
      dto.classGroupId,
      dto.moduleNumber,
      dto.subjects,
    );

    const configMap = new Map(
      dto.subjects.map((s) => [s.curriculumSubjectId, s]),
    );

    if (!configMap.has(dto.movedTaskId)) {
      throw new BadRequestException(
        'A UC movida não faz parte da configuração do módulo.',
      );
    }

    const anchorOverrides = new Map<string, Date>();
    anchorOverrides.set(dto.movedTaskId, new Date(dto.newStartDate));

    const tasks = await this.scheduleTasksInOrder(
      context.curriculumSubjects,
      dto.subjects,
      dto.startTimeStr,
      dto.endTimeStr,
      dto.classGroupId,
      [],
      anchorOverrides,
    );

    const conflicts = this.detectConflicts(tasks, dto.classGroupId);
    return this.toBlueprintResult(
      {
        classGroupId: dto.classGroupId,
        moduleNumber: dto.moduleNumber,
        startTimeStr: dto.startTimeStr,
        endTimeStr: dto.endTimeStr,
      },
      tasks,
      conflicts,
    );
  }

  async publishBlueprint(dto: GanttPublishDto) {
    const tasksInternal: ScheduledTaskInternal[] = dto.tasks.map((task) => {
      if (!task.sessions.length) {
        throw new BadRequestException(
          `A UC ${task.subjectCode} não possui sessões para publicar.`,
        );
      }

      const sessions = task.sessions.map((s) => ({
        startTime: new Date(s.startTime),
        endTime: new Date(s.endTime),
      }));

      return {
        curriculumSubjectId: task.curriculumSubjectId,
        subjectId: task.subjectId,
        subjectCode: task.subjectCode,
        subjectName: task.subjectName,
        hours: task.hours,
        dependsOnId: task.dependsOnId ?? null,
        daysOfWeek: task.daysOfWeek,
        professorId: task.professorId,
        roomId: task.roomId,
        sessions,
        start: sessions[0].startTime,
        end: sessions[sessions.length - 1].endTime,
      };
    });

    const conflicts = this.detectConflicts(tasksInternal, dto.classGroupId);
    if (conflicts.length > 0) {
      throw new BadRequestException({
        message:
          'Não é possível publicar: existem conflitos de agenda no rascunho.',
        conflicts,
      });
    }

    const idSet = new Set(tasksInternal.map((t) => t.curriculumSubjectId));
    const ordered = this.topologicalOrderFromTasks(tasksInternal, idSet);
    const ruleIdMap = new Map<string, string>();

    const result = await this.prisma.$transaction(async (tx) => {
      let schedulesCreated = 0;

      for (const taskId of ordered) {
        const task = tasksInternal.find((t) => t.curriculumSubjectId === taskId)!;
        const dependsOnRuleId = task.dependsOnId
          ? ruleIdMap.get(task.dependsOnId)
          : undefined;

        const rule = await tx.scheduleRule.create({
          data: {
            daysOfWeek: task.daysOfWeek,
            startTimeStr: dto.startTimeStr,
            endTimeStr: dto.endTimeStr,
            totalHours: task.hours,
            classGroupId: dto.classGroupId,
            subjectId: task.subjectId,
            professorId: task.professorId!,
            roomId: task.roomId!,
            dependsOnRuleId,
          },
        });

        ruleIdMap.set(task.curriculumSubjectId, rule.id);

        const created = await tx.schedule.createMany({
          data: task.sessions.map((session) => ({
            classGroupId: dto.classGroupId,
            subjectId: task.subjectId,
            professorId: task.professorId!,
            roomId: task.roomId!,
            startTime: session.startTime,
            endTime: session.endTime,
            ruleId: rule.id,
            status: ClassStatus.PLANNED,
          })),
        });

        schedulesCreated += created.count;
      }

      return {
        rulesCreated: ordered.length,
        schedulesCreated,
      };
    });

    const lastEnd = tasksInternal.reduce(
      (max, t) => (t.end > max ? t.end : max),
      tasksInternal[0]?.end ?? new Date(),
    );

    return {
      message: 'Cronograma publicado com sucesso.',
      ...result,
      moduleEndDate: lastEnd.toISOString(),
    };
  }

  private async loadContext(
    classGroupId: string,
    moduleNumber: number,
    subjectConfigs: GanttSubjectConfigDto[],
  ) {
    const classGroup = await this.prisma.classGroup.findUnique({
      where: { id: classGroupId },
      select: { id: true, curriculumId: true },
    });

    if (!classGroup) {
      throw new NotFoundException('Turma não encontrada.');
    }

    if (!classGroup.curriculumId) {
      throw new BadRequestException('A turma não possui matriz curricular.');
    }

    const curriculumSubjects = await this.prisma.curriculumSubject.findMany({
      where: {
        curriculumId: classGroup.curriculumId,
        module: moduleNumber,
      },
      include: { subject: true },
    });

    if (curriculumSubjects.length === 0) {
      throw new BadRequestException(
        'Nenhuma disciplina encontrada para este módulo.',
      );
    }

    const csMap = new Map(curriculumSubjects.map((cs) => [cs.id, cs]));
    for (const config of subjectConfigs) {
      if (!csMap.has(config.curriculumSubjectId)) {
        throw new BadRequestException(
          `UC ${config.curriculumSubjectId} não pertence ao módulo.`,
        );
      }
      if (csMap.get(config.curriculumSubjectId)!.subjectId !== config.subjectId) {
        throw new BadRequestException(
          'subjectId inconsistente com a matriz curricular.',
        );
      }
      if (config.dependsOnId) {
        if (config.dependsOnId === config.curriculumSubjectId) {
          throw new BadRequestException(
            'Uma UC não pode depender de si mesma.',
          );
        }
        if (!csMap.has(config.dependsOnId)) {
          throw new BadRequestException(
            'A UC predecessora informada não pertence ao módulo.',
          );
        }
      }
    }

    return {
      curriculumSubjects: this.orderSubjectsByPrecedence(curriculumSubjects),
    };
  }

  private async scheduleTasksInOrder(
    curriculumSubjects: CurriculumSubjectRow[],
    subjectConfigs: GanttSubjectConfigDto[],
    startTimeStr: string,
    endTimeStr: string,
    classGroupId: string,
    extraBlocked: GanttSessionSlot[],
    anchorOverrides?: Map<string, Date>,
  ): Promise<ScheduledTaskInternal[]> {
    const configMap = new Map(
      subjectConfigs.map((s) => [s.curriculumSubjectId, s]),
    );
    const idSet = new Set(curriculumSubjects.map((cs) => cs.id));
    const orderedIds = this.orderSubjectsForScheduling(
      curriculumSubjects,
      subjectConfigs,
      idSet,
    );

    const earliestStart = this.getEarliestStartDate(subjectConfigs);

    const dbBlocked = await this.loadExistingBlockedSlots(
      classGroupId,
      earliestStart,
      subjectConfigs,
    );

    const virtualPool: GanttSessionSlot[] = [...extraBlocked, ...dbBlocked];
    const completed = new Map<string, ScheduledTaskInternal>();
    const tasks: ScheduledTaskInternal[] = [];

    for (const csId of orderedIds) {
      const cs = curriculumSubjects.find((c) => c.id === csId)!;
      const config = configMap.get(csId);

      if (!config) {
        throw new BadRequestException(
          `Configure os dias da semana para a UC ${cs.subject.code}.`,
        );
      }

      if (!config.startDate) {
        throw new BadRequestException(
          `Informe a data de início da UC ${cs.subject.code}.`,
        );
      }

      let anchor = anchorOverrides?.has(csId)
        ? new Date(anchorOverrides.get(csId)!)
        : new Date(config.startDate);

      const dependsOnId = this.resolveDependsOnId(cs, config, idSet);

      if (!anchorOverrides?.has(csId) && dependsOnId) {
        const predecessor = completed.get(dependsOnId);
        if (predecessor) {
          const dependencyStart = this.dayAfter(predecessor.end);
          if (dependencyStart > anchor) {
            anchor = dependencyStart;
          }
        }
      }

      anchor.setHours(0, 0, 0, 0);

      const blockedForProjection = virtualPool.map((s) => ({
        startTime: s.startTime,
        endTime: s.endTime,
      }));

      const projections = await this.generatorService.generateProjections(
        anchor,
        config.daysOfWeek,
        startTimeStr,
        endTimeStr,
        cs.subject.hours,
        blockedForProjection,
      );

      if (projections.length === 0) {
        throw new BadRequestException(
          `Não foi possível projetar a UC ${cs.subject.code} com os parâmetros informados.`,
        );
      }

      const sessions: GanttSessionSlot[] = projections.map((p) => ({
        startTime: p.startTime,
        endTime: p.endTime,
      }));

      const task: ScheduledTaskInternal = {
        curriculumSubjectId: cs.id,
        subjectId: cs.subjectId,
        subjectCode: cs.subject.code,
        subjectName: cs.subject.name,
        hours: cs.subject.hours,
        dependsOnId,
        daysOfWeek: config.daysOfWeek,
        professorId: config.professorId,
        roomId: config.roomId,
        sessions,
        start: sessions[0].startTime,
        end: sessions[sessions.length - 1].endTime,
      };

      virtualPool.push(...sessions);
      completed.set(cs.id, task);
      tasks.push(task);
    }

    return tasks;
  }

  private orderSubjectsForScheduling(
    curriculumSubjects: CurriculumSubjectRow[],
    subjectConfigs: GanttSubjectConfigDto[],
    idSet: Set<string>,
  ): string[] {
    const configMap = new Map(
      subjectConfigs.map((s) => [s.curriculumSubjectId, s]),
    );

    const inDegree = new Map<string, number>();
    const successors = new Map<string, string[]>();

    for (const cs of curriculumSubjects) {
      inDegree.set(cs.id, 0);
      successors.set(cs.id, []);
    }

    for (const cs of curriculumSubjects) {
      const dependsOnId = this.resolveDependsOnId(
        cs,
        configMap.get(cs.id),
        idSet,
      );
      if (dependsOnId) {
        inDegree.set(cs.id, (inDegree.get(cs.id) ?? 0) + 1);
        successors.get(dependsOnId)!.push(cs.id);
      }
    }

    const queue = curriculumSubjects
      .filter((cs) => (inDegree.get(cs.id) ?? 0) === 0)
      .map((cs) => cs.id);
    const sorted: string[] = [];

    while (queue.length > 0) {
      queue.sort((a, b) => {
        const aPriority = configMap.get(a)?.isPriority ? 0 : 1;
        const bPriority = configMap.get(b)?.isPriority ? 0 : 1;
        if (aPriority !== bPriority) return aPriority - bPriority;
        return a.localeCompare(b);
      });

      const current = queue.shift()!;
      sorted.push(current);

      for (const succ of successors.get(current) ?? []) {
        const deg = (inDegree.get(succ) ?? 0) - 1;
        inDegree.set(succ, deg);
        if (deg === 0) queue.push(succ);
      }
    }

    if (sorted.length < curriculumSubjects.length) {
      throw new BadRequestException(
        'Ciclo detectado nas precedências do módulo.',
      );
    }

    return sorted;
  }

  private resolveDependsOnId(
    cs: CurriculumSubjectRow,
    config: GanttSubjectConfigDto | undefined,
    idSet: Set<string>,
  ): string | null {
    if (config?.dependsOnId !== undefined) {
      if (!config.dependsOnId) return null;
      return idSet.has(config.dependsOnId) ? config.dependsOnId : null;
    }

    return cs.dependsOnId && idSet.has(cs.dependsOnId) ? cs.dependsOnId : null;
  }

  private getEarliestStartDate(subjectConfigs: GanttSubjectConfigDto[]): Date {
    let earliest: Date | null = null;

    for (const config of subjectConfigs) {
      if (!config.startDate) continue;
      const candidate = new Date(config.startDate);
      candidate.setHours(0, 0, 0, 0);
      if (!earliest || candidate < earliest) {
        earliest = candidate;
      }
    }

    if (!earliest) {
      throw new BadRequestException(
        'Informe a data de início de cada disciplina.',
      );
    }

    return earliest;
  }

  private async loadExistingBlockedSlots(
    classGroupId: string,
    earliestStartDate: Date,
    subjectConfigs: GanttSubjectConfigDto[],
  ): Promise<GanttSessionSlot[]> {
    const professorIds = [
      ...new Set(
        subjectConfigs.map((s) => s.professorId).filter(Boolean) as string[],
      ),
    ];
    const roomIds = [
      ...new Set(subjectConfigs.map((s) => s.roomId).filter(Boolean) as string[]),
    ];

    const searchLimit = new Date(earliestStartDate);
    searchLimit.setFullYear(searchLimit.getFullYear() + 2);

    const orConditions: Prisma.ScheduleWhereInput[] = [{ classGroupId }];
    if (professorIds.length) {
      orConditions.push({ professorId: { in: professorIds } });
    }
    if (roomIds.length) {
      orConditions.push({ roomId: { in: roomIds } });
    }

    const existing = await this.prisma.schedule.findMany({
      where: {
        OR: orConditions,
        startTime: { gte: earliestStartDate },
        endTime: { lte: searchLimit },
        status: { in: [ClassStatus.PLANNED, ClassStatus.SCHEDULED] },
      },
      select: { startTime: true, endTime: true },
    });

    return existing.map((s) => ({
      startTime: s.startTime,
      endTime: s.endTime,
    }));
  }

  detectConflicts(
    tasks: ScheduledTaskInternal[],
    classGroupId: string,
  ): GanttConflict[] {
    const conflicts: GanttConflict[] = [];
    const entries: {
      taskId: string;
      professorId?: string;
      roomId?: string;
      session: GanttSessionSlot;
    }[] = [];

    for (const task of tasks) {
      for (const session of task.sessions) {
        entries.push({
          taskId: task.curriculumSubjectId,
          professorId: task.professorId,
          roomId: task.roomId,
          session,
        });
      }
    }

    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const a = entries[i];
        const b = entries[j];

        if (!this.sessionsOverlap(a.session, b.session)) continue;

        if (a.professorId && b.professorId && a.professorId === b.professorId) {
          conflicts.push({
            type: 'PROFESSOR',
            message: 'Conflito de professor em horários sobrepostos.',
            taskIds: [a.taskId, b.taskId],
            sessionStart: a.session.startTime.toISOString(),
            sessionEnd: a.session.endTime.toISOString(),
          });
        }

        if (a.roomId && b.roomId && a.roomId === b.roomId) {
          conflicts.push({
            type: 'ROOM',
            message: 'Conflito de sala em horários sobrepostos.',
            taskIds: [a.taskId, b.taskId],
            sessionStart: a.session.startTime.toISOString(),
            sessionEnd: a.session.endTime.toISOString(),
          });
        }

        if (a.taskId !== b.taskId) {
          conflicts.push({
            type: 'CLASS_GROUP',
            message: 'A turma possui duas aulas sobrepostas no rascunho.',
            taskIds: [a.taskId, b.taskId],
            sessionStart: a.session.startTime.toISOString(),
            sessionEnd: a.session.endTime.toISOString(),
          });
        }
      }
    }

    const unique = new Map<string, GanttConflict>();
    for (const c of conflicts) {
      const key = `${c.type}:${[...c.taskIds].sort().join('-')}:${c.sessionStart}`;
      if (!unique.has(key)) unique.set(key, c);
    }

    return [...unique.values()];
  }

  private toBlueprintResult(
    dto: Pick<
      GanttBlueprintDto,
      'classGroupId' | 'moduleNumber' | 'startTimeStr' | 'endTimeStr'
    >,
    tasks: ScheduledTaskInternal[],
    conflicts: GanttConflict[],
  ): GanttBlueprintResult {
    return {
      blueprintId: randomUUID(),
      classGroupId: dto.classGroupId,
      moduleNumber: dto.moduleNumber,
      startTimeStr: dto.startTimeStr,
      endTimeStr: dto.endTimeStr,
      tasks: tasks.map((t) => ({
        id: t.curriculumSubjectId,
        curriculumSubjectId: t.curriculumSubjectId,
        subjectId: t.subjectId,
        subjectCode: t.subjectCode,
        subjectName: t.subjectName,
        hours: t.hours,
        dependsOnId: t.dependsOnId,
        daysOfWeek: t.daysOfWeek,
        professorId: t.professorId,
        roomId: t.roomId,
        start: t.start.toISOString(),
        end: t.end.toISOString(),
        sessions: t.sessions,
      })),
      conflicts,
      canPublish:
        conflicts.length === 0 &&
        tasks.every((t) => t.professorId && t.roomId && t.sessions.length > 0),
    };
  }

  private sessionsOverlap(a: GanttSessionSlot, b: GanttSessionSlot): boolean {
    return a.startTime < b.endTime && a.endTime > b.startTime;
  }

  private dayAfter(date: Date): Date {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    next.setHours(0, 0, 0, 0);
    return next;
  }

  private topologicalOrder(
    items: { id: string; dependsOnId: string | null }[],
    idSet: Set<string>,
  ): string[] {
    const inDegree = new Map<string, number>();
    const successors = new Map<string, string[]>();

    for (const item of items) {
      inDegree.set(item.id, 0);
      successors.set(item.id, []);
    }

    for (const item of items) {
      if (item.dependsOnId && idSet.has(item.dependsOnId)) {
        inDegree.set(item.id, (inDegree.get(item.id) ?? 0) + 1);
        successors.get(item.dependsOnId)!.push(item.id);
      }
    }

    const queue = items
      .filter((item) => (inDegree.get(item.id) ?? 0) === 0)
      .map((item) => item.id);
    const sorted: string[] = [];

    while (queue.length > 0) {
      const current = queue.shift()!;
      sorted.push(current);
      for (const succ of successors.get(current) ?? []) {
        const deg = (inDegree.get(succ) ?? 0) - 1;
        inDegree.set(succ, deg);
        if (deg === 0) queue.push(succ);
      }
    }

    if (sorted.length < items.length) {
      throw new BadRequestException(
        'Ciclo detectado nas precedências do módulo.',
      );
    }

    return sorted;
  }

  private topologicalOrderFromTasks(
    tasks: ScheduledTaskInternal[],
    idSet: Set<string>,
  ): string[] {
    return this.topologicalOrder(
      tasks.map((t) => ({
        id: t.curriculumSubjectId,
        dependsOnId: t.dependsOnId,
      })),
      idSet,
    );
  }

  private orderSubjectsByPrecedence<
    T extends { id: string; dependsOnId: string | null },
  >(items: T[]): T[] {
    const idSet = new Set(items.map((item) => item.id));
    return this.topologicalOrder(items, idSet).map(
      (id) => items.find((i) => i.id === id)!,
    );
  }
}

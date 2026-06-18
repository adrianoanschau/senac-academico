import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { GanttPlannerService } from './gantt-planner.service';
import { PrismaService } from '@/prisma/prisma.service';
import { ScheduleGeneratorService } from './schedule-generator.service';

describe('GanttPlannerService', () => {
  let service: GanttPlannerService;

  const mockPrisma = {
    classGroup: { findUnique: vi.fn() },
    curriculumSubject: { findMany: vi.fn() },
    schedule: { findMany: vi.fn(), createMany: vi.fn() },
    scheduleRule: { create: vi.fn() },
    $transaction: vi.fn(),
  };

  const mockGenerator = {
    generateProjections: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    mockPrisma.classGroup.findUnique.mockResolvedValue({
      id: 'class-1',
      curriculumId: 'curr-1',
    });
    mockPrisma.curriculumSubject.findMany.mockResolvedValue([
      {
        id: 'cs-1',
        subjectId: 'sub-1',
        dependsOnId: null,
        subject: { id: 'sub-1', code: 'UC1', name: 'Disciplina 1', hours: 2 },
      },
      {
        id: 'cs-2',
        subjectId: 'sub-2',
        dependsOnId: 'cs-1',
        subject: { id: 'sub-2', code: 'UC2', name: 'Disciplina 2', hours: 2 },
      },
    ]);
    mockPrisma.schedule.findMany.mockResolvedValue([]);
    mockGenerator.generateProjections
      .mockResolvedValueOnce([
        {
          startTime: new Date('2026-03-02T08:00:00'),
          endTime: new Date('2026-03-02T10:00:00'),
          durationInMinutes: 120,
        },
      ])
      .mockResolvedValueOnce([
        {
          startTime: new Date('2026-03-03T08:00:00'),
          endTime: new Date('2026-03-03T10:00:00'),
          durationInMinutes: 120,
        },
      ]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GanttPlannerService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ScheduleGeneratorService, useValue: mockGenerator },
      ],
    }).compile();

    service = module.get(GanttPlannerService);
  });

  describe('buildBlueprint', () => {
    it('deve gerar rascunho com barras macro por UC', async () => {
      const result = await service.buildBlueprint({
        classGroupId: 'class-1',
        moduleNumber: 1,
        startTimeStr: '08:00',
        endTimeStr: '10:00',
        subjects: [
          {
            curriculumSubjectId: 'cs-1',
            subjectId: 'sub-1',
            daysOfWeek: [1, 3],
            startDate: new Date('2026-03-01'),
            professorId: 'prof-1',
            roomId: 'room-1',
          },
          {
            curriculumSubjectId: 'cs-2',
            subjectId: 'sub-2',
            daysOfWeek: [2, 4],
            startDate: new Date('2026-03-01'),
            professorId: 'prof-2',
            roomId: 'room-2',
          },
        ],
      });

      expect(result.tasks).toHaveLength(2);
      expect(result.tasks[0].sessions.length).toBeGreaterThan(0);
      expect(result.tasks[0].start).toBeDefined();
      expect(result.tasks[0].end).toBeDefined();
      expect(result.canPublish).toBe(true);
    });

    it('deve agendar UCs prioritárias primeiro e repassar sessões como bloqueio por data', async () => {
      mockPrisma.curriculumSubject.findMany.mockResolvedValue([
        {
          id: 'cs-priority',
          subjectId: 'sub-p',
          dependsOnId: null,
          subject: { id: 'sub-p', code: 'UC5', name: 'Prioritária', hours: 2 },
        },
        {
          id: 'cs-normal',
          subjectId: 'sub-n',
          dependsOnId: null,
          subject: { id: 'sub-n', code: 'UC2', name: 'Normal', hours: 2 },
        },
      ]);

      const prioritySession = {
        startTime: new Date('2026-06-03T08:00:00'),
        endTime: new Date('2026-06-03T10:00:00'),
        durationInMinutes: 120,
      };

      mockGenerator.generateProjections.mockReset();
      mockGenerator.generateProjections
        .mockResolvedValueOnce([prioritySession])
        .mockResolvedValueOnce([
          {
            startTime: new Date('2026-03-04T08:00:00'),
            endTime: new Date('2026-03-04T10:00:00'),
            durationInMinutes: 120,
          },
        ]);

      await service.buildBlueprint({
        classGroupId: 'class-1',
        moduleNumber: 1,
        startTimeStr: '08:00',
        endTimeStr: '10:00',
        subjects: [
          {
            curriculumSubjectId: 'cs-normal',
            subjectId: 'sub-n',
            daysOfWeek: [1, 3, 5],
            startDate: new Date('2026-03-01'),
            professorId: 'prof-n',
            roomId: 'room-n',
          },
          {
            curriculumSubjectId: 'cs-priority',
            subjectId: 'sub-p',
            daysOfWeek: [2, 3],
            startDate: new Date('2026-06-01'),
            isPriority: true,
            professorId: 'prof-p',
            roomId: 'room-p',
          },
        ],
      });

      expect(mockGenerator.generateProjections).toHaveBeenNthCalledWith(
        1,
        expect.any(Date),
        [2, 3],
        '08:00',
        '10:00',
        2,
        expect.any(Array),
      );

      expect(mockGenerator.generateProjections).toHaveBeenNthCalledWith(
        2,
        expect.any(Date),
        [1, 3, 5],
        '08:00',
        '10:00',
        2,
        expect.arrayContaining([
          expect.objectContaining({
            startTime: prioritySession.startTime,
            endTime: prioritySession.endTime,
          }),
        ]),
      );
    });

    it('deve iniciar UC encadeada sem data de início informada', async () => {
      mockGenerator.generateProjections.mockReset();
      mockGenerator.generateProjections
        .mockResolvedValueOnce([
          {
            startTime: new Date('2026-03-02T08:00:00'),
            endTime: new Date('2026-03-02T10:00:00'),
            durationInMinutes: 120,
          },
        ])
        .mockResolvedValueOnce([
          {
            startTime: new Date('2026-03-03T08:00:00'),
            endTime: new Date('2026-03-03T10:00:00'),
            durationInMinutes: 120,
          },
        ]);

      await service.buildBlueprint({
        classGroupId: 'class-1',
        moduleNumber: 1,
        startTimeStr: '08:00',
        endTimeStr: '10:00',
        subjects: [
          {
            curriculumSubjectId: 'cs-1',
            subjectId: 'sub-1',
            daysOfWeek: [1, 3],
            startDate: new Date('2026-03-01'),
            professorId: 'prof-1',
            roomId: 'room-1',
          },
          {
            curriculumSubjectId: 'cs-2',
            subjectId: 'sub-2',
            daysOfWeek: [2, 4],
            dependsOnId: 'cs-1',
            professorId: 'prof-2',
            roomId: 'room-2',
          },
        ],
      });

      const uc2Anchor = mockGenerator.generateProjections.mock
        .calls[1][0] as Date;
      expect(uc2Anchor.getFullYear()).toBe(2026);
      expect(uc2Anchor.getMonth()).toBe(2);
      expect(uc2Anchor.getDate()).toBe(3);
    });

    it('deve iniciar UC encadeada no dia seguinte ao término da predecessora', async () => {
      mockPrisma.curriculumSubject.findMany.mockResolvedValue([
        {
          id: 'cs-2',
          subjectId: 'sub-2',
          dependsOnId: null,
          subject: { id: 'sub-2', code: 'UC2', name: 'Disciplina 2', hours: 4 },
        },
        {
          id: 'cs-3',
          subjectId: 'sub-3',
          dependsOnId: null,
          subject: { id: 'sub-3', code: 'UC3', name: 'Disciplina 3', hours: 2 },
        },
      ]);

      const uc2End = new Date('2026-05-15T10:00:00');

      mockGenerator.generateProjections.mockReset();
      mockGenerator.generateProjections
        .mockResolvedValueOnce([
          {
            startTime: new Date('2026-03-02T08:00:00'),
            endTime: new Date('2026-05-14T10:00:00'),
            durationInMinutes: 240,
          },
          {
            startTime: new Date('2026-05-15T08:00:00'),
            endTime: uc2End,
            durationInMinutes: 120,
          },
        ])
        .mockResolvedValueOnce([
          {
            startTime: new Date('2026-05-16T08:00:00'),
            endTime: new Date('2026-05-16T10:00:00'),
            durationInMinutes: 120,
          },
        ]);

      await service.buildBlueprint({
        classGroupId: 'class-1',
        moduleNumber: 1,
        startTimeStr: '08:00',
        endTimeStr: '10:00',
        subjects: [
          {
            curriculumSubjectId: 'cs-2',
            subjectId: 'sub-2',
            daysOfWeek: [1, 3, 5],
            startDate: new Date('2026-03-01'),
            professorId: 'prof-2',
            roomId: 'room-2',
          },
          {
            curriculumSubjectId: 'cs-3',
            subjectId: 'sub-3',
            daysOfWeek: [2, 4],
            startDate: new Date('2026-03-01'),
            dependsOnId: 'cs-2',
            professorId: 'prof-3',
            roomId: 'room-3',
          },
        ],
      });

      expect(mockGenerator.generateProjections).toHaveBeenNthCalledWith(
        1,
        expect.any(Date),
        [1, 3, 5],
        '08:00',
        '10:00',
        4,
        expect.any(Array),
      );

      const uc3Anchor = mockGenerator.generateProjections.mock
        .calls[1][0] as Date;
      expect(uc3Anchor.getFullYear()).toBe(2026);
      expect(uc3Anchor.getMonth()).toBe(4);
      expect(uc3Anchor.getDate()).toBe(16);
    });
  });

  describe('publishBlueprint', () => {
    it('deve bloquear publish quando houver conflitos', async () => {
      const overlappingSession = {
        startTime: new Date('2026-03-02T08:00:00'),
        endTime: new Date('2026-03-02T10:00:00'),
      };

      await expect(
        service.publishBlueprint({
          classGroupId: 'class-1',
          moduleNumber: 1,
          startTimeStr: '08:00',
          endTimeStr: '10:00',
          tasks: [
            {
              curriculumSubjectId: 'cs-1',
              subjectId: 'sub-1',
              dependsOnId: undefined,
              daysOfWeek: [1],
              professorId: 'prof-1',
              roomId: 'room-1',
              subjectCode: 'UC1',
              subjectName: 'Disciplina 1',
              hours: 2,
              sessions: [overlappingSession],
            },
            {
              curriculumSubjectId: 'cs-2',
              subjectId: 'sub-2',
              dependsOnId: 'cs-1',
              daysOfWeek: [1],
              professorId: 'prof-1',
              roomId: 'room-2',
              subjectCode: 'UC2',
              subjectName: 'Disciplina 2',
              hours: 2,
              sessions: [overlappingSession],
            },
          ],
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('topologicalSort', () => {
    const sort = (
      items: Array<{ id: string; dependsOnId: string | null }>,
      compareReady?: (a: { id: string }, b: { id: string }) => number,
    ) =>
      (
        service as unknown as {
          topologicalSort: (
            nodes: Array<{ id: string; dependsOnId: string | null }>,
            getDependsOnId: (item: {
              id: string;
              dependsOnId: string | null;
            }) => string | null,
            compare?: (a: { id: string }, b: { id: string }) => number,
          ) => string[];
        }
      ).topologicalSort(items, (item) => item.dependsOnId, compareReady);

    it('deve ordenar nós por precedência', () => {
      expect(
        sort([
          { id: 'b', dependsOnId: 'a' },
          { id: 'a', dependsOnId: null },
        ]),
      ).toEqual(['a', 'b']);
    });

    it('deve priorizar nós marcados como prioritários', () => {
      expect(
        sort(
          [
            { id: 'b', dependsOnId: null },
            { id: 'a', dependsOnId: null },
          ],
          (left, right) => {
            const priority = (id: string) => (id === 'a' ? 0 : 1);
            return priority(left.id) - priority(right.id);
          },
        ),
      ).toEqual(['a', 'b']);
    });

    it('deve detectar ciclo nas precedências', () => {
      expect(() =>
        sort([
          { id: 'a', dependsOnId: 'b' },
          { id: 'b', dependsOnId: 'a' },
        ]),
      ).toThrow(BadRequestException);
    });
  });
});

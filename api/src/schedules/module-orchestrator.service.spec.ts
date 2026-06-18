import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ModuleOrchestratorService } from './module-orchestrator.service';
import { SchedulesService } from './schedules.service';
import { PrismaService } from '@/prisma/prisma.service';
import { PlanModuleDto } from './dto/plan-module.dto';

describe('ModuleOrchestratorService', () => {
  let service: ModuleOrchestratorService;
  let schedulesService: SchedulesService;
  let prismaService: PrismaService;

  const mockSchedulesService = {
    generateBulk: vi.fn(),
  };

  const mockPrisma = {
    scheduleRule: {
      deleteMany: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModuleOrchestratorService,
        { provide: SchedulesService, useValue: mockSchedulesService },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ModuleOrchestratorService>(ModuleOrchestratorService);
    schedulesService = module.get<SchedulesService>(SchedulesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('planModuleTracks', () => {
    const dto: PlanModuleDto = {
      classGroupId: 'turma-1',
      startDate: new Date('2026-03-01T00:00:00Z'),
      tracks: [
        {
          isPriority: false,
          daysOfWeek: [1, 3],
          startTimeStr: '10:00',
          endTimeStr: '12:00',
          sequence: [
            { subjectId: 'subj-C', professorId: 'prof-C', roomId: 'room-C' },
          ],
        },
        {
          isPriority: true,
          daysOfWeek: [2, 4],
          startTimeStr: '08:00',
          endTimeStr: '10:00',
          sequence: [
            { subjectId: 'subj-A', professorId: 'prof-A', roomId: 'room-A' },
            { subjectId: 'subj-B', professorId: 'prof-B', roomId: 'room-B' },
          ],
        },
      ],
    };

    it('deve processar as trilhas respeitando a flag isPriority e o encadeamento das UCs', async () => {
      mockSchedulesService.generateBulk
        .mockResolvedValueOnce({ ruleId: 'rule-A' })
        .mockResolvedValueOnce({ ruleId: 'rule-B' })
        .mockResolvedValueOnce({ ruleId: 'rule-C' });

      const result = await service.planModuleTracks(dto);

      expect(result.summary.totalTracks).toBe(2);
      expect(result.summary.totalRulesGenerated).toBe(3);
      expect(
        vi.spyOn(schedulesService, 'generateBulk'),
      ).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          subjectId: 'subj-B',
          dependsOnRuleId: 'rule-A',
        }),
      );
    });

    it('deve reverter regras criadas quando ocorrer falha no meio da orquestração', async () => {
      mockSchedulesService.generateBulk
        .mockResolvedValueOnce({ ruleId: 'rule-A' })
        .mockRejectedValueOnce(new Error('Falha na segunda UC'));

      mockPrisma.scheduleRule.deleteMany.mockResolvedValue({ count: 1 });

      await expect(service.planModuleTracks(dto)).rejects.toThrow(
        'Falha na segunda UC',
      );

      expect(
        vi.spyOn(prismaService.scheduleRule, 'deleteMany'),
      ).toHaveBeenCalledWith({
        where: { id: { in: ['rule-A'] } },
      });
    });
  });
});

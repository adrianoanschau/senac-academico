import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ModuleOrchestratorService } from './module-orchestrator.service';
import { SchedulesService } from './schedules.service';
import { PlanModuleDto } from './dto/plan-module.dto';

describe('ModuleOrchestratorService', () => {
  let service: ModuleOrchestratorService;
  let schedulesService: SchedulesService;

  const mockSchedulesService = {
    generateBulk: vi.fn(),
  };

  beforeEach(async () => {
    // Arrange
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModuleOrchestratorService,
        { provide: SchedulesService, useValue: mockSchedulesService },
      ],
    }).compile();

    service = module.get<ModuleOrchestratorService>(ModuleOrchestratorService);
    schedulesService = module.get<SchedulesService>(SchedulesService);
  });

  describe('planModuleTracks', () => {
    it('deve processar as trilhas respeitando a flag isPriority e o encadeamento das UCs', async () => {
      // Arrange
      const dto: PlanModuleDto = {
        classGroupId: 'turma-1',
        startDate: new Date('2026-03-01T00:00:00Z'),
        tracks: [
          {
            isPriority: false, // Deve rodar DEPOIS
            daysOfWeek: [1, 3],
            startTimeStr: '10:00',
            endTimeStr: '12:00',
            sequence: [
              { subjectId: 'subj-C', professorId: 'prof-C', roomId: 'room-C' },
            ],
          },
          {
            isPriority: true, // Deve rodar PRIMEIRO
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

      // Simula retorno do gerador contendo as "Regras" recém-criadas
      mockSchedulesService.generateBulk
        .mockResolvedValueOnce({ ruleId: 'rule-A' }) // 1º chamado (Trilha Prioritária - subj-A)
        .mockResolvedValueOnce({ ruleId: 'rule-B' }) // 2º chamado (Trilha Prioritária - subj-B)
        .mockResolvedValueOnce({ ruleId: 'rule-C' }); // 3º chamado (Trilha Normal - subj-C)

      // Act
      const result = await service.planModuleTracks(dto);

      // Assert
      expect(result.summary.totalTracks).toBe(2);
      expect(result.summary.totalRulesGenerated).toBe(3);

      // Garante que o PRIMEIRO generateBulk atendeu a subj-A (porque isPriority=true)
      expect(
        vi.spyOn(schedulesService, 'generateBulk'),
      ).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          subjectId: 'subj-A',
          dependsOnRuleId: undefined, // Primeira trilha não depende de nada no início
        }),
      );

      // Garante que o SEGUNDO generateBulk atendeu a subj-B e recebeu a regra de dependência 'rule-A' gerada no passo 1.
      // Isso prova de forma isolada que a lógica de Encadeamento de Regras do seu Orquestrador funciona perfeitamente!
      expect(
        vi.spyOn(schedulesService, 'generateBulk'),
      ).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          subjectId: 'subj-B',
          dependsOnRuleId: 'rule-A', // Essa é a mágica do encadeamento da lista!
        }),
      );

      // Garante que a Trilha não prioritária rodou por último (subj-C) e isolada (dependsOn=undefined)
      expect(
        vi.spyOn(schedulesService, 'generateBulk'),
      ).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining({
          subjectId: 'subj-C',
          dependsOnRuleId: undefined, // Sendo uma nova trilha, a dependência é reiniciada!
        }),
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { FindSchedulesQueryDto } from './dto/find-schedules-query.dto';
import { PostponeScheduleDto } from './dto/postpone-schedule.dto';
import { GanttPlannerService } from './gantt-planner.service';
import { ModuleOrchestratorService } from './module-orchestrator.service';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

describe('SchedulesController', () => {
  let controller: SchedulesController;
  let service: SchedulesService;

  const mockSchedulesService = {
    findAll: vi.fn(),
    postponeClass: vi.fn(),
    remove: vi.fn(),
  };

  const mockModuleOrchestratorService = {
    planModuleTracks: vi.fn(),
  };

  const mockGanttPlannerService = {
    buildBlueprint: vi.fn(),
    recalculate: vi.fn(),
    publishBlueprint: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [
        { provide: SchedulesService, useValue: mockSchedulesService },
        {
          provide: ModuleOrchestratorService,
          useValue: mockModuleOrchestratorService,
        },
        {
          provide: GanttPlannerService,
          useValue: mockGanttPlannerService,
        },
      ],
    }).compile();

    controller = module.get<SchedulesController>(SchedulesController);
    service = module.get<SchedulesService>(SchedulesService);
  });

  describe('findAll', () => {
    it('deve delegar o DTO de query para o service', async () => {
      const mockData = [{ id: 'sched-1' }];
      mockSchedulesService.findAll.mockResolvedValue({ data: mockData });

      const query: FindSchedulesQueryDto = {
        start: '2026-06-01',
        end: '2026-06-30',
        classGroupId: 'cg',
        professorId: 'prof',
        roomId: 'room',
        subjectId: 'subj',
        status: ['PLANNED'],
        search: 'java',
      };

      const result = await controller.findAll(query);

      expect(vi.spyOn(service, 'findAll')).toHaveBeenCalledWith(query);
      expect(result).toEqual({ data: mockData });
    });
  });

  describe('postponeClass', () => {
    it('deve processar o adiamento da aula desestruturando o DTO e repassando argumentos isolados', async () => {
      const dto: PostponeScheduleDto = {
        reason: 'Professor doente',
        newDate: '2026-08-01',
        force: false,
      };
      const mockResponse = { message: 'Adiado' };
      mockSchedulesService.postponeClass.mockResolvedValue(mockResponse);

      const result = await controller.postponeClass('sched-1', dto);

      expect(vi.spyOn(service, 'postponeClass')).toHaveBeenCalledWith(
        'sched-1',
        dto.reason,
        dto.newDate,
        dto.force,
      );
      expect(result).toEqual({ data: mockResponse });
    });
  });

  describe('remove', () => {
    it('deve remover a aula e retornar a mensagem correta', async () => {
      const result = await controller.remove('sched-1');

      expect(result).toEqual({
        data: { message: 'Schedule removed successfully' },
      });
    });
  });
});

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { ModuleOrchestratorService } from './module-orchestrator.service';
import { PostponeScheduleDto } from './dto/postpone-schedule.dto';

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

  beforeEach(async () => {
    // Arrange
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [
        { provide: SchedulesService, useValue: mockSchedulesService },
        {
          provide: ModuleOrchestratorService,
          useValue: mockModuleOrchestratorService,
        },
      ],
    }).compile();

    controller = module.get<SchedulesController>(SchedulesController);
    service = module.get<SchedulesService>(SchedulesService);
  });

  describe('findAll', () => {
    it('deve extrair as querystrings corretamente e delegar para o service', async () => {
      // Arrange
      const mockData = [{ id: 'sched-1' }];
      mockSchedulesService.findAll.mockResolvedValue(mockData);

      // Act
      const result = await controller.findAll(
        'start',
        'end',
        'cg',
        'prof',
        'room',
        'subj',
        'PLANNED',
      );

      // Assert
      expect(vi.spyOn(service, 'findAll')).toHaveBeenCalledWith(
        'start',
        'end',
        'cg',
        'prof',
        'room',
        'subj',
        'PLANNED',
      );
      expect(result).toEqual({ data: mockData });
    });
  });

  describe('postponeClass', () => {
    it('deve processar o adiamento da aula desestruturando o DTO e repassando argumentos isolados', async () => {
      // Arrange
      const dto: PostponeScheduleDto = {
        reason: 'Professor doente',
        newDate: '2026-08-01',
        force: false,
      };
      const mockResponse = { message: 'Adiado' };
      mockSchedulesService.postponeClass.mockResolvedValue(mockResponse);

      // Act
      const result = await controller.postponeClass('sched-1', dto);

      // Assert
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
      // Act
      const result = await controller.remove('sched-1');

      // Assert
      expect(result).toEqual({
        data: { message: 'Schedule removed successfully' },
      });
    });
  });
});

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleOverridesController } from './schedule-overrides.controller';
import { ScheduleOverridesService } from './schedule-overrides.service';
import { CreateScheduleOverrideDto } from './dto/create-schedule-override.dto';

describe('ScheduleOverridesController', () => {
  let controller: ScheduleOverridesController;
  let service: ScheduleOverridesService;

  const mockOverridesService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    // Arrange
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleOverridesController],
      providers: [
        {
          provide: ScheduleOverridesService,
          useValue: mockOverridesService,
        },
      ],
    }).compile();

    controller = module.get<ScheduleOverridesController>(
      ScheduleOverridesController,
    );
    service = module.get<ScheduleOverridesService>(ScheduleOverridesService);
  });

  describe('create', () => {
    it('deve delegar ao service e encapsular resultado no formato de API "data"', async () => {
      // Arrange
      const dto: CreateScheduleOverrideDto = {
        title: 'Feriado Nacional',
      } as CreateScheduleOverrideDto;
      const mockResponse = { id: '123', ...dto };
      mockOverridesService.create.mockResolvedValue(mockResponse);

      // Act
      const result = await controller.create(dto);

      // Assert
      expect(vi.spyOn(service, 'create')).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ data: mockResponse });
    });
  });
});

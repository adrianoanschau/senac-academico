import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AppRole } from '@/prisma/generated';

import { CreateScheduleOverrideDto } from './dto/create-schedule-override.dto';
import { ScheduleOverridesController } from './schedule-overrides.controller';
import { ScheduleOverridesService } from './schedule-overrides.service';

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

  describe('RBAC', () => {
    it('deve restringir mutações a ADMIN e SECRETARY', () => {
      const reflector = new Reflector();
      const expectedRoles = [AppRole.ADMIN, AppRole.SECRETARY];

      expect(
        reflector.get<AppRole[]>(
          'roles',
          ScheduleOverridesController.prototype.create,
        ),
      ).toEqual(expectedRoles);
      expect(
        reflector.get<AppRole[]>(
          'roles',
          ScheduleOverridesController.prototype.update,
        ),
      ).toEqual(expectedRoles);
      expect(
        reflector.get<AppRole[]>(
          'roles',
          ScheduleOverridesController.prototype.remove,
        ),
      ).toEqual(expectedRoles);
    });
  });
});

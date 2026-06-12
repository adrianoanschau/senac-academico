import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ClassGroupsController } from './class-groups.controller';
import { ClassGroupsService } from './class-groups.service';

describe('ClassGroupsController', () => {
  let controller: ClassGroupsController;
  let service: ClassGroupsService;

  const mockClassGroupsService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    findModules: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    // Arrange
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassGroupsController],
      providers: [
        {
          provide: ClassGroupsService,
          useValue: mockClassGroupsService,
        },
      ],
    }).compile();

    controller = module.get<ClassGroupsController>(ClassGroupsController);
    service = module.get<ClassGroupsService>(ClassGroupsService);
  });

  describe('findModules', () => {
    it('deve expor o endpoint de extração de módulos e retornar encapsulado em "data"', async () => {
      // Arrange
      const classId = 'class-123';
      const mockModules = [1, 2, 3];
      mockClassGroupsService.findModules.mockResolvedValue(mockModules);

      // Act
      const result = await controller.findModules(classId);

      // Assert
      expect(vi.spyOn(service, 'findModules')).toHaveBeenCalledWith(classId);
      expect(result).toEqual({ data: mockModules });
    });
  });
});

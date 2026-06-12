import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { FindSubjectsQueryDto } from './dto/find-subjects-query.dto';

describe('SubjectsController', () => {
  let controller: SubjectsController;
  let service: SubjectsService;

  const mockSubjectsService = {
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
      controllers: [SubjectsController],
      providers: [
        {
          provide: SubjectsService,
          useValue: mockSubjectsService,
        },
      ],
    }).compile();

    controller = module.get<SubjectsController>(SubjectsController);
    service = module.get<SubjectsService>(SubjectsService);
  });

  describe('findAll', () => {
    it('deve injetar a query de filtros e retornar os objetos formatados', async () => {
      // Arrange
      const query: FindSubjectsQueryDto = {
        classGroupId: '1',
        moduleNumber: 1,
      };
      const mockSubjects = [{ id: '1', code: 'PROG' }];
      mockSubjectsService.findAll.mockResolvedValue(mockSubjects);

      // Act
      const result = await controller.findAll(query);

      // Assert
      expect(vi.spyOn(service, 'findAll')).toHaveBeenCalledWith(query);
      expect(result).toEqual({ data: mockSubjects });
    });
  });
});

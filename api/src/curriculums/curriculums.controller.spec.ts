import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { CurriculumsController } from './curriculums.controller';
import { CurriculumsService } from './curriculums.service';

describe('CurriculumsController', () => {
  let controller: CurriculumsController;
  let service: CurriculumsService;

  const mockCurriculumsService = {
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
      controllers: [CurriculumsController],
      providers: [
        {
          provide: CurriculumsService,
          useValue: mockCurriculumsService,
        },
      ],
    }).compile();

    controller = module.get<CurriculumsController>(CurriculumsController);
    service = module.get<CurriculumsService>(CurriculumsService);
  });

  describe('remove', () => {
    it('deve delegar a remoção para o service e retornar a mensagem de sucesso customizada', async () => {
      // Arrange
      const curriculumId = 'curr-123';
      // O service não precisa retornar nada (é void ou ignorado no controller)
      mockCurriculumsService.remove.mockResolvedValue(undefined);

      // Act
      const result = await controller.remove(curriculumId);

      // Assert
      expect(vi.spyOn(service, 'remove')).toHaveBeenCalledWith(curriculumId);
      expect(result).toEqual({
        data: { message: 'Curriculum removed successfully' },
      });
    });
  });
});

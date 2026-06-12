import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorsController } from './professors.controller';
import { ProfessorsService } from './professors.service';
import { CreateProfessorDto } from './dto/create-professor.dto';

describe('ProfessorsController', () => {
  let controller: ProfessorsController;
  let service: ProfessorsService;

  const mockProfessorsService = {
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
      controllers: [ProfessorsController],
      providers: [
        {
          provide: ProfessorsService,
          useValue: mockProfessorsService,
        },
      ],
    }).compile();

    controller = module.get<ProfessorsController>(ProfessorsController);
    service = module.get<ProfessorsService>(ProfessorsService);
  });

  describe('create', () => {
    it('deve delegar a criação para o service e encapsular em "data"', async () => {
      // Arrange
      const dto: CreateProfessorDto = {
        name: 'Maria Silva',
        email: 'maria@senac.br',
      };
      const mockProf = { id: '123', ...dto };
      mockProfessorsService.create.mockResolvedValue(mockProf);

      // Act
      const result = await controller.create(dto);

      // Assert
      expect(vi.spyOn(service, 'create')).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ data: mockProf });
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os professores em "data"', async () => {
      // Arrange
      const mockProfs = [
        { id: '1', name: 'Maria' },
        { id: '2', name: 'João' },
      ];
      mockProfessorsService.findAll.mockResolvedValue(mockProfs);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(vi.spyOn(service, 'findAll')).toHaveBeenCalled();
      expect(result).toEqual({ data: mockProfs });
    });
  });
});

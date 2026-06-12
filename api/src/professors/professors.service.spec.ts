import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

type MockProfessor = {
  id: string;
  name: string;
  email: string;
  degree: string | null;
  department: string | null;
  createdAt: Date;
  updatedAt: Date;
};

describe('ProfessorsService', () => {
  let service: ProfessorsService;
  let prismaService: PrismaService;

  const mockPrisma = {
    professor: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  const mockProfessor: MockProfessor = {
    id: 'prof-123',
    name: 'João Silva',
    email: 'joao.silva@senac.br',
    degree: 'Mestre',
    department: 'TI',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    // Arrange
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessorsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ProfessorsService>(ProfessorsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('deve criar um professor com sucesso (Caminho Feliz)', async () => {
      // Arrange
      const dto: CreateProfessorDto = {
        name: 'João Silva',
        email: 'joao.silva@senac.br',
      };
      mockPrisma.professor.create.mockResolvedValue(mockProfessor);

      // Act
      const result = await service.create(dto);

      // Assert
      expect(vi.spyOn(prismaService.professor, 'create')).toHaveBeenCalledWith({
        data: dto,
      });
      expect(result).toEqual(mockProfessor);
    });
  });

  describe('findOne', () => {
    it('deve retornar o professor encontrado pelo ID (Caminho Feliz)', async () => {
      // Arrange
      mockPrisma.professor.findUnique.mockResolvedValue(mockProfessor);

      // Act
      const result = await service.findOne('prof-123');

      // Assert
      expect(
        vi.spyOn(prismaService.professor, 'findUnique'),
      ).toHaveBeenCalledWith({ where: { id: 'prof-123' } });
      expect(result).toEqual(mockProfessor);
    });

    it('deve lançar NotFoundException se o professor não existir (Caminho Triste)', async () => {
      // Arrange
      mockPrisma.professor.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('deve buscar o professor antes e atualizar com sucesso (Caminho Feliz)', async () => {
      // Arrange
      const dto: UpdateProfessorDto = {
        name: 'João Atualizado',
      };
      const findOneSpy = vi
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockProfessor);

      const updatedProf = { ...mockProfessor, name: 'João Atualizado' };
      mockPrisma.professor.update.mockResolvedValue(updatedProf);

      // Act
      const result = await service.update('prof-123', dto);

      // Assert
      expect(findOneSpy).toHaveBeenCalledWith('prof-123');
      expect(vi.spyOn(prismaService.professor, 'update')).toHaveBeenCalledWith({
        where: { id: 'prof-123' },
        data: dto,
      });
      expect(result).toEqual(updatedProf);
    });
  });
});

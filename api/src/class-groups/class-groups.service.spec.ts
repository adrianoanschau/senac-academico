import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { ClassGroupsService } from './class-groups.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateClassGroupDto } from './dto/create-class-group.dto';

type MockClassGroup = {
  id: string;
  code: string;
  curriculumId: string;
};

describe('ClassGroupsService', () => {
  let service: ClassGroupsService;
  let prismaService: PrismaService;

  const mockPrisma = {
    classGroup: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    curriculum: {
      findUnique: vi.fn(),
    },
    curriculumSubject: {
      findMany: vi.fn(),
    },
  };

  const mockClassGroup: MockClassGroup = {
    id: 'class-1',
    code: 'TDS101',
    curriculumId: 'curr-1',
  };

  beforeEach(async () => {
    // Arrange
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassGroupsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ClassGroupsService>(ClassGroupsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    const dto: CreateClassGroupDto = {
      code: 'TDS101',
      curriculumId: 'curr-1',
    } as CreateClassGroupDto;

    it('deve gerar erro de conflito caso o código da turma já exista', async () => {
      // Arrange
      mockPrisma.classGroup.findUnique.mockResolvedValue(mockClassGroup);

      // Act & Assert
      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });

    it('deve validar se a matriz (curriculum) existe ou lançar Not Found', async () => {
      // Arrange
      mockPrisma.classGroup.findUnique.mockResolvedValue(null);
      // Simula não encontrar o curriculum atrelado
      mockPrisma.curriculum.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
      expect(
        vi.spyOn(prismaService.curriculum, 'findUnique'),
      ).toHaveBeenCalledWith({
        where: { id: dto.curriculumId },
      });
    });
  });

  describe('findModules', () => {
    it('deve retornar um array vazio se a turma não tiver matriz atrelada (Caminho Triste)', async () => {
      // Arrange
      mockPrisma.classGroup.findUnique.mockResolvedValue(null);

      // Act
      const result = await service.findModules('invalid');

      // Assert
      expect(result).toEqual([]);
      expect(
        vi.spyOn(prismaService.curriculumSubject, 'findMany'),
      ).not.toHaveBeenCalled();
    });

    it('deve extrair os módulos de forma distinta baseado na matriz da turma (Caminho Feliz)', async () => {
      // Arrange
      mockPrisma.classGroup.findUnique.mockResolvedValue({
        curriculumId: 'curr-1',
      });
      mockPrisma.curriculumSubject.findMany.mockResolvedValue([
        { module: 1 },
        { module: 2 },
      ]);

      // Act
      const result = await service.findModules('class-1');

      // Assert
      expect(
        vi.spyOn(prismaService.curriculumSubject, 'findMany'),
      ).toHaveBeenCalledWith({
        where: { curriculumId: 'curr-1' },
        distinct: ['module'],
        select: { module: true },
        orderBy: { module: 'asc' },
      });
      // Garantimos o mapping feito pelo service devolvendo um Array de números puros
      expect(result).toEqual([1, 2]);
    });
  });
});

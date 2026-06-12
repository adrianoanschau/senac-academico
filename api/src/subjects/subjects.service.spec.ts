import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { FindSubjectsQueryDto } from './dto/find-subjects-query.dto';

type MockSubject = {
  id: string;
  code: string;
  name: string;
  hours: number;
};

describe('SubjectsService', () => {
  let service: SubjectsService;
  let prismaService: PrismaService;

  const mockPrisma = {
    subject: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    classGroup: {
      findUnique: vi.fn(),
    },
  };

  const mockSubject: MockSubject = {
    id: 'subj-1',
    code: 'PROG-01',
    name: 'Lógica de Programação',
    hours: 60,
  };

  beforeEach(async () => {
    // Arrange
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<SubjectsService>(SubjectsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    const dto: CreateSubjectDto = {
      code: 'PROG-01',
      name: 'Lógica',
      hours: 60,
    };

    it('deve lançar ConflictException caso o código da disciplina já exista (Caminho Triste)', async () => {
      // Arrange
      mockPrisma.subject.findUnique.mockResolvedValue(mockSubject);

      // Act & Assert
      await expect(service.create(dto)).rejects.toThrow(ConflictException);
      expect(vi.spyOn(prismaService.subject, 'create')).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('deve buscar todas as disciplinas ordenadas se não receber queries (Caminho Feliz)', async () => {
      // Arrange
      mockPrisma.subject.findMany.mockResolvedValue([mockSubject]);

      // Act
      const result = await service.findAll({});

      // Assert
      expect(vi.spyOn(prismaService.subject, 'findMany')).toHaveBeenCalledWith({
        where: {},
        orderBy: [{ code: 'asc' }, { name: 'asc' }],
      });
      expect(result).toEqual([mockSubject]);
    });

    it('deve retornar disciplinas restritas ao currículo se a query possuir classGroupId (Caminho Feliz)', async () => {
      // Arrange
      const query: FindSubjectsQueryDto = {
        classGroupId: 'class-99',
        moduleNumber: 2,
      };
      mockPrisma.classGroup.findUnique.mockResolvedValue({
        curriculumId: 'curr-88',
      });
      mockPrisma.subject.findMany.mockResolvedValue([mockSubject]);

      // Act
      const result = await service.findAll(query);

      // Assert
      expect(
        vi.spyOn(prismaService.classGroup, 'findUnique'),
      ).toHaveBeenCalledWith({
        where: { id: 'class-99' },
        select: { curriculumId: true },
      });
      expect(vi.spyOn(prismaService.subject, 'findMany')).toHaveBeenCalledWith({
        where: {
          curriculums: {
            some: { curriculumId: 'curr-88', module: 2 },
          },
        },
        orderBy: [{ code: 'asc' }, { name: 'asc' }],
      });
      expect(result).toEqual([mockSubject]);
    });

    it('deve retornar um array vazio sem buscar subjects se o classGroup for inválido (Caminho Triste)', async () => {
      // Arrange
      const query: FindSubjectsQueryDto = {
        classGroupId: 'invalid',
      };
      // Simula banco não encontrando a turma
      mockPrisma.classGroup.findUnique.mockResolvedValue(null);

      // Act
      const result = await service.findAll(query);

      // Assert
      expect(result).toEqual([]);
      expect(
        vi.spyOn(prismaService.subject, 'findMany'),
      ).not.toHaveBeenCalled();
    });
  });
});

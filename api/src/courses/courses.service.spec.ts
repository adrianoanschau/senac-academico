import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

// Tipagem estrita para os mocks
type MockCourse = {
  id: string;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

describe('CoursesService', () => {
  let service: CoursesService;
  let prismaService: PrismaService;

  const mockPrisma = {
    course: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  const mockCourse: MockCourse = {
    id: 'course-123',
    code: 'CC',
    name: 'Ciência da Computação',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    // Arrange
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    const dto: CreateCourseDto = {
      code: 'CC',
      name: 'Ciência da Computação',
    };

    it('deve criar e retornar um novo curso (Caminho Feliz)', async () => {
      // Arrange
      mockPrisma.course.findUnique.mockResolvedValue(null);
      mockPrisma.course.create.mockResolvedValue(mockCourse);

      // Act
      const result = await service.create(dto);

      // Assert
      expect(vi.spyOn(prismaService.course, 'findUnique')).toHaveBeenCalledWith(
        {
          where: { code: dto.code },
        },
      );
      expect(vi.spyOn(prismaService.course, 'create')).toHaveBeenCalledWith({
        data: dto,
      });
      expect(result).toEqual(mockCourse);
    });

    it('deve lançar ConflictException se o código do curso já existir (Caminho Triste)', async () => {
      // Arrange
      mockPrisma.course.findUnique.mockResolvedValue(mockCourse);

      // Act & Assert
      await expect(service.create(dto)).rejects.toThrow(ConflictException);
      expect(vi.spyOn(prismaService.course, 'create')).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve retornar o curso se ele for encontrado (Caminho Feliz)', async () => {
      // Arrange
      mockPrisma.course.findUnique.mockResolvedValue(mockCourse);

      // Act
      const result = await service.findOne('course-123');

      // Assert
      expect(vi.spyOn(prismaService.course, 'findUnique')).toHaveBeenCalledWith(
        {
          where: { id: 'course-123' },
        },
      );
      expect(result).toEqual(mockCourse);
    });

    it('deve lançar NotFoundException se o curso não existir (Caminho Triste)', async () => {
      // Arrange
      mockPrisma.course.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('deve validar a existência do curso e deletá-lo com sucesso (Caminho Feliz)', async () => {
      // Arrange
      // Usamos o spyOn para monitorar a função pública da própria classe
      const findOneSpy = vi
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockCourse);
      mockPrisma.course.delete.mockResolvedValue(mockCourse);

      // Act
      const result = await service.remove('course-123');

      // Assert
      expect(findOneSpy).toHaveBeenCalledWith('course-123');
      expect(vi.spyOn(prismaService.course, 'delete')).toHaveBeenCalledWith({
        where: { id: 'course-123' },
      });
      expect(result).toEqual(mockCourse);
    });
  });
});

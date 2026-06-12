import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CurriculumsService } from './curriculums.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';

type MockCurriculum = {
  id: string;
  name: string;
  active: boolean;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
};

describe('CurriculumsService', () => {
  let service: CurriculumsService;
  let prismaService: PrismaService;

  const mockPrisma = {
    curriculum: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    course: {
      findUnique: vi.fn(),
    },
  };

  const mockCurriculum: MockCurriculum = {
    id: 'curr-123',
    name: 'Matriz 2026',
    active: true,
    courseId: 'course-123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    // Arrange
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurriculumsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CurriculumsService>(CurriculumsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    const dto: CreateCurriculumDto = {
      name: 'Matriz 2026',
      active: true,
      courseId: 'course-123',
      subjects: [{ subjectId: 'subj-1', module: 1 }],
    };

    it('deve validar o curso e criar uma matriz com sucesso (Caminho Feliz)', async () => {
      // Arrange
      mockPrisma.course.findUnique.mockResolvedValue({ id: 'course-123' });
      mockPrisma.curriculum.create.mockResolvedValue(mockCurriculum);

      // Act
      const result = await service.create(dto);

      // Assert
      expect(mockPrisma.course.findUnique).toHaveBeenCalledWith({
        where: { id: dto.courseId },
      });
      expect(mockPrisma.curriculum.create).toHaveBeenCalled();
      expect(result).toEqual(mockCurriculum);
    });

    it('deve lançar NotFoundException se o curso não existir (Caminho Triste)', async () => {
      // Arrange
      mockPrisma.course.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
      expect(
        vi.spyOn(prismaService.curriculum, 'create'),
      ).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    const dto: UpdateCurriculumDto = {
      courseId: 'course-999',
    };

    it('deve lançar NotFoundException se for passado um novo courseId e ele não existir', async () => {
      // Arrange
      vi.spyOn(service, 'findOne').mockResolvedValue(
        mockCurriculum as unknown as Awaited<
          ReturnType<typeof service.findOne>
        >,
      );
      mockPrisma.course.findUnique.mockResolvedValue(null); // Curso não encontrado

      // Act & Assert
      await expect(service.update('curr-123', dto)).rejects.toThrow(
        NotFoundException,
      );
      expect(
        vi.spyOn(prismaService.curriculum, 'update'),
      ).not.toHaveBeenCalled();
    });

    it('deve atualizar com sucesso limpando e recriando os vínculos de disciplinas se enviados (Caminho Feliz)', async () => {
      // Arrange
      const fullDto: UpdateCurriculumDto = {
        name: 'Matriz Atualizada',
        subjects: [{ subjectId: 'subj-2', module: 2 }],
      };

      vi.spyOn(service, 'findOne').mockResolvedValue(
        mockCurriculum as unknown as Awaited<
          ReturnType<typeof service.findOne>
        >,
      );
      const updatedResult = { ...mockCurriculum, name: 'Matriz Atualizada' };
      mockPrisma.curriculum.update.mockResolvedValue(updatedResult);

      // Act
      await service.update('curr-123', fullDto);

      // Assert
      // Garante que tentou apagar e recriar as dependências aninhadas
      expect(vi.spyOn(prismaService.curriculum, 'update')).toHaveBeenCalledWith(
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data: expect.objectContaining({
            subjects: {
              deleteMany: {},
              create: [{ subjectId: 'subj-2', module: 2 }],
            },
          }),
        }),
      );
    });
  });
});

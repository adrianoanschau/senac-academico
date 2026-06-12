import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

describe('CoursesController', () => {
  let controller: CoursesController;
  let service: CoursesService;

  const mockCoursesService = {
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
      controllers: [CoursesController],
      providers: [
        {
          provide: CoursesService,
          useValue: mockCoursesService,
        },
      ],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
    service = module.get<CoursesService>(CoursesService);
  });

  describe('create', () => {
    it('deve delegar para o service e retornar encapsulado num objeto "data"', async () => {
      // Arrange
      const dto: CreateCourseDto = {
        code: 'CC',
        name: 'Ciências',
      };
      const mockCourse = { id: '123', ...dto };
      mockCoursesService.create.mockResolvedValue(mockCourse);

      // Act
      const result = await controller.create(dto);

      // Assert
      expect(vi.spyOn(service, 'create')).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ data: mockCourse });
    });
  });

  describe('findOne', () => {
    it('deve extrair o param ID, buscar no service e retornar encapsulado', async () => {
      // Arrange
      const courseId = 'course-123';
      const mockCourse = { id: courseId, name: 'Ciências' };
      mockCoursesService.findOne.mockResolvedValue(mockCourse);

      // Act
      const result = await controller.findOne(courseId);

      // Assert
      expect(vi.spyOn(service, 'findOne')).toHaveBeenCalledWith(courseId);
      expect(result).toEqual({ data: mockCourse });
    });
  });
});

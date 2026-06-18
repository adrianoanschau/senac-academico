import { ConflictException, Injectable } from '@nestjs/common';

import { findOrThrow } from '@/common/entity.utils';
import { PrismaService } from '@/prisma/prisma.service';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    const existingCourse = await this.prisma.course.findUnique({
      where: { code: createCourseDto.code },
    });

    if (existingCourse) {
      throw new ConflictException(
        `Já existe um curso cadastrado com o código ${createCourseDto.code}`,
      );
    }

    return this.prisma.course.create({
      data: createCourseDto,
    });
  }

  async findAll() {
    return this.prisma.course.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      // Opcional: Se quiser que a busca do curso já traga os planos (curriculums) atrelados a ele:
      // include: { curriculums: true }
    });

    return findOrThrow(course, `Curso com ID ${id} não encontrado`);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    await this.findOne(id);

    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.course.delete({
      where: { id },
    });
  }
}

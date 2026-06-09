import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';

@Injectable()
export class CurriculumsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCurriculumDto: CreateCurriculumDto) {
    const { name, active, courseId, subjects } = createCurriculumDto;

    const courseExists = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!courseExists) {
      throw new NotFoundException(`Curso com ID ${courseId} não encontrado.`);
    }

    return this.prisma.curriculum.create({
      data: {
        name,
        active,
        courseId,
        subjects: {
          create: subjects.map((sub) => ({
            subjectId: sub.subjectId,
            module: sub.module,
          })),
        },
      },
      include: {
        subjects: {
          include: {
            subject: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.curriculum.findMany({
      include: {
        course: true,
        subjects: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const curriculum = await this.prisma.curriculum.findUnique({
      where: { id },
      include: {
        course: true,
        subjects: {
          include: { subject: true },
          orderBy: { module: 'asc' },
        },
      },
    });

    if (!curriculum) {
      throw new NotFoundException(`Plano de Curso com ID ${id} não encontrado`);
    }

    return curriculum;
  }

  async update(id: string, updateCurriculumDto: UpdateCurriculumDto) {
    const { name, active, courseId, subjects } = updateCurriculumDto;

    // Verifica se a matriz curricular existe
    await this.findOne(id);

    if (courseId) {
      const courseExists = await this.prisma.course.findUnique({
        where: { id: courseId },
      });
      if (!courseExists) {
        throw new NotFoundException(`Curso com ID ${courseId} não encontrado.`);
      }
    }

    return this.prisma.curriculum.update({
      where: { id },
      data: {
        name,
        active,
        courseId,
        ...(subjects && {
          subjects: {
            deleteMany: {}, // Limpa as disciplinas atreladas anteriores
            create: subjects.map((sub) => ({
              subjectId: sub.subjectId,
              module: sub.module,
            })),
          },
        }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.curriculum.delete({
      where: { id },
    });
  }
}

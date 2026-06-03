import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';

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
}

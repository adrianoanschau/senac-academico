import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { findOrThrow } from '@/common/entity.utils';
import { PrismaService } from '@/prisma/prisma.service';

import { AddSubjectToCurriculumDto } from './dto/add-subject-to-curriculum.dto';
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

    findOrThrow(courseExists, `Curso com ID ${courseId} não encontrado.`);

    return this.prisma.curriculum.create({
      data: {
        name,
        active,
        courseId,
        subjects: {
          create: (subjects ?? []).map((sub) => ({
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

    return findOrThrow(
      curriculum,
      `Plano de Curso com ID ${id} não encontrado`,
    );
  }

  async update(id: string, updateCurriculumDto: UpdateCurriculumDto) {
    const { name, active, courseId, subjects } = updateCurriculumDto;

    // Verifica se a matriz curricular existe
    await this.findOne(id);

    if (courseId) {
      const courseExists = await this.prisma.course.findUnique({
        where: { id: courseId },
      });
      findOrThrow(courseExists, `Curso com ID ${courseId} não encontrado.`);
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

  async addSubject(curriculumId: string, dto: AddSubjectToCurriculumDto) {
    const { subjectId, module, createSubject } = dto;

    if (!subjectId && !createSubject) {
      throw new BadRequestException(
        'Informe subjectId ou createSubject para adicionar a disciplina.',
      );
    }
    if (subjectId && createSubject) {
      throw new BadRequestException(
        'Informe apenas subjectId ou createSubject, não ambos.',
      );
    }

    await this.findOne(curriculumId);

    return this.prisma.$transaction(async (tx) => {
      let resolvedSubjectId = subjectId;

      if (createSubject) {
        const existing = await tx.subject.findUnique({
          where: {
            code_name: {
              code: createSubject.code,
              name: createSubject.name,
            },
          },
        });

        if (existing) {
          throw new ConflictException(
            `Já existe uma disciplina cadastrada com o código ${createSubject.code} e nome ${createSubject.name}`,
          );
        }

        const created = await tx.subject.create({ data: createSubject });
        resolvedSubjectId = created.id;
      } else {
        const subject = await tx.subject.findUnique({
          where: { id: resolvedSubjectId },
        });
        findOrThrow(
          subject,
          `Disciplina com ID ${resolvedSubjectId} não encontrada`,
        );
      }

      const existingLink = await tx.curriculumSubject.findUnique({
        where: {
          curriculumId_subjectId: {
            curriculumId,
            subjectId: resolvedSubjectId!,
          },
        },
      });

      if (existingLink) {
        throw new ConflictException(
          'Esta disciplina já está vinculada a esta grade.',
        );
      }

      return tx.curriculumSubject.create({
        data: {
          curriculumId,
          subjectId: resolvedSubjectId!,
          module,
        },
        include: {
          subject: true,
        },
      });
    });
  }

  async removeSubject(curriculumId: string, curriculumSubjectId: string) {
    await this.findOne(curriculumId);

    const link = await this.prisma.curriculumSubject.findFirst({
      where: { id: curriculumSubjectId, curriculumId },
    });

    findOrThrow(
      link,
      `Vínculo de disciplina com ID ${curriculumSubjectId} não encontrado nesta grade.`,
    );

    return this.prisma.curriculumSubject.delete({
      where: { id: curriculumSubjectId },
    });
  }
}

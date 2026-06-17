import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@/prisma/generated';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { FindSubjectsQueryDto } from './dto/find-subjects-query.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const existingSubject = await this.prisma.subject.findUnique({
      where: {
        code_name: {
          code: createSubjectDto.code,
          name: createSubjectDto.name,
        },
      },
    });

    if (existingSubject) {
      throw new ConflictException(
        `Já existe uma disciplina cadastrada com o código ${createSubjectDto.code} e nome ${createSubjectDto.name}`,
      );
    }

    return this.prisma.subject.create({
      data: createSubjectDto,
    });
  }

  async findAll(query?: FindSubjectsQueryDto) {
    const where: Prisma.SubjectWhereInput = {};

    if (query?.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { code: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query?.excludeCurriculumId) {
      where.NOT = {
        curriculums: {
          some: { curriculumId: query.excludeCurriculumId },
        },
      };
    }

    // Se uma turma foi informada, a busca de disciplinas é restrita à grade dela.
    if (query?.classGroupId) {
      const classGroup = await this.prisma.classGroup.findUnique({
        where: { id: query.classGroupId },
        select: { curriculumId: true },
      });

      // Se a turma não for encontrada ou não tiver grade, retorna um array vazio.
      if (!classGroup || !classGroup.curriculumId) {
        return [];
      }

      where.curriculums = {
        some: {
          curriculumId: classGroup.curriculumId,
          ...(query?.moduleNumber !== undefined
            ? { module: query.moduleNumber }
            : {}),
        },
      };
    } else if (query?.moduleNumber !== undefined) {
      // Se apenas o módulo foi informado, busca em todas as grades.
      where.curriculums = {
        some: { module: query.moduleNumber },
      };
    }

    return this.prisma.subject.findMany({
      where,
      orderBy: [{ code: 'asc' }, { name: 'asc' }],
      ...(query?.includeCurriculums && {
        include: {
          curriculums: {
            include: {
              curriculum: {
                include: { course: true },
              },
            },
            orderBy: { module: 'asc' },
          },
        },
      }),
    });
  }

  async findOne(id: string) {
    const subject = await this.prisma.subject.findUnique({
      where: { id },
    });

    if (!subject) {
      throw new NotFoundException(`Disciplina com ID ${id} não encontrada`);
    }

    return subject;
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto) {
    await this.findOne(id);

    return this.prisma.subject.update({
      where: { id },
      data: updateSubjectDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.subject.delete({
      where: { id },
    });
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { CreateClassGroupDto } from './dto/create-class-group.dto';
import { UpdateClassGroupDto } from './dto/update-class-group.dto';

@Injectable()
export class ClassGroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClassGroupDto: CreateClassGroupDto) {
    const { code, curriculumId } = createClassGroupDto;

    const existingClass = await this.prisma.classGroup.findUnique({
      where: { code },
    });
    if (existingClass) {
      throw new ConflictException(`A turma com o código ${code} já existe.`);
    }

    const curriculum = await this.prisma.curriculum.findUnique({
      where: { id: curriculumId },
    });
    if (!curriculum) {
      throw new NotFoundException(
        `Plano de curso com ID ${curriculumId} não encontrado.`,
      );
    }

    return this.prisma.classGroup.create({
      data: createClassGroupDto,
      include: {
        curriculum: {
          include: { course: true },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.classGroup.findMany({
      include: {
        curriculum: {
          include: { course: true },
        },
      },
      orderBy: { code: 'asc' },
    });
  }

  async findOne(id: string) {
    const classGroup = await this.prisma.classGroup.findUnique({
      where: { id },
      include: {
        curriculum: {
          include: { course: true, subjects: { include: { subject: true } } },
        },
      },
    });

    if (!classGroup) {
      throw new NotFoundException(`Turma com ID ${id} não encontrada.`);
    }

    return classGroup;
  }

  async update(id: string, updateClassGroupDto: UpdateClassGroupDto) {
    await this.findOne(id);

    if (updateClassGroupDto.curriculumId) {
      const curriculum = await this.prisma.curriculum.findUnique({
        where: { id: updateClassGroupDto.curriculumId },
      });

      if (!curriculum) {
        throw new NotFoundException(
          `Plano de curso com ID ${updateClassGroupDto.curriculumId} não encontrado.`,
        );
      }
    }

    return this.prisma.classGroup.update({
      where: { id },
      data: updateClassGroupDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.classGroup.delete({
      where: { id },
    });
  }

  async findModules(classGroupId: string): Promise<number[]> {
    const classGroup = await this.prisma.classGroup.findUnique({
      where: { id: classGroupId },
      select: { curriculumId: true },
    });

    if (!classGroup || !classGroup.curriculumId) {
      return [];
    }

    const distinctModules = await this.prisma.curriculumSubject.findMany({
      where: {
        curriculumId: classGroup.curriculumId,
      },
      distinct: ['module'],
      select: {
        module: true,
      },
      orderBy: {
        module: 'asc',
      },
    });

    return distinctModules.map((item) => item.module);
  }

  async findModuleSubjects(classGroupId: string, moduleNumber: number) {
    const classGroup = await this.prisma.classGroup.findUnique({
      where: { id: classGroupId },
      select: { curriculumId: true },
    });

    if (!classGroup?.curriculumId) {
      return [];
    }

    const curriculumSubjects = await this.prisma.curriculumSubject.findMany({
      where: {
        curriculumId: classGroup.curriculumId,
        module: moduleNumber,
      },
      include: {
        subject: true,
      },
    });

    return this.orderSubjectsByPrecedence(curriculumSubjects);
  }

  private orderSubjectsByPrecedence<
    T extends { id: string; dependsOnId: string | null },
  >(items: T[]): T[] {
    if (items.length <= 1) {
      return items;
    }

    const idSet = new Set(items.map((item) => item.id));
    const itemMap = new Map(items.map((item) => [item.id, item]));
    const inDegree = new Map<string, number>();
    const successors = new Map<string, string[]>();

    for (const item of items) {
      inDegree.set(item.id, 0);
      successors.set(item.id, []);
    }

    for (const item of items) {
      if (item.dependsOnId && idSet.has(item.dependsOnId)) {
        inDegree.set(item.id, (inDegree.get(item.id) ?? 0) + 1);
        successors.get(item.dependsOnId)!.push(item.id);
      }
    }

    const queue = items
      .filter((item) => (inDegree.get(item.id) ?? 0) === 0)
      .map((item) => item.id);
    const sorted: T[] = [];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      sorted.push(itemMap.get(currentId)!);

      for (const successorId of successors.get(currentId) ?? []) {
        const nextDegree = (inDegree.get(successorId) ?? 0) - 1;
        inDegree.set(successorId, nextDegree);
        if (nextDegree === 0) {
          queue.push(successorId);
        }
      }
    }

    if (sorted.length < items.length) {
      const sortedIds = new Set(sorted.map((item) => item.id));
      sorted.push(...items.filter((item) => !sortedIds.has(item.id)));
    }

    return sorted;
  }
}

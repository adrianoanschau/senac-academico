import {
  Injectable,
  NotFoundException,
  ConflictException,
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
}

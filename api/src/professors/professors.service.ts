import { ConflictException, Injectable } from '@nestjs/common';

import { findOrThrow } from '@/common/entity.utils';
import { PrismaService } from '@/prisma/prisma.service';

import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProfessorDto: CreateProfessorDto) {
    const existingProfessor = await this.prisma.professor.findUnique({
      where: { email: createProfessorDto.email },
    });

    if (existingProfessor) {
      throw new ConflictException(
        `Já existe um professor cadastrado com o e-mail ${createProfessorDto.email}.`,
      );
    }

    return this.prisma.professor.create({
      data: createProfessorDto,
    });
  }

  findAll() {
    return this.prisma.professor.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const professor = await this.prisma.professor.findUnique({
      where: { id },
    });

    return findOrThrow(professor, `Professor com ID ${id} não encontrado.`);
  }

  async update(id: string, updateProfessorDto: UpdateProfessorDto) {
    await this.findOne(id);

    if (updateProfessorDto.email) {
      const emailConflict = await this.prisma.professor.findFirst({
        where: {
          email: updateProfessorDto.email,
          NOT: { id },
        },
      });

      if (emailConflict) {
        throw new ConflictException(
          `Já existe um professor cadastrado com o e-mail ${updateProfessorDto.email}.`,
        );
      }
    }

    return this.prisma.professor.update({
      where: { id },
      data: updateProfessorDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.professor.delete({
      where: { id },
    });
  }
}

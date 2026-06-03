import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProfessorDto: CreateProfessorDto) {
    return this.prisma.professor.create({
      data: createProfessorDto,
    });
  }

  findAll() {
    return this.prisma.professor.findMany();
  }

  async findOne(id: string) {
    const professor = await this.prisma.professor.findUnique({
      where: { id },
    });

    if (!professor) {
      throw new NotFoundException(`Professor com ID ${id} não encontrado`);
    }

    return professor;
  }

  async update(id: string, updateProfessorDto: UpdateProfessorDto) {
    await this.findOne(id);

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

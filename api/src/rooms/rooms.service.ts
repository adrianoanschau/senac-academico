import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { findOrThrow } from '@/common/entity.utils';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    const existingRoom = await this.prisma.room.findUnique({
      where: { name: createRoomDto.name },
    });

    if (existingRoom) {
      throw new ConflictException(
        `Já existe uma sala cadastrada com o nome ${createRoomDto.name}.`,
      );
    }

    return this.prisma.room.create({
      data: createRoomDto,
    });
  }

  async findAll() {
    return this.prisma.room.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });

    return findOrThrow(room, `Sala com ID ${id} não encontrada.`);
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    await this.findOne(id);

    if (updateRoomDto.name) {
      const nameConflict = await this.prisma.room.findFirst({
        where: {
          name: updateRoomDto.name,
          NOT: { id },
        },
      });

      if (nameConflict) {
        throw new ConflictException(
          `Já existe uma sala cadastrada com o nome ${updateRoomDto.name}.`,
        );
      }
    }

    return this.prisma.room.update({
      where: { id },
      data: updateRoomDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.room.delete({
      where: { id },
    });
  }
}

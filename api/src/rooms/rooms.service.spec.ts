import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';

type MockRoom = {
  id: string;
  name: string;
  capacity: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
};

describe('RoomsService', () => {
  let service: RoomsService;
  let prismaService: PrismaService;

  const mockPrisma = {
    room: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  const mockRoom: MockRoom = {
    id: 'room-123',
    name: 'Laboratório 1',
    capacity: 30,
    type: 'LAB',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    // Arrange
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('deve registrar uma sala com sucesso (Caminho Feliz)', async () => {
      // Arrange
      const dto: CreateRoomDto = {
        name: 'Laboratório 1',
        capacity: 30,
      } as CreateRoomDto;
      mockPrisma.room.create.mockResolvedValue(mockRoom);

      // Act
      const result = await service.create(dto);

      // Assert
      expect(vi.spyOn(prismaService.room, 'create')).toHaveBeenCalledWith({
        data: dto,
      });
      expect(result).toEqual(mockRoom);
    });
  });

  describe('remove', () => {
    it('deve garantir que a sala existe antes de removê-la (Caminho Feliz)', async () => {
      // Arrange
      const findOneSpy = vi
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockRoom);
      mockPrisma.room.delete.mockResolvedValue(mockRoom);

      // Act
      const result = await service.remove('room-123');

      // Assert
      expect(findOneSpy).toHaveBeenCalledWith('room-123');
      expect(vi.spyOn(prismaService.room, 'delete')).toHaveBeenCalledWith({
        where: { id: 'room-123' },
      });
      expect(result).toEqual(mockRoom);
    });
  });
});

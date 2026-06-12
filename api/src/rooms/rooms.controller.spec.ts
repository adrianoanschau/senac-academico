import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { UpdateRoomDto } from './dto/update-room.dto';

describe('RoomsController', () => {
  let controller: RoomsController;
  let service: RoomsService;

  const mockRoomsService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    // Arrange
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        {
          provide: RoomsService,
          useValue: mockRoomsService,
        },
      ],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
    service = module.get<RoomsService>(RoomsService);
  });

  describe('update', () => {
    it('deve extrair o ID e repassar o payload para a camada de serviço', async () => {
      // Arrange
      const dto: UpdateRoomDto = { capacity: 40 };
      const mockUpdated = { id: 'room-1', name: 'Lab 1', capacity: 40 };
      mockRoomsService.update.mockResolvedValue(mockUpdated);

      // Act
      const result = await controller.update('room-1', dto);

      // Assert
      expect(vi.spyOn(service, 'update')).toHaveBeenCalledWith('room-1', dto);
      expect(result).toEqual({ data: mockUpdated });
    });
  });
});

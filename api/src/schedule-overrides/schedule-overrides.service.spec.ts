import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { ScheduleOverridesService } from './schedule-overrides.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateScheduleOverrideDto } from './dto/create-schedule-override.dto';

type MockOverride = {
  id: string;
  type: string;
  startTime: Date;
  endTime: Date;
};

describe('ScheduleOverridesService', () => {
  let service: ScheduleOverridesService;

  const mockPrisma = {
    scheduleOverride: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  const mockOverride: MockOverride = {
    id: 'override-1',
    type: 'BLOCK',
    startTime: new Date('2026-06-15T08:00:00Z'),
    endTime: new Date('2026-06-15T18:00:00Z'),
  };

  beforeEach(async () => {
    // Arrange
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleOverridesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ScheduleOverridesService>(ScheduleOverridesService);
  });

  describe('create', () => {
    it('deve criar uma regra (feriado/bloqueio) no calendário com sucesso (Caminho Feliz)', async () => {
      // Arrange
      const dto: CreateScheduleOverrideDto = {
        startTime: new Date('2026-06-15T08:00:00Z'),
        endTime: new Date('2026-06-15T18:00:00Z'),
      } as CreateScheduleOverrideDto;
      mockPrisma.scheduleOverride.create.mockResolvedValue(mockOverride);

      // Act
      const result = await service.create(dto);

      // Assert
      expect(result).toEqual(mockOverride);
    });

    it('deve lançar BadRequestException se startTime for posterior ao endTime (Caminho Triste)', async () => {
      // Arrange (Inverte as datas)
      const dto: CreateScheduleOverrideDto = {
        startTime: new Date('2026-06-15T18:00:00Z'),
        endTime: new Date('2026-06-15T08:00:00Z'),
      } as CreateScheduleOverrideDto;

      // Act & Assert
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });
});

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PrismaService } from '@/prisma/prisma.service';

import { ScheduleRulesService } from './schedule-rules.service';

describe('ScheduleRulesService', () => {
  let service: ScheduleRulesService;

  const mockPrisma = {
    scheduleRule: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleRulesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get(ScheduleRulesService);
  });

  it('deve filtrar por classGroupId quando informado', async () => {
    mockPrisma.scheduleRule.findMany.mockResolvedValue([]);

    await service.findAll('cg-1');

    expect(mockPrisma.scheduleRule.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { classGroupId: 'cg-1' },
      }),
    );
  });

  it('deve lançar NotFoundException quando regra não existir', async () => {
    mockPrisma.scheduleRule.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
  });
});

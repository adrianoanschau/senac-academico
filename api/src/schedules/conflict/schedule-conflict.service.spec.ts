import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { ScheduleConflictService } from './schedule-conflict.service';
import { PrismaService } from '@/prisma/prisma.service';

describe('ScheduleConflictService', () => {
  let service: ScheduleConflictService;

  const mockPrisma = {
    schedule: {
      findFirst: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleConflictService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ScheduleConflictService>(ScheduleConflictService);
  });

  it('deve rejeitar horário inválido', async () => {
    await expect(
      service.assertNoScheduleConflicts({
        startTime: new Date('2026-06-15T12:00:00Z'),
        endTime: new Date('2026-06-15T08:00:00Z'),
        roomId: 'room-1',
        professorId: 'prof-1',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('deve lançar ConflictException em choque de sala', async () => {
    mockPrisma.schedule.findFirst.mockResolvedValueOnce({
      id: 'other',
      classGroup: { code: 'T1' },
    });

    await expect(
      service.assertNoScheduleConflicts({
        startTime: new Date('2026-06-15T08:00:00Z'),
        endTime: new Date('2026-06-15T12:00:00Z'),
        roomId: 'room-1',
        professorId: 'prof-1',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('deve lançar ConflictException em choque de professor', async () => {
    mockPrisma.schedule.findFirst
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        id: 'other',
        classGroup: { code: 'T2' },
      });

    await expect(
      service.assertNoScheduleConflicts({
        startTime: new Date('2026-06-15T08:00:00Z'),
        endTime: new Date('2026-06-15T12:00:00Z'),
        roomId: 'room-1',
        professorId: 'prof-1',
      }),
    ).rejects.toThrow('Choque de Professor');
  });
});

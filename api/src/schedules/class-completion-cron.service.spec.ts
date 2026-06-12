import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ClassCompletionCronService } from './class-completion-cron.service';
import { PrismaService } from '@/prisma/prisma.service';
import { ClassStatus } from '@/prisma/generated';

describe('ClassCompletionCronService', () => {
  let service: ClassCompletionCronService;
  let prismaService: PrismaService;

  const mockPrisma = {
    schedule: {
      updateMany: vi.fn(),
    },
  };

  beforeEach(async () => {
    // Arrange
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassCompletionCronService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ClassCompletionCronService>(
      ClassCompletionCronService,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('handleDailyClassCompletion', () => {
    it('deve buscar aulas com status SCHEDULED no passado e marcá-las como COMPLETED', async () => {
      // Arrange
      mockPrisma.schedule.updateMany.mockResolvedValue({ count: 5 });

      // Congelamos o tempo para uma data exata para que a validação não dependa de quando executamos os testes
      const fixedDate = new Date('2026-06-15T12:00:00Z');
      vi.useFakeTimers();
      vi.setSystemTime(fixedDate);

      // Act
      await service.handleDailyClassCompletion();

      // Assert
      expect(
        vi.spyOn(prismaService.schedule, 'updateMany'),
      ).toHaveBeenCalledWith({
        where: {
          status: ClassStatus.SCHEDULED,
          endTime: { lt: fixedDate }, // Garante que a query disparada utilizou o "now" exato
        },
        data: { status: ClassStatus.COMPLETED },
      });

      // Cleanup para evitar side-effects em outros testes
      vi.useRealTimers();
    });
  });

  describe('onApplicationBootstrap', () => {
    it('deve chamar a rotina de conclusão diária nativamente ao iniciar a aplicação NestJS', async () => {
      const handleSpy = vi
        .spyOn(service, 'handleDailyClassCompletion')
        .mockResolvedValue(undefined);
      await service.onApplicationBootstrap();
      expect(handleSpy).toHaveBeenCalled();
    });
  });
});

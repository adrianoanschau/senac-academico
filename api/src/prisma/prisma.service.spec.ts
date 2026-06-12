import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    // Arrange
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  describe('onModuleInit', () => {
    it('deve conectar estritamente ao banco de dados ao inicializar o módulo (Caminho Feliz)', async () => {
      const connectSpy = vi
        .spyOn(service, '$connect')
        .mockResolvedValue(undefined);
      await service.onModuleInit();
      expect(connectSpy).toHaveBeenCalled();
    });
  });
});

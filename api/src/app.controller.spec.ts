import { describe, it, expect, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import pkg from '../package.json';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    // Arrange
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  describe('index', () => {
    it('deve retornar o nome e a versão da API baseados no package.json', () => {
      // Arrange (Configuração inicial não necessária aqui)

      // Act
      const result = controller.index();

      // Assert
      expect(result).toEqual({ name: pkg.name, version: pkg.version });
    });
  });
});

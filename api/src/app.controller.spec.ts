import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import pkg from '../package.json';
import { AppController } from './app.controller';

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

import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AppRole } from '@/prisma/generated';

import { ScheduleRulesController } from './schedule-rules.controller';
import { ScheduleRulesService } from './schedule-rules.service';

describe('ScheduleRulesController', () => {
  let controller: ScheduleRulesController;

  const mockService = {
    findAll: vi.fn(),
    findOne: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleRulesController],
      providers: [{ provide: ScheduleRulesService, useValue: mockService }],
    }).compile();

    controller = module.get(ScheduleRulesController);
  });

  it('deve listar regras encapsuladas em data', async () => {
    mockService.findAll.mockResolvedValue([{ id: 'rule-1' }]);

    const result = await controller.findAll({});

    expect(mockService.findAll).toHaveBeenCalledWith(undefined);
    expect(result).toEqual({ data: [{ id: 'rule-1' }] });
  });

  it('deve repassar classGroupId para o service', async () => {
    mockService.findAll.mockResolvedValue([]);

    await controller.findAll({ classGroupId: 'cg-1' });

    expect(mockService.findAll).toHaveBeenCalledWith('cg-1');
  });
});

describe('ScheduleRulesController RBAC', () => {
  it('não deve exigir roles específicas nas rotas de leitura', () => {
    const reflector = new Reflector();

    expect(
      reflector.get<AppRole[]>(
        'roles',
        ScheduleRulesController.prototype.findAll,
      ),
    ).toBeUndefined();
    expect(
      reflector.get<AppRole[]>(
        'roles',
        ScheduleRulesController.prototype.findOne,
      ),
    ).toBeUndefined();
  });
});

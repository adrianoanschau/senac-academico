import { INestApplication, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { GanttPlannerService } from '../src/schedules/gantt-planner.service';
import { ModuleOrchestratorService } from '../src/schedules/module-orchestrator.service';
import { SchedulesController } from '../src/schedules/schedules.controller';
import { SchedulesService } from '../src/schedules/schedules.service';

describe('Schedules HTTP (e2e)', () => {
  let app: INestApplication;

  const mockSchedulesService = {
    findAll: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [
        { provide: SchedulesService, useValue: mockSchedulesService },
        {
          provide: ModuleOrchestratorService,
          useValue: { planModuleTracks: vi.fn() },
        },
        {
          provide: GanttPlannerService,
          useValue: {
            buildBlueprint: vi.fn(),
            recalculate: vi.fn(),
            publishBlueprint: vi.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /schedules deve repassar start e end para o service', async () => {
    mockSchedulesService.findAll.mockResolvedValue({
      data: [{ id: 'sched-1' }],
    });

    const response = await request(app.getHttpServer())
      .get('/schedules')
      .query({
        start: '2026-06-01T00:00:00.000Z',
        end: '2026-06-30T23:59:59.999Z',
        status: 'PLANNED',
      })
      .expect(200);

    expect(mockSchedulesService.findAll).toHaveBeenCalledWith(
      expect.objectContaining({
        start: '2026-06-01T00:00:00.000Z',
        end: '2026-06-30T23:59:59.999Z',
        status: ['PLANNED'],
      }),
    );
    expect(response.body.data).toHaveLength(1);
  });
});

import { describe, it, expect } from 'vitest';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FindSchedulesQueryDto } from './find-schedules-query.dto';

describe('FindSchedulesQueryDto', () => {
  it('deve aceitar query válida com intervalo e status', async () => {
    const dto = plainToInstance(FindSchedulesQueryDto, {
      start: '2026-06-01',
      end: '2026-06-30',
      status: 'PLANNED',
      search: 'java',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
    expect(dto.status).toEqual(['PLANNED']);
  });

  it('deve rejeitar quando apenas start for informado', async () => {
    const dto = plainToInstance(FindSchedulesQueryDto, {
      start: '2026-06-01',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve rejeitar status inválido', async () => {
    const dto = plainToInstance(FindSchedulesQueryDto, {
      status: 'INVALID',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

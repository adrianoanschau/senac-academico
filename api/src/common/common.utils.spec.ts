import { describe, it, expect } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { findOrThrow } from './entity.utils';
import { assertValidTimeRange } from './validation.utils';

describe('common utils', () => {
  describe('findOrThrow', () => {
    it('deve retornar entidade quando encontrada', () => {
      expect(findOrThrow({ id: '1' }, 'não encontrado')).toEqual({ id: '1' });
    });

    it('deve lançar NotFoundException quando ausente', () => {
      expect(() => findOrThrow(null, 'não encontrado')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('assertValidTimeRange', () => {
    it('deve aceitar intervalo válido', () => {
      expect(() =>
        assertValidTimeRange(
          new Date('2026-06-01T08:00:00.000Z'),
          new Date('2026-06-01T10:00:00.000Z'),
        ),
      ).not.toThrow();
    });

    it('deve rejeitar intervalo inválido', () => {
      expect(() =>
        assertValidTimeRange(
          new Date('2026-06-01T10:00:00.000Z'),
          new Date('2026-06-01T08:00:00.000Z'),
        ),
      ).toThrow('A data/hora de início deve ser anterior');
    });
  });
});

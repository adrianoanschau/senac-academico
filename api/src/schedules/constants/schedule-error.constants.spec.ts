import { ConflictException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';

import {
  SCHEDULE_ERROR_ACTIONS,
  throwPostponeConfirmRequired,
} from './schedule-error.constants';

describe('schedule-error.constants', () => {
  it('deve lançar ConflictException com contrato CONFIRM_REQUIRED', () => {
    try {
      throwPostponeConfirmRequired('Matemática');
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      const response = (error as ConflictException).getResponse() as Record<
        string,
        string
      >;
      expect(response.action).toBe(SCHEDULE_ERROR_ACTIONS.CONFIRM_REQUIRED);
      expect(response.conflictingSubject).toBe('Matemática');
      expect(response.message).toContain('Matemática');
    }
  });
});

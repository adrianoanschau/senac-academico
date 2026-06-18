import { BadRequestException } from '@nestjs/common';

export function assertValidTimeRange(startTime: Date, endTime: Date): void {
  if (startTime >= endTime) {
    throw new BadRequestException(
      'A data/hora de início deve ser anterior à data/hora de término.',
    );
  }
}

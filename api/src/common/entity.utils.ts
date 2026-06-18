import { NotFoundException } from '@nestjs/common';

export function findOrThrow<T>(entity: T | null, message: string): T {
  if (!entity) {
    throw new NotFoundException(message);
  }

  return entity;
}

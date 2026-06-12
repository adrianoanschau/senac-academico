import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { PrismaService } from '@/prisma/prisma.service';
import { AppRole } from '@/prisma/generated';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let prismaService: PrismaService;

  const mockPrisma = {
    userProfile: {
      findUnique: vi.fn(),
    },
  };

  const mockReflector = {
    getAllAndOverride: vi.fn(),
  };

  // Auxiliar estrito para simular o contexto de rota do NestJS
  const createMockExecutionContext = (
    user?: { userId: string } | null,
  ): ExecutionContext => {
    return {
      getHandler: vi.fn(),
      getClass: vi.fn(),
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue({
          user, // Injetado previamente pelo AuthGuard/JwtGuard (e.g. Supabase)
        }),
      }),
    } as unknown as ExecutionContext;
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        { provide: Reflector, useValue: mockReflector },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('deve permitir acesso sem validações se a rota possuir metadados @Public (Caminho Feliz)', async () => {
    // Arrange
    mockReflector.getAllAndOverride.mockImplementation((key: string) => {
      if (key === IS_PUBLIC_KEY) return true;
      return undefined;
    });
    const context = createMockExecutionContext(); // Nem precisa passar usuário

    // Act
    const result = await guard.canActivate(context);

    // Assert
    expect(result).toBe(true);
    expect(
      vi.spyOn(prismaService.userProfile, 'findUnique'),
    ).not.toHaveBeenCalled();
  });

  it('deve lançar ForbiddenException se não houver usuário autenticado acoplado na requisição (Caminho Triste)', async () => {
    // Arrange
    mockReflector.getAllAndOverride.mockReturnValue(undefined); // Não pública e sem metadados = default
    const context = createMockExecutionContext(null); // Falhou na autenticação inicial

    // Act & Assert
    await expect(guard.canActivate(context)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(guard.canActivate(context)).rejects.toThrow(
      'Acesso negado. Usuário não autenticado.',
    );
  });

  it('deve lançar ForbiddenException se o perfil de usuário não existir no banco (Caminho Triste)', async () => {
    // Arrange
    mockReflector.getAllAndOverride.mockReturnValue(undefined);
    const context = createMockExecutionContext({ userId: 'user-1' });
    mockPrisma.userProfile.findUnique.mockResolvedValue(null);

    // Act & Assert
    await expect(guard.canActivate(context)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(guard.canActivate(context)).rejects.toThrow(
      'Perfil de usuário não encontrado.',
    );
  });

  it('deve bloquear e lançar erro se o usuário NÃO tiver a role exigida (Caminho Triste)', async () => {
    // Arrange
    mockReflector.getAllAndOverride.mockImplementation((key: string) => {
      if (key === IS_PUBLIC_KEY) return false;
      if (key === ROLES_KEY) return [AppRole.ADMIN]; // Rota restrita a ADM
      return undefined;
    });
    const context = createMockExecutionContext({ userId: 'user-1' });
    mockPrisma.userProfile.findUnique.mockResolvedValue({
      id: 'user-1',
      roles: [AppRole.MEMBER], // Usuário é apenas MEMBER
    });

    // Act & Assert
    await expect(guard.canActivate(context)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(guard.canActivate(context)).rejects.toThrow(
      'Você não tem permissão para acessar este recurso.',
    );
  });

  it('deve permitir acesso liberado caso o usuário possua a role exigida (Caminho Feliz)', async () => {
    // Arrange
    mockReflector.getAllAndOverride.mockImplementation((key: string) => {
      if (key === IS_PUBLIC_KEY) return false;
      if (key === ROLES_KEY) return [AppRole.ADMIN]; // Rota exige ADM
      return undefined;
    });
    const context = createMockExecutionContext({ userId: 'user-1' });
    mockPrisma.userProfile.findUnique.mockResolvedValue({
      id: 'user-1',
      roles: [AppRole.ADMIN, AppRole.INSTRUCTOR], // Tem múltiplas, entre elas a ADM
    });

    // Act
    const result = await guard.canActivate(context);

    // Assert
    expect(result).toBe(true);
  });
});

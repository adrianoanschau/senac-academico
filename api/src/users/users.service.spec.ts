import { describe, it, expect, vi, beforeAll, beforeEach, Mock } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { createClient, User } from '@supabase/supabase-js';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

// Mock do módulo do Supabase
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  // Variáveis para Mocks das funções da API Admin do Supabase
  const mockCreateUser = vi.fn();
  const mockGetUserById = vi.fn();
  const mockUpdateUserById = vi.fn();

  // Mock Objeto User do Supabase
  const mockSupabaseUser: User = {
    id: 'user-id-123',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'test@senac.br',
    app_metadata: {},
    user_metadata: { displayName: 'Teste' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    phone: '',
    confirmation_sent_at: '',
    confirmed_at: '',
    last_sign_in_at: '',
    identities: [],
    factors: [],
  };

  beforeAll(() => {
    // Arrange (Configuração global de ambiente)
    process.env.SUPABASE_URL = 'http://localhost:8000';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'super-secret-key';
  });

  beforeEach(async () => {
    // Arrange (Limpar mocks e configurar client do Supabase)
    vi.clearAllMocks();

    (createClient as Mock).mockReturnValue({
      auth: {
        admin: {
          createUser: mockCreateUser,
          getUserById: mockGetUserById,
          updateUserById: mockUpdateUserById,
        },
      },
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            userProfile: {
              findUnique: vi.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('createUser', () => {
    const mockDto: CreateUserDto = {
      email: 'test@senac.br',
      password: 'StrongPassword123!',
      roles: ['ADMIN'],
      displayName: 'Administrador Teste',
      phoneNumber: '11999999999',
    };

    it('deve criar um usuário com sucesso no Supabase', async () => {
      // Arrange
      mockCreateUser.mockResolvedValue({
        data: { user: mockSupabaseUser },
        error: null,
      });

      // Act
      const result = await service.createUser(mockDto);

      // Assert
      expect(mockCreateUser).toHaveBeenCalledWith(
        expect.objectContaining({ email: mockDto.email }),
      );
      expect(result.message).toBe('Usuário criado com sucesso');
      expect(result.user).toEqual(mockSupabaseUser);
    });

    it('deve lançar InternalServerErrorException quando a criação no Supabase falhar', async () => {
      // Arrange
      mockCreateUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'Erro de conexão no Supabase' },
      });

      // Act & Assert
      await expect(service.createUser(mockDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getProfile', () => {
    const userId = 'user-id-123';

    it('deve retornar o perfil enriquecido com as roles presentes no Prisma', async () => {
      // Arrange
      mockGetUserById.mockResolvedValue({
        data: { user: { ...mockSupabaseUser } },
        error: null,
      });
      vi.spyOn(prismaService.userProfile, 'findUnique').mockResolvedValue({
        id: userId,
        roles: ['ADMIN', 'PROFESSOR'],
      } as NonNullable<
        Awaited<ReturnType<typeof prismaService.userProfile.findUnique>>
      >); // Tipagem estrita de promessa

      // Act
      const result = await service.getProfile(userId);

      // Assert
      expect(mockGetUserById).toHaveBeenCalledWith(userId);
      expect(
        vi.spyOn(prismaService.userProfile, 'findUnique'),
      ).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(result.user_metadata.roles).toEqual(['ADMIN', 'PROFESSOR']);
    });

    it('deve lançar erro se falhar a requisição de busca do perfil no Supabase', async () => {
      // Arrange
      mockGetUserById.mockResolvedValue({
        data: { user: null },
        error: { message: 'User not found' },
      });

      // Act & Assert
      await expect(service.getProfile(userId)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});

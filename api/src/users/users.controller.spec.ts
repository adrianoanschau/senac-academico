import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { AppRole } from '@/prisma/generated';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    createUser: vi.fn(),
    getProfile: vi.fn(),
    updateProfile: vi.fn(),
  };

  beforeEach(async () => {
    // Arrange
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    })
      // Simula a injeção do RolesGuard sem comportamento executável real,
      // visto que Guards são testados de ponta a ponta, ou via validação de metadados.
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: vi.fn(() => true) })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('RBAC (Role-Based Access Control)', () => {
    it('deve ter a restrição de role de ADMIN na criação de usuário', () => {
      // Arrange
      const reflector = new Reflector();

      // Act
      // O decorador @Roles injeta os dados num metadata key 'roles'
      // Desabilitamos o unbound-method pois o Reflector precisa da referência original exata para ler os metadados, e não para executá-la.
      const roles = reflector.get<AppRole[]>(
        'roles',
        // eslint-disable-next-line @typescript-eslint/unbound-method
        UsersController.prototype.createUser,
      );

      // Assert
      // Garante de que um usuário sem esta role lançaria uma ForbiddenException pelo RolesGuard no ambiente real
      expect(roles).toBeDefined();
      expect(roles).toEqual([AppRole.ADMIN]);
    });
  });

  describe('createUser', () => {
    it('deve chamar o service e retornar os dados de sucesso', async () => {
      // Arrange
      const dto: CreateUserDto = {
        email: 'admin@senac.br',
        password: 'Password123!',
        roles: ['ADMIN'],
      };

      const mockResponse = { message: 'Sucesso', user: { id: '123' } };
      mockUsersService.createUser.mockResolvedValue(mockResponse);

      // Act
      const result = await controller.createUser(dto);

      // Assert
      expect(vi.spyOn(service, 'createUser')).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getProfile', () => {
    it('deve extrair o ID do request e buscar o perfil no service', async () => {
      // Arrange
      const reqMock = { user: { userId: '123' } };
      const mockProfileResponse = { id: '123', email: 'test@senac.br' };

      mockUsersService.getProfile.mockResolvedValue(mockProfileResponse);

      // Act
      const result = await controller.getProfile(reqMock);

      // Assert
      expect(vi.spyOn(service, 'getProfile')).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockProfileResponse);
    });
  });

  describe('updateProfile', () => {
    it('deve extrair ID do request, dto e delegar a atualização ao service', async () => {
      // Arrange
      const reqMock = { user: { userId: '123' } };
      const dto: UpdateProfileDto = {
        displayName: 'Novo Nome',
      };

      const mockUpdateResponse = { message: 'Atualizado', user: { id: '123' } };
      mockUsersService.updateProfile.mockResolvedValue(mockUpdateResponse);

      // Act
      const result = await controller.updateProfile(reqMock, dto);

      // Assert
      expect(vi.spyOn(service, 'updateProfile')).toHaveBeenCalledWith(
        '123',
        dto,
      );
      expect(result).toEqual(mockUpdateResponse);
    });
  });
});

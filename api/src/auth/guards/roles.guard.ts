import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppRole } from '@/prisma/generated';
import { PrismaService } from '../../prisma/prisma.service';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

type AuthenticatedUser = {
  userId: string;
  username: string;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    let requiredRoles = this.reflector.getAllAndOverride<AppRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se não houver roles definidos no decorator, a rota exige o perfil 'MEMBER' por padrão.
    // Isso garante que todas as rotas protegidas tenham um requisito de perfil base.
    if (!requiredRoles || requiredRoles.length === 0) {
      requiredRoles = [AppRole.MEMBER];
    }

    const { user } = context
      .switchToHttp()
      .getRequest<{ user: AuthenticatedUser }>();

    // Se o Guard de autenticação (ex: Supabase) não injetou um utilizador, negamos o acesso.
    if (!user || !user.userId) {
      throw new ForbiddenException('Acesso negado. Usuário não autenticado.');
    }

    const userProfile = await this.prisma.userProfile.findUnique({
      where: { id: user.userId },
    });

    if (!userProfile) {
      throw new ForbiddenException('Perfil de usuário não encontrado.');
    }

    const hasRequiredRole = requiredRoles.some((role) =>
      userProfile.roles?.includes(role),
    );

    if (!hasRequiredRole) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este recurso.',
      );
    }

    return true;
  }
}

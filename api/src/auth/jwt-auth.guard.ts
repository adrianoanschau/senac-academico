import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

interface AuthenticatedUser {
  userId: string;
  email: string;
  session: string;
  role: string;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest<TUser = AuthenticatedUser>(
    err: any,
    user: any,
    info: any,
  ): TUser {
    if (err || !user) {
      if (err) {
        if (err instanceof UnauthorizedException) {
          throw err; // Relança se já for uma UnauthorizedException
        }
        if (err instanceof Error) {
          throw new UnauthorizedException(err.message);
        }
        throw new UnauthorizedException('Acesso negado. Erro de autenticação.');
      }
      if (info instanceof UnauthorizedException) {
        throw info; // Relança se já for uma UnauthorizedException
      }
      if (info instanceof Error) {
        throw new UnauthorizedException(info.message);
      }
      throw new UnauthorizedException(
        'Acesso negado. Token inválido ou expirado.',
      );
    }
    return user as TUser; // Converte o utilizador para o tipo TUser após as verificações
  }
}

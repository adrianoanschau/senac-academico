import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  private readonly supabaseAdmin: ReturnType<typeof createClient>;

  constructor(private readonly prisma: PrismaService) {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    this.supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
  }

  async createUser(dto: CreateUserDto) {
    const { data, error } = await this.supabaseAdmin.auth.admin.createUser({
      email: dto.email,
      password: dto.password,
      email_confirm: true,
      user_metadata: {
        roles: dto.roles,
        displayName: dto.displayName || null,
        phoneNumber: dto.phoneNumber || null,
        needsPasswordChange: true,
      },
    });

    if (error) {
      throw new InternalServerErrorException(
        `Erro ao criar usuário no Supabase: ${error.message}`,
      );
    }

    return { message: 'Usuário criado com sucesso', user: data.user };
  }

  async getProfile(userId: string) {
    const { data, error } =
      await this.supabaseAdmin.auth.admin.getUserById(userId);

    if (error) {
      throw new InternalServerErrorException(
        `Erro ao buscar perfil no Supabase: ${error.message}`,
      );
    }

    const userProfile = await this.prisma.userProfile.findUnique({
      where: { id: userId },
    });

    if (userProfile && userProfile.roles) {
      data.user.user_metadata = data.user.user_metadata || {};
      data.user.user_metadata.roles = userProfile.roles;
    }

    return data.user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const { data, error } = await this.supabaseAdmin.auth.admin.updateUserById(
      userId,
      {
        user_metadata: {
          displayName: dto.displayName || null,
          phoneNumber: dto.phoneNumber || null,
        },
      },
    );

    if (error) {
      throw new InternalServerErrorException(
        `Erro ao atualizar perfil no Supabase: ${error.message}`,
      );
    }

    return { message: 'Perfil atualizado com sucesso', user: data.user };
  }
}

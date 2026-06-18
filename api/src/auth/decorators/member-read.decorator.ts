import { AppRole } from '@/prisma/generated';

import { Roles } from './roles.decorator';

/** Leitura autenticada: qualquer usuário com perfil MEMBER (ou superior). */
export const MemberRead = () => Roles(AppRole.MEMBER);

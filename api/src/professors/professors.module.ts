import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { ProfessorsController } from './professors.controller';
import { ProfessorsService } from './professors.service';

@Module({
  controllers: [ProfessorsController],
  providers: [ProfessorsService, PrismaService],
})
export class ProfessorsModule {}

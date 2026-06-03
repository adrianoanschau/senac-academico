import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ProfessorsService } from './professors.service';
import { ProfessorsController } from './professors.controller';

@Module({
  controllers: [ProfessorsController],
  providers: [ProfessorsService, PrismaService],
})
export class ProfessorsModule {}

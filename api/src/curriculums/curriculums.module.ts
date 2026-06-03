import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CurriculumsService } from './curriculums.service';
import { CurriculumsController } from './curriculums.controller';

@Module({
  controllers: [CurriculumsController],
  providers: [CurriculumsService, PrismaService],
})
export class CurriculumsModule {}

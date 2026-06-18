import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { CurriculumsController } from './curriculums.controller';
import { CurriculumsService } from './curriculums.service';

@Module({
  controllers: [CurriculumsController],
  providers: [CurriculumsService, PrismaService],
})
export class CurriculumsModule {}

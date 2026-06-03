import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, PrismaService],
})
export class CoursesModule {}

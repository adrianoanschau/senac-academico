import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ClassGroupsService } from './class-groups.service';
import { ClassGroupsController } from './class-groups.controller';

@Module({
  controllers: [ClassGroupsController],
  providers: [ClassGroupsService, PrismaService],
})
export class ClassGroupsModule {}

import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { ClassGroupsController } from './class-groups.controller';
import { ClassGroupsService } from './class-groups.service';

@Module({
  controllers: [ClassGroupsController],
  providers: [ClassGroupsService, PrismaService],
})
export class ClassGroupsModule {}

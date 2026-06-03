import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, PrismaService],
})
export class RoomsModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ProfessorsModule } from './professors/professors.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [AuthModule, ProfessorsModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

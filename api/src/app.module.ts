import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ProfessorsModule } from './professors/professors.module';

@Module({
  imports: [AuthModule, ProfessorsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

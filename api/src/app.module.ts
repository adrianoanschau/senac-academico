import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ProfessorsModule } from './professors/professors.module';
import { RoomsModule } from './rooms/rooms.module';
import { SubjectsModule } from './subjects/subjects.module';
import { CoursesModule } from './courses/courses.module';
import { CurriculumsModule } from './curriculums/curriculums.module';
import { ClassGroupsModule } from './class-groups/class-groups.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ScheduleOverridesModule } from './schedule-overrides/schedule-overrides.module';
import { ScheduleRulesModule } from './schedule-rules/schedule-rules.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    AuthModule,
    ProfessorsModule,
    RoomsModule,
    SubjectsModule,
    CoursesModule,
    CurriculumsModule,
    ClassGroupsModule,
    SchedulesModule,
    ScheduleOverridesModule,
    ScheduleRulesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

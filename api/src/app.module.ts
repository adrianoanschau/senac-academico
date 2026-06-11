import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

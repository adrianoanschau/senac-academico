import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { AppRole } from '@/prisma/generated';

import { Roles } from '../auth/decorators/roles.decorator';
import { CreateScheduleOverrideDto } from './dto/create-schedule-override.dto';
import { UpdateScheduleOverrideDto } from './dto/update-schedule-override.dto';
import { ScheduleOverridesService } from './schedule-overrides.service';

@Controller('schedule-overrides')
export class ScheduleOverridesController {
  constructor(
    private readonly scheduleOverridesService: ScheduleOverridesService,
  ) {}

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post()
  async create(@Body() createScheduleOverrideDto: CreateScheduleOverrideDto) {
    const data = await this.scheduleOverridesService.create(
      createScheduleOverrideDto,
    );
    return { data };
  }

  @Get()
  async findAll() {
    const data = await this.scheduleOverridesService.findAll();
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.scheduleOverridesService.findOne(id);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateScheduleOverrideDto: UpdateScheduleOverrideDto,
  ) {
    const data = await this.scheduleOverridesService.update(
      id,
      updateScheduleOverrideDto,
    );
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.scheduleOverridesService.remove(id);
    return { data };
  }
}

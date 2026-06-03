import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScheduleOverridesService } from './schedule-overrides.service';
import { CreateScheduleOverrideDto } from './dto/create-schedule-override.dto';
import { UpdateScheduleOverrideDto } from './dto/update-schedule-override.dto';

@Controller('schedule-overrides')
export class ScheduleOverridesController {
  constructor(
    private readonly scheduleOverridesService: ScheduleOverridesService,
  ) {}

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
  async findOne(@Param('id') id: string) {
    const data = await this.scheduleOverridesService.findOne(id);
    return { data };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScheduleOverrideDto: UpdateScheduleOverrideDto,
  ) {
    const data = await this.scheduleOverridesService.update(
      id,
      updateScheduleOverrideDto,
    );
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.scheduleOverridesService.remove(id);
    return { data };
  }
}

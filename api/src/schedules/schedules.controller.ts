import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { GenerateSchedulesDto } from './dto/generate-schedules.dto';
import { PostponeScheduleDto } from './dto/postpone-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    const data = await this.schedulesService.create(createScheduleDto);
    return { data };
  }

  @Get()
  async findAll(
    @Query('start') start?: string,
    @Query('end') end?: string,
    @Query('classGroupId') classGroupId?: string,
    @Query('professorId') professorId?: string,
    @Query('roomId') roomId?: string,
  ) {
    const data = await this.schedulesService.findAll(
      start,
      end,
      classGroupId,
      professorId,
      roomId,
    );

    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const schedule = await this.schedulesService.findOne(id);
    return { schedule };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    const schedule = await this.schedulesService.update(id, updateScheduleDto);
    return { schedule };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.schedulesService.remove(id);
    return { message: 'Schedule removed successfully' };
  }

  @Post('generate')
  async generateBulk(@Body() generateSchedulesDto: GenerateSchedulesDto) {
    const data = await this.schedulesService.generateBulk(generateSchedulesDto);
    return { data };
  }

  @Post(':id/postpone')
  postponeClass(
    @Param('id') id: string,
    @Body() postponeDto: PostponeScheduleDto,
  ) {
    return this.schedulesService.postponeClass(id, postponeDto.reason);
  }
}

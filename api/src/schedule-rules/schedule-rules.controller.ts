import { Controller, Get, Param, Query } from '@nestjs/common';
import { ScheduleRulesService } from './schedule-rules.service';

@Controller('schedule-rules')
export class ScheduleRulesController {
  constructor(private readonly scheduleRulesService: ScheduleRulesService) {}

  @Get()
  async findAll(@Query('classGroupId') classGroupId?: string) {
    const data = await this.scheduleRulesService.findAll(classGroupId);
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.scheduleRulesService.findOne(id);
    return { data };
  }
}

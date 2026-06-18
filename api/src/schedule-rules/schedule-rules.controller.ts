import { Controller, Get, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ScheduleRulesService } from './schedule-rules.service';
import { FindScheduleRulesQueryDto } from './dto/find-schedule-rules-query.dto';

@Controller('schedule-rules')
export class ScheduleRulesController {
  constructor(private readonly scheduleRulesService: ScheduleRulesService) {}

  @Get()
  async findAll(@Query() query: FindScheduleRulesQueryDto) {
    const data = await this.scheduleRulesService.findAll(query.classGroupId);
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.scheduleRulesService.findOne(id);
    return { data };
  }
}

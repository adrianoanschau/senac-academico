import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';

import { MemberRead } from '../auth/decorators/member-read.decorator';
import { FindScheduleRulesQueryDto } from './dto/find-schedule-rules-query.dto';
import { ScheduleRulesService } from './schedule-rules.service';

@Controller('schedule-rules')
export class ScheduleRulesController {
  constructor(private readonly scheduleRulesService: ScheduleRulesService) {}

  @MemberRead()
  @Get()
  async findAll(@Query() query: FindScheduleRulesQueryDto) {
    const data = await this.scheduleRulesService.findAll(query.classGroupId);
    return { data };
  }

  @MemberRead()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.scheduleRulesService.findOne(id);
    return { data };
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScheduleRulesService } from './schedule-rules.service';
import { CreateScheduleRuleDto } from './dto/create-schedule-rule.dto';
import { UpdateScheduleRuleDto } from './dto/update-schedule-rule.dto';

@Controller('schedule-rules')
export class ScheduleRulesController {
  constructor(private readonly scheduleRulesService: ScheduleRulesService) {}

  @Post()
  create(@Body() createScheduleRuleDto: CreateScheduleRuleDto) {
    return this.scheduleRulesService.create(createScheduleRuleDto);
  }

  @Get()
  findAll() {
    return this.scheduleRulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleRulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScheduleRuleDto: UpdateScheduleRuleDto) {
    return this.scheduleRulesService.update(+id, updateScheduleRuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleRulesService.remove(+id);
  }
}

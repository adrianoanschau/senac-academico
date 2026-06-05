import { Injectable } from '@nestjs/common';
import { CreateScheduleRuleDto } from './dto/create-schedule-rule.dto';
import { UpdateScheduleRuleDto } from './dto/update-schedule-rule.dto';

@Injectable()
export class ScheduleRulesService {
  create(createScheduleRuleDto: CreateScheduleRuleDto) {
    return 'This action adds a new scheduleRule';
  }

  findAll() {
    return `This action returns all scheduleRules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scheduleRule`;
  }

  update(id: number, updateScheduleRuleDto: UpdateScheduleRuleDto) {
    return `This action updates a #${id} scheduleRule`;
  }

  remove(id: number) {
    return `This action removes a #${id} scheduleRule`;
  }
}

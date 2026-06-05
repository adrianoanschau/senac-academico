import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleRulesController } from './schedule-rules.controller';
import { ScheduleRulesService } from './schedule-rules.service';

describe('ScheduleRulesController', () => {
  let controller: ScheduleRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleRulesController],
      providers: [ScheduleRulesService],
    }).compile();

    controller = module.get<ScheduleRulesController>(ScheduleRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleRulesService } from './schedule-rules.service';

describe('ScheduleRulesService', () => {
  let service: ScheduleRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleRulesService],
    }).compile();

    service = module.get<ScheduleRulesService>(ScheduleRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

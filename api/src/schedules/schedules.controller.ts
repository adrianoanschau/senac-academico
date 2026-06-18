import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { AppRole } from '@/prisma/generated';

import { Roles } from '../auth/decorators/roles.decorator';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { FindSchedulesQueryDto } from './dto/find-schedules-query.dto';
import { GanttBlueprintDto } from './dto/gantt-blueprint.dto';
import { GanttPublishDto } from './dto/gantt-publish.dto';
import { GanttRecalculateDto } from './dto/gantt-recalculate.dto';
import { GenerateSchedulesDto } from './dto/generate-schedules.dto';
import { MigrateRuleDto } from './dto/migrate-rule.dto';
import { PlanModuleDto } from './dto/plan-module.dto';
import { PostponeScheduleDto } from './dto/postpone-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { GanttPlannerService } from './gantt-planner.service';
import { ModuleOrchestratorService } from './module-orchestrator.service';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly moduleOrchestratorService: ModuleOrchestratorService,
    private readonly ganttPlannerService: GanttPlannerService,
  ) {}

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post()
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    const data = await this.schedulesService.create(createScheduleDto);
    return { data };
  }

  @Get()
  async findAll(@Query() query: FindSchedulesQueryDto) {
    return this.schedulesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.schedulesService.findOne(id);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    const data = await this.schedulesService.update(id, updateScheduleDto);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.schedulesService.remove(id);
    return { data: { message: 'Schedule removed successfully' } };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post('generate')
  async generateBulk(@Body() generateSchedulesDto: GenerateSchedulesDto) {
    const data = await this.schedulesService.generateBulk(generateSchedulesDto);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post('plan-module')
  async planModule(@Body() planModuleDto: PlanModuleDto) {
    const data =
      await this.moduleOrchestratorService.planModuleTracks(planModuleDto);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post('gantt/blueprint')
  async ganttBlueprint(@Body() dto: GanttBlueprintDto) {
    const data = await this.ganttPlannerService.buildBlueprint(dto);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post('gantt/recalculate')
  async ganttRecalculate(@Body() dto: GanttRecalculateDto) {
    const data = await this.ganttPlannerService.recalculate(dto);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post('gantt/publish')
  async ganttPublish(@Body() dto: GanttPublishDto) {
    const data = await this.ganttPlannerService.publishBlueprint(dto);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post(':id/postpone')
  async postponeClass(
    @Param('id') id: string,
    @Body() postponeDto: PostponeScheduleDto,
  ) {
    return {
      data: await this.schedulesService.postponeClass(
        id,
        postponeDto.reason,
        postponeDto.newDate,
        postponeDto.force,
      ),
    };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post('rules/:id/migrate-pattern')
  async migrateRulePattern(
    @Param('id') id: string,
    @Body() migrateRuleDto: MigrateRuleDto,
  ) {
    const data = await this.schedulesService.migrateRulePattern(
      id,
      migrateRuleDto,
    );
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Patch('rules/:id/publish')
  async publishRule(@Param('id') id: string) {
    const data = await this.schedulesService.publishRule(id);
    return { data };
  }
}

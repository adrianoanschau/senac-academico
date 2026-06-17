import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassGroupsService } from './class-groups.service';
import { CreateClassGroupDto } from './dto/create-class-group.dto';
import { UpdateClassGroupDto } from './dto/update-class-group.dto';
import { AppRole } from '@/prisma/generated';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('class-groups')
export class ClassGroupsController {
  constructor(private readonly classGroupsService: ClassGroupsService) {}

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post()
  create(@Body() createClassGroupDto: CreateClassGroupDto) {
    return this.classGroupsService.create(createClassGroupDto);
  }

  @Get()
  async findAll() {
    const data = await this.classGroupsService.findAll();
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.classGroupsService.findOne(id);
    return { data };
  }

  @Get(':id/modules')
  async findModules(@Param('id') id: string) {
    const data = await this.classGroupsService.findModules(id);
    return { data };
  }

  @Get(':id/modules/:moduleNumber/subjects')
  async findModuleSubjects(
    @Param('id') id: string,
    @Param('moduleNumber') moduleNumber: string,
  ) {
    const data = await this.classGroupsService.findModuleSubjects(
      id,
      Number(moduleNumber),
    );
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassGroupDto: UpdateClassGroupDto,
  ) {
    const data = await this.classGroupsService.update(id, updateClassGroupDto);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.classGroupsService.remove(id);
    return { data };
  }
}

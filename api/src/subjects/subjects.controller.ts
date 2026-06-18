import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { AppRole } from '@/prisma/generated';

import { MemberRead } from '../auth/decorators/member-read.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { FindSubjectsQueryDto } from './dto/find-subjects-query.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    const data = await this.subjectsService.create(createSubjectDto);
    return { data };
  }

  @MemberRead()
  @Get()
  async findAll(@Query() query: FindSubjectsQueryDto) {
    const data = await this.subjectsService.findAll(query);
    return { data };
  }

  @MemberRead()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.subjectsService.findOne(id);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    const data = await this.subjectsService.update(id, updateSubjectDto);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.subjectsService.remove(id);
    return { data };
  }
}

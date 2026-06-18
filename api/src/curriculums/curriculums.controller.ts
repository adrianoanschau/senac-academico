import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { AppRole } from '@/prisma/generated';

import { MemberRead } from '../auth/decorators/member-read.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurriculumsService } from './curriculums.service';
import { AddSubjectToCurriculumDto } from './dto/add-subject-to-curriculum.dto';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';

@Controller('curriculums')
export class CurriculumsController {
  constructor(private readonly curriculumsService: CurriculumsService) {}

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post()
  async create(@Body() createCurriculumDto: CreateCurriculumDto) {
    const data = await this.curriculumsService.create(createCurriculumDto);
    return { data };
  }

  @MemberRead()
  @Get()
  async findAll() {
    const data = await this.curriculumsService.findAll();
    return { data };
  }

  @MemberRead()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.curriculumsService.findOne(id);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCurriculumDto: UpdateCurriculumDto,
  ) {
    const data = await this.curriculumsService.update(id, updateCurriculumDto);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.curriculumsService.remove(id);
    return { data: { message: 'Curriculum removed successfully' } };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post(':id/subjects')
  async addSubject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddSubjectToCurriculumDto,
  ) {
    const data = await this.curriculumsService.addSubject(id, dto);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Delete(':id/subjects/:curriculumSubjectId')
  async removeSubject(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('curriculumSubjectId', ParseUUIDPipe) curriculumSubjectId: string,
  ) {
    await this.curriculumsService.removeSubject(id, curriculumSubjectId);
    return { data: { message: 'Subject link removed successfully' } };
  }
}

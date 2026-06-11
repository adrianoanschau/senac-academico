import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { FindSubjectsQueryDto } from './dto/find-subjects-query.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    const data = await this.subjectsService.create(createSubjectDto);
    return { data };
  }

  @Get()
  async findAll(@Query() query: FindSubjectsQueryDto) {
    const data = await this.subjectsService.findAll(query);
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.subjectsService.findOne(id);
    return { data };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    const data = await this.subjectsService.update(id, updateSubjectDto);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.subjectsService.remove(id);
    return { data };
  }
}

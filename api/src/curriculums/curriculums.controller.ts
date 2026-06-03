import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CurriculumsService } from './curriculums.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';

@Controller('curriculums')
export class CurriculumsController {
  constructor(private readonly curriculumsService: CurriculumsService) {}

  @Post()
  async create(@Body() createCurriculumDto: CreateCurriculumDto) {
    const data = await this.curriculumsService.create(createCurriculumDto);
    return { data };
  }

  @Get()
  async findAll() {
    const data = await this.curriculumsService.findAll();
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.curriculumsService.findOne(id);
    return { data };
  }
}

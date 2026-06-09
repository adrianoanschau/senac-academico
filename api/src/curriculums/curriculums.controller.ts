import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CurriculumsService } from './curriculums.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';

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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCurriculumDto: UpdateCurriculumDto,
  ) {
    const data = await this.curriculumsService.update(id, updateCurriculumDto);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.curriculumsService.remove(id);
    return { data: { message: 'Curriculum removed successfully' } };
  }
}

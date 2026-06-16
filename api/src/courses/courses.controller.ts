import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AppRole } from '@/prisma/generated';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    const data = await this.coursesService.create(createCourseDto);
    return { data };
  }

  @Get()
  async findAll() {
    const data = await this.coursesService.findAll();
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.coursesService.findOne(id);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    const data = await this.coursesService.update(id, updateCourseDto);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.coursesService.remove(id);
    return { data };
  }
}

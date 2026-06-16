import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { AppRole } from '@/prisma/generated';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post()
  async create(@Body() createProfessorDto: CreateProfessorDto) {
    const data = await this.professorsService.create(createProfessorDto);
    return { data };
  }

  @Get()
  async findAll() {
    const data = await this.professorsService.findAll();
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.professorsService.findOne(id);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfessorDto: UpdateProfessorDto,
  ) {
    const data = await this.professorsService.update(id, updateProfessorDto);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.professorsService.remove(id);
    return { data };
  }
}

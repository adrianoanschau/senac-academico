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

import { Roles } from '../auth/decorators/roles.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    const data = await this.roomsService.create(createRoomDto);
    return { data };
  }

  @Get()
  async findAll() {
    const data = await this.roomsService.findAll();
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.roomsService.findOne(id);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    const data = await this.roomsService.update(id, updateRoomDto);
    return { data };
  }

  @Roles(AppRole.ADMIN, AppRole.SECRETARY)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.roomsService.remove(id);
    return { data };
  }
}

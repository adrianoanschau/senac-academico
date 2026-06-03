import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateScheduleOverrideDto } from './dto/create-schedule-override.dto';
import { UpdateScheduleOverrideDto } from './dto/update-schedule-override.dto';

@Injectable()
export class ScheduleOverridesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createScheduleOverrideDto: CreateScheduleOverrideDto) {
    const { startTime, endTime } = createScheduleOverrideDto;

    if (startTime >= endTime) {
      throw new BadRequestException(
        'A data/hora de início deve ser anterior à data/hora de término.',
      );
    }

    return this.prisma.scheduleOverride.create({
      data: createScheduleOverrideDto,
    });
  }

  async findAll() {
    return this.prisma.scheduleOverride.findMany({
      orderBy: { startTime: 'asc' },
    });
  }

  async findOne(id: string) {
    const override = await this.prisma.scheduleOverride.findUnique({
      where: { id },
    });

    if (!override) {
      throw new NotFoundException(
        `Regra de calendário com ID ${id} não encontrada.`,
      );
    }

    return override;
  }

  async update(
    id: string,
    updateScheduleOverrideDto: UpdateScheduleOverrideDto,
  ) {
    await this.findOne(id);

    return this.prisma.scheduleOverride.update({
      where: { id },
      data: updateScheduleOverrideDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.scheduleOverride.delete({
      where: { id },
    });
  }
}

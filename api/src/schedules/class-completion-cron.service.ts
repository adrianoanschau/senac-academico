import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ClassStatus } from '@/prisma/generated';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ClassCompletionCronService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ClassCompletionCronService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap(): Promise<void> {
    this.logger.log(
      '[Lifecycle] Aplicação inicializada. Executando checagem de catch-up para fechamento de aulas...',
    );
    await this.handleDailyClassCompletion();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailyClassCompletion(): Promise<void> {
    this.logger.log(
      'Iniciando checagem de aulas passadas para marcar como concluídas...',
    );

    const now = new Date();

    const result = await this.prisma.schedule.updateMany({
      where: {
        status: ClassStatus.SCHEDULED,
        endTime: {
          lt: now,
        },
      },
      data: {
        status: ClassStatus.COMPLETED,
      },
    });

    this.logger.log(
      `Checagem concluída. ${result.count} aulas foram atualizadas para 'COMPLETED'.`,
    );
  }
}

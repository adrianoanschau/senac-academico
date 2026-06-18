import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { SchedulesService } from './schedules.service';
import { PlanModuleDto } from './dto/plan-module.dto';

@Injectable()
export class ModuleOrchestratorService {
  private readonly logger = new Logger(ModuleOrchestratorService.name);

  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly prisma: PrismaService,
  ) {}

  async planModuleTracks(dto: PlanModuleDto) {
    this.logger.log(
      `Iniciando orquestração de trilhas para a turma: ${dto.classGroupId}`,
    );

    const createdRuleIds: string[] = [];
    let totalTracks = 0;
    let totalRulesGenerated = 0;

    const sortedTracks = [...dto.tracks].sort((a, b) => {
      if (a.isPriority && !b.isPriority) return -1;
      if (!a.isPriority && b.isPriority) return 1;
      return 0;
    });

    try {
      for (const track of sortedTracks) {
        totalTracks++;
        let previousRuleId: string | null = null;

        for (const seq of track.sequence) {
          const result = await this.schedulesService.generateBulk({
            classGroupId: dto.classGroupId,
            subjectId: seq.subjectId,
            professorId: seq.professorId,
            roomId: seq.roomId!,
            startDate: track.startDate
              ? new Date(track.startDate)
              : new Date(dto.startDate),
            daysOfWeek: track.daysOfWeek,
            startTimeStr: track.startTimeStr,
            endTimeStr: track.endTimeStr,
            dependsOnRuleId: previousRuleId || undefined,
          });

          createdRuleIds.push(result.ruleId);
          previousRuleId = result.ruleId;
          totalRulesGenerated++;
        }
      }
    } catch (error) {
      await this.rollbackCreatedRules(createdRuleIds);
      throw error;
    }

    this.logger.log(
      `Orquestração concluída: ${totalTracks} trilhas, ${totalRulesGenerated} disciplinas agendadas.`,
    );

    return {
      message: 'Módulo planejado com sucesso usando Trilhas Encadeadas.',
      summary: {
        classGroupId: dto.classGroupId,
        totalTracks,
        totalRulesGenerated,
      },
    };
  }

  private async rollbackCreatedRules(ruleIds: string[]): Promise<void> {
    if (ruleIds.length === 0) {
      return;
    }

    this.logger.warn(
      `Revertendo ${ruleIds.length} regra(s) criada(s) após falha na orquestração.`,
    );

    await this.prisma.scheduleRule.deleteMany({
      where: { id: { in: ruleIds } },
    });
  }
}

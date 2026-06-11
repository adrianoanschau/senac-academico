import { Injectable, Logger } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { PlanModuleDto } from './dto/plan-module.dto';

@Injectable()
export class ModuleOrchestratorService {
  private readonly logger = new Logger(ModuleOrchestratorService.name);

  constructor(private readonly schedulesService: SchedulesService) {}

  async planModuleTracks(dto: PlanModuleDto) {
    this.logger.log(
      `Iniciando orquestração de trilhas para a turma: ${dto.classGroupId}`,
    );

    let totalTracks = 0;
    let totalRulesGenerated = 0;

    // Ordena as trilhas: as prioritárias (isPriority === true) são processadas primeiro
    const sortedTracks = [...dto.tracks].sort((a, b) => {
      if (a.isPriority && !b.isPriority) return -1;
      if (!a.isPriority && b.isPriority) return 1;
      return 0;
    });

    // Itera sobre as trilhas processando a fila ordenada
    for (const track of sortedTracks) {
      totalTracks++;

      let previousRuleId: string | null = null;

      // Itera sobre a sequência de UCs (Disciplinas) dentro desta trilha
      for (const seq of track.sequence) {
        const generatePayload = {
          classGroupId: dto.classGroupId,
          subjectId: seq.subjectId,
          professorId: seq.professorId,
          roomId: seq.roomId!, // Opcional na Track, mas obrigatório no Generate
          startDate: track.startDate
            ? new Date(track.startDate)
            : new Date(dto.startDate),
          daysOfWeek: track.daysOfWeek,
          startTimeStr: track.startTimeStr, // Substituindo os placeholders pelos dados reais vindos da UI
          endTimeStr: track.endTimeStr,
          dependsOnRuleId: previousRuleId || undefined,
        };

        const result =
          await this.schedulesService.generateBulk(generatePayload);

        const { ruleId } = result;

        // Encadeamento: A regra recém-criada torna-se a dependência da próxima iteração
        previousRuleId = ruleId;

        totalRulesGenerated++;
      }
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
}

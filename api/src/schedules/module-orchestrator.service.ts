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

    // Itera sobre as trilhas enviadas no payload
    for (const track of dto.tracks) {
      totalTracks++;

      let previousRuleId: string | null = null;

      // Itera sobre a sequência de UCs (Disciplinas) dentro desta trilha
      for (const seq of track.sequence) {
        // TODO: startTimeStr e endTimeStr precisarão ser definidos de acordo com o Turno (Shift) da Turma.
        // Aqui usamos placeholders até conectarmos a busca de horários da ClassGroup.
        const generatePayload = {
          classGroupId: dto.classGroupId,
          subjectId: seq.subjectId,
          professorId: seq.professorId,
          roomId: seq.roomId!, // Opcional na Track, mas obrigatório no Generate
          startDate: dto.startDate, // O Motor vai ignorar isso e usar a dependência, se existir
          daysOfWeek: track.daysOfWeek,
          startTimeStr: '19:00', // Exemplo
          endTimeStr: '22:00', // Exemplo
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

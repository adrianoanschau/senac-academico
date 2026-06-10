import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  RULE_EVENTS,
  RuleEndDateChangedEvent,
} from '../events/rule-end-date-changed.event';
import { PrismaService } from '@/prisma/prisma.service';
import { SchedulesService } from '../schedules.service';
import { ClassStatus } from '@/prisma/generated';

@Injectable()
export class RuleDependencyListener {
  private readonly logger = new Logger(RuleDependencyListener.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly schedulesService: SchedulesService,
  ) {}

  @OnEvent(RULE_EVENTS.END_DATE_CHANGED)
  async handleRuleEndDateChanged(event: RuleEndDateChangedEvent) {
    this.logger.log(
      `[Efeito Dominó] Evento recebido! A regra ${event.ruleId} (Turma: ${event.classGroupId}) teve sua data final alterada para ${event.newEndDate.toISOString()}.`,
    );

    try {
      // 2. Busca no Prisma a regra dependente (Usamos findFirst pois dependsOnRuleId não é @unique)
      const dependentRule = await this.prisma.scheduleRule.findFirst({
        where: { dependsOnRuleId: event.ruleId },
      });

      // 3. Retorno precoce se for o fim da cadeia
      if (!dependentRule) {
        this.logger.log(
          `[Efeito Dominó] Fim da cadeia. Nenhuma disciplina depende da regra ${event.ruleId}.`,
        );
        return;
      }

      // 4. Calcula a nova data de início (data final da regra anterior + 1 dia)
      const newStartDate = new Date(event.newEndDate);
      newStartDate.setDate(newStartDate.getDate() + 1);
      newStartDate.setHours(0, 0, 0, 0);

      // 5. Exclui as aulas futuras atreladas à regra dependente
      await this.prisma.schedule.deleteMany({
        where: {
          ruleId: dependentRule.id,
          startTime: { gt: new Date() }, // Filtra apenas para aulas no futuro
          status: { in: [ClassStatus.PLANNED, ClassStatus.SCHEDULED] },
        },
      });

      this.logger.log(
        `[Efeito Dominó] Recalculando a regra dependente ${dependentRule.id} para iniciar a partir de ${newStartDate.toISOString()}`,
      );

      // 6 e 7. Chama o motor de geração (a própria geração propagará o evento caso a data final mude)
      await this.schedulesService.generateBulk({
        classGroupId: dependentRule.classGroupId,
        subjectId: dependentRule.subjectId,
        professorId: dependentRule.professorId,
        roomId: dependentRule.roomId,
        startDate: newStartDate,
        daysOfWeek: dependentRule.daysOfWeek,
        startTimeStr: dependentRule.startTimeStr,
        endTimeStr: dependentRule.endTimeStr,
        dependsOnRuleId: event.ruleId, // <-- Usamos o ID do evento diretamente!
      });
    } catch (error) {
      this.logger.error(
        `[Efeito Dominó] Erro crítico ao propagar reagendamento: ${error instanceof Error ? error.message : error}`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }
}

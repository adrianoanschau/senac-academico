import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '@/prisma/prisma.service';
import { ClassStatus } from '@/prisma/generated';
import {
  RULE_EVENTS,
  RuleEndDateChangedEvent,
} from '../events/rule-end-date-changed.event';
import { SchedulesService } from '../schedules.service';

@Injectable()
export class RuleDependencyListener {
  private readonly logger = new Logger(RuleDependencyListener.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly schedulesService: SchedulesService,
  ) {}

  @OnEvent(RULE_EVENTS.END_DATE_CHANGED)
  async handleRuleEndDateChanged(event: RuleEndDateChangedEvent) {
    this.logger.log('[EVENT LISTENER] Evento recebido! Payload:', event);
    this.logger.log(
      `[Efeito Dominó] Evento recebido! A regra ${event.ruleId} (Turma: ${event.classGroupId}) teve sua data final alterada para ${event.newEndDate.toISOString()}.`,
    );

    try {
      // 2. Busca no Prisma a regra dependente (Usamos findFirst pois dependsOnRuleId não é @unique)
      const dependentRule = await this.prisma.scheduleRule.findFirst({
        where: { dependsOnRuleId: event.ruleId },
      });

      this.logger.log(
        '[EVENT LISTENER] Busca por dependentes da ruleId',
        event.ruleId,
        'retornou:',
        dependentRule ? dependentRule.id : 'NENHUMA DEPENDÊNCIA ENCONTRADA',
      );

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

      // 5. A Exclusão: Limpa o calendário dessa disciplina de aulas não efetivadas (antigas ou futuras que não aconteceram)
      await this.prisma.schedule.deleteMany({
        where: {
          ruleId: dependentRule.id,
          status: { in: [ClassStatus.PLANNED, ClassStatus.SCHEDULED] },
        },
      });

      // 6. O Recálculo: Subtrai a carga horária de aulas que já foram concluídas no passado
      const completedClasses = await this.prisma.schedule.findMany({
        where: { ruleId: dependentRule.id, status: ClassStatus.COMPLETED },
      });

      const consumedMinutes = completedClasses.reduce((acc, curr) => {
        return (
          acc +
          Math.round(
            (curr.endTime.getTime() - curr.startTime.getTime()) / 60000,
          )
        );
      }, 0);

      const originalTotalMinutes = Math.round(dependentRule.totalHours * 60);
      const remainingHours = (originalTotalMinutes - consumedMinutes) / 60;

      if (remainingHours <= 0) {
        this.logger.log(
          `[Efeito Dominó] A regra dependente ${dependentRule.id} já teve toda a sua carga horária concluída. Nenhuma nova aula será gerada.`,
        );
        return;
      }

      this.logger.log(
        `[Efeito Dominó] Recalculando a regra dependente ${dependentRule.id} para iniciar a partir de ${newStartDate.toISOString()} com ${remainingHours}h restantes.`,
      );

      // 7. Chama o motor de geração informando explicitamente a carga horária restante
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
        remainingHours, // <-- Passamos a carga horária restante explícita!
        existingRuleId: dependentRule.id, // <-- Reutiliza a regra existente para não quebrar a cadeia!
      });
    } catch (error) {
      this.logger.error(
        `[Efeito Dominó] Erro crítico ao propagar reagendamento: ${error instanceof Error ? error.message : error}`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }
}

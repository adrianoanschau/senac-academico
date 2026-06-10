import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  RULE_EVENTS,
  RuleEndDateChangedEvent,
} from '../events/rule-end-date-changed.event';

@Injectable()
export class RuleDependencyListener {
  private readonly logger = new Logger(RuleDependencyListener.name);

  @OnEvent(RULE_EVENTS.END_DATE_CHANGED)
  handleRuleEndDateChanged(event: RuleEndDateChangedEvent) {
    this.logger.log(
      `[Efeito Dominó] Evento recebido! A regra ${event.ruleId} (Turma: ${event.classGroupId}) teve sua data final alterada para ${event.newEndDate.toISOString()}.`,
    );
    // TODO: Implementar a lógica de busca e recálculo das regras de disciplinas dependentes.
  }
}

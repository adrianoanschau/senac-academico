CREATE INDEX "schedules_roomId_startTime_endTime_idx" ON "schedules"("roomId", "startTime", "endTime");

CREATE INDEX "schedules_professorId_startTime_endTime_idx" ON "schedules"("professorId", "startTime", "endTime");

CREATE INDEX "schedules_classGroupId_startTime_idx" ON "schedules"("classGroupId", "startTime");

CREATE INDEX "schedules_startTime_idx" ON "schedules"("startTime");

CREATE INDEX "schedule_overrides_endTime_startTime_idx" ON "schedule_overrides"("endTime", "startTime");

CREATE INDEX "schedule_rules_dependsOnRuleId_idx" ON "schedule_rules"("dependsOnRuleId");

CREATE INDEX "schedule_rules_rootRuleId_idx" ON "schedule_rules"("rootRuleId");

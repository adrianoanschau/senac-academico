-- AlterTable
ALTER TABLE "schedule_rules"
ADD COLUMN "dependsOnRuleId" TEXT;
-- AddForeignKey
ALTER TABLE "schedule_rules"
ADD CONSTRAINT "schedule_rules_dependsOnRuleId_fkey" FOREIGN KEY ("dependsOnRuleId") REFERENCES "schedule_rules"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AlterTable
ALTER TABLE "schedule_rules"
ADD COLUMN "rootRuleId" TEXT;
-- AddForeignKey
ALTER TABLE "schedule_rules"
ADD CONSTRAINT "schedule_rules_rootRuleId_fkey" FOREIGN KEY ("rootRuleId") REFERENCES "schedule_rules"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
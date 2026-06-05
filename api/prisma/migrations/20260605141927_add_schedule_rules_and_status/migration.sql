-- CreateEnum
CREATE TYPE "ClassStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');
-- AlterTable
ALTER TABLE "schedules"
ADD COLUMN "ruleId" TEXT,
    ADD COLUMN "status" "ClassStatus" NOT NULL DEFAULT 'SCHEDULED';
-- CreateTable
CREATE TABLE "schedule_rules" (
    "id" TEXT NOT NULL,
    "daysOfWeek" INTEGER [],
    "startTimeStr" TEXT NOT NULL,
    "endTimeStr" TEXT NOT NULL,
    "totalHours" INTEGER NOT NULL,
    "classGroupId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "schedule_rules_pkey" PRIMARY KEY ("id")
);
-- AddForeignKey
ALTER TABLE "schedules"
ADD CONSTRAINT "schedules_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "schedule_rules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "schedule_rules"
ADD CONSTRAINT "schedule_rules_classGroupId_fkey" FOREIGN KEY ("classGroupId") REFERENCES "class_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "schedule_rules"
ADD CONSTRAINT "schedule_rules_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "schedule_rules"
ADD CONSTRAINT "schedule_rules_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "schedule_rules"
ADD CONSTRAINT "schedule_rules_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "schedule_rules" ENABLE ROW LEVEL SECURITY;
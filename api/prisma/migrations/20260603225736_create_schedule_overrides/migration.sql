-- CreateEnum
CREATE TYPE "OverrideType" AS ENUM ('BLOCK', 'EXTRA_DAY');
-- CreateTable
CREATE TABLE "schedule_overrides" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "type" "OverrideType" NOT NULL DEFAULT 'BLOCK',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "schedule_overrides_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "schedule_overrides" ENABLE ROW LEVEL SECURITY;
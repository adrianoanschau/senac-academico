-- CreateTable
CREATE TABLE "class_groups" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "shift" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "curriculumId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "class_groups_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "class_groups_code_key" ON "class_groups"("code");
-- AddForeignKey
ALTER TABLE "class_groups"
ADD CONSTRAINT "class_groups_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "curriculums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "class_groups" ENABLE ROW LEVEL SECURITY;
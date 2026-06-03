-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "curriculums" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "curriculums_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "hours" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "curriculum_subjects" (
    "curriculumId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "module" INTEGER NOT NULL,
    CONSTRAINT "curriculum_subjects_pkey" PRIMARY KEY ("curriculumId", "subjectId")
);
-- CreateIndex
CREATE UNIQUE INDEX "courses_code_key" ON "courses"("code");
-- CreateIndex
CREATE UNIQUE INDEX "subjects_code_key" ON "subjects"("code");
-- AddForeignKey
ALTER TABLE "curriculums"
ADD CONSTRAINT "curriculums_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "curriculum_subjects"
ADD CONSTRAINT "curriculum_subjects_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "curriculums"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "curriculum_subjects"
ADD CONSTRAINT "curriculum_subjects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "courses" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "curriculums" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "subjects" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "curriculum_subjects" ENABLE ROW LEVEL SECURITY;
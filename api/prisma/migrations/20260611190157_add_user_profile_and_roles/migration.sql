-- CreateEnum
CREATE TYPE "AppRole" AS ENUM ('ADMIN', 'COORDINATOR', 'INSTRUCTOR', 'SECRETARY', 'MEMBER');

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "AppRole" NOT NULL DEFAULT 'INSTRUCTOR',

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_email_key" ON "user_profiles"("email");

-- CreateEnum
CREATE TYPE "AppRole" AS ENUM ('ADMIN', 'COORDINATOR', 'INSTRUCTOR', 'SECRETARY', 'MEMBER');

-- CreateTable
CREATE TABLE "users_profiles" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "role" "AppRole" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "users_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_profiles_email_key" ON "users_profiles"("email");

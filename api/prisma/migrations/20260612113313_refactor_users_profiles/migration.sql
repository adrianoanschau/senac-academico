-- AlterTable
ALTER TABLE "users_profiles" DROP COLUMN "role",
  ADD COLUMN "displayName" TEXT,
  ADD COLUMN "phoneNumber" TEXT,
  ADD COLUMN "roles" "AppRole" [] DEFAULT ARRAY ['MEMBER']::"AppRole" [];
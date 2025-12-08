/*
  Warnings:

  - The values [PROJECT_ADMIN] on the enum `UserRoleType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `project` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRoleType_new" AS ENUM ('USER', 'ORG_ADMIN', 'ORG_OWNER', 'GOD');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRoleType_new" USING ("role"::text::"UserRoleType_new");
ALTER TYPE "UserRoleType" RENAME TO "UserRoleType_old";
ALTER TYPE "UserRoleType_new" RENAME TO "UserRoleType";
DROP TYPE "UserRoleType_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_project_fkey";

-- DropIndex
DROP INDEX "User_project_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "project";

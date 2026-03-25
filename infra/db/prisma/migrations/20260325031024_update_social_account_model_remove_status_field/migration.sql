/*
  Warnings:

  - You are about to drop the column `status` on the `SocialAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SocialAccount" DROP COLUMN "status";

-- DropEnum
DROP TYPE "AccountStatus";

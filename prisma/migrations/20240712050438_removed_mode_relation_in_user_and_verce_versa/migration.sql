/*
  Warnings:

  - You are about to drop the column `userId` on the `Mode` table. All the data in the column will be lost.
  - Made the column `modeSesssionId` on table `ModeTrialSession` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "FILE_TYPE" AS ENUM ('LEFT_RIGHT_MODE', 'VISUAL_BALANCE_MODE');

-- DropForeignKey
ALTER TABLE "Mode" DROP CONSTRAINT "Mode_userId_fkey";

-- DropForeignKey
ALTER TABLE "ModeTrialSession" DROP CONSTRAINT "ModeTrialSession_modeSesssionId_fkey";

-- AlterTable
ALTER TABLE "Mode" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "ModeTrialSession" ALTER COLUMN "modeSesssionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserDetail" ADD COLUMN     "profileURL" TEXT;

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMPTZ,
    "type" "FILE_TYPE" NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModeSession" ADD CONSTRAINT "ModeSession_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeTrialSession" ADD CONSTRAINT "ModeTrialSession_modeSesssionId_fkey" FOREIGN KEY ("modeSesssionId") REFERENCES "ModeSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

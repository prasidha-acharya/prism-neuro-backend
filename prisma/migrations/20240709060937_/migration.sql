/*
  Warnings:

  - You are about to drop the column `data` on the `ModeTrialSession` table. All the data in the column will be lost.
  - Added the required column `trialId` to the `ModeTrialSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModeTrialSession" DROP COLUMN "data",
ADD COLUMN     "results" JSONB,
ADD COLUMN     "trialId" INTEGER NOT NULL;

/*
  Warnings:

  - You are about to drop the column `modeId` on the `ModeSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ModeSession" DROP COLUMN "modeId",
ADD COLUMN     "modeIds" TEXT[];

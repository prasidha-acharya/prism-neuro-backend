/*
  Warnings:

  - You are about to drop the column `patientId` on the `Mode` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mode" DROP CONSTRAINT "Mode_patientId_fkey";

-- AlterTable
ALTER TABLE "Mode" DROP COLUMN "patientId",
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "trialDuration" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Mode" ADD CONSTRAINT "Mode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

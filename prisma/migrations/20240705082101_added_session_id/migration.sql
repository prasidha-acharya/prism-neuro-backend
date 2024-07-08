/*
  Warnings:

  - Added the required column `patientId` to the `Mode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "OTP_TYPE" ADD VALUE 'RESET_PASSWORD';

-- AlterTable
ALTER TABLE "Mode" ADD COLUMN     "patientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Otp" ADD COLUMN     "sessionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Mode" ADD CONSTRAINT "Mode_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

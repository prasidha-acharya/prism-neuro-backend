/*
  Warnings:

  - You are about to drop the column `doctorId` on the `ModeSession` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Mode` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `physioId` to the `ModeSession` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MODE_TYPE" AS ENUM ('BALANCE_MODE', 'TARGET_MODE', 'LEFT_RIGHT_MODE', 'VISUAL_BALANCE_MODE');

-- AlterTable
ALTER TABLE "Mode" DROP COLUMN "type",
ADD COLUMN     "type" "MODE_TYPE" NOT NULL;

-- AlterTable
ALTER TABLE "ModeSession" DROP COLUMN "doctorId",
ADD COLUMN     "physioId" TEXT NOT NULL;

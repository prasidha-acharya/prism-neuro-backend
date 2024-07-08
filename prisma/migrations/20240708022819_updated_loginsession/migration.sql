/*
  Warnings:

  - You are about to drop the `UserSession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `otpCode` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserSession" DROP CONSTRAINT "UserSession_userId_fkey";

-- AlterTable
ALTER TABLE "Otp" ADD COLUMN     "otpCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userName" DROP NOT NULL;

-- DropTable
DROP TABLE "UserSession";

-- CreateTable
CREATE TABLE "LoginSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceTokenId" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "LoginSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LoginSession" ADD CONSTRAINT "LoginSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

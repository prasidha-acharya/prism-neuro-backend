/*
  Warnings:

  - You are about to drop the column `userId` on the `UserDetail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `UserDetail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `UserDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserDetail" DROP CONSTRAINT "UserDetail_usersId_fkey";

-- AlterTable
ALTER TABLE "UserDetail" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL,
ALTER COLUMN "usersId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_userEmail_key" ON "UserDetail"("userEmail");

-- AddForeignKey
ALTER TABLE "UserDetail" ADD CONSTRAINT "UserDetail_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

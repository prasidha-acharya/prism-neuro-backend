/*
  Warnings:

  - The primary key for the `UserDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `usersId` to the `UserDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserDetail" DROP CONSTRAINT "UserDetail_userId_fkey";

-- DropIndex
DROP INDEX "UserDetail_userId_key";

-- AlterTable
ALTER TABLE "UserDetail" DROP CONSTRAINT "UserDetail_pkey",
ADD COLUMN     "usersId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserDetail_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "UserDetail" ADD CONSTRAINT "UserDetail_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

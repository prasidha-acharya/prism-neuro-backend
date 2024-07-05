/*
  Warnings:

  - The `age` column on the `UserDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstLogin" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "UserDetail" ADD COLUMN     "weight" INTEGER,
DROP COLUMN "age",
ADD COLUMN     "age" INTEGER;

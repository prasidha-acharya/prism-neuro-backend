-- AlterTable
ALTER TABLE "File" ADD COLUMN     "isLeftMode" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRightMode" BOOLEAN NOT NULL DEFAULT false;

-- CreateEnum
CREATE TYPE "ModeSessionStatus" AS ENUM ('START', 'STOP');

-- CreateEnum
CREATE TYPE "ModeTrialSessionStatus" AS ENUM ('COMPLETED');

-- CreateTable
CREATE TABLE "ModeSession" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "modeId" TEXT NOT NULL,
    "status" "ModeSessionStatus" NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "ModeSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mode" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "images" TEXT[],
    "trialCount" INTEGER NOT NULL,
    "trialDuration" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "Mode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModeDetail" (
    "id" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "videoUrls" TEXT[],
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ,
    "modeId" TEXT NOT NULL,

    CONSTRAINT "ModeDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModeTrialSession" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "status" "ModeTrialSessionStatus",
    "modeId" TEXT NOT NULL,

    CONSTRAINT "ModeTrialSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ModeDetail_modeId_key" ON "ModeDetail"("modeId");

-- AddForeignKey
ALTER TABLE "ModeDetail" ADD CONSTRAINT "ModeDetail_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "Mode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeTrialSession" ADD CONSTRAINT "ModeTrialSession_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "Mode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

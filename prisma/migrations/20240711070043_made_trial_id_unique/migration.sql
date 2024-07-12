/*
  Warnings:

  - A unique constraint covering the columns `[trialId]` on the table `ModeTrialSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ModeTrialSession_trialId_key" ON "ModeTrialSession"("trialId");

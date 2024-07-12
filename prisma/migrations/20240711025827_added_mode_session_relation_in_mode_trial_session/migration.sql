-- AlterTable
ALTER TABLE "ModeTrialSession" ADD COLUMN     "modeSesssionId" TEXT;

-- AddForeignKey
ALTER TABLE "ModeTrialSession" ADD CONSTRAINT "ModeTrialSession_modeSesssionId_fkey" FOREIGN KEY ("modeSesssionId") REFERENCES "ModeSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

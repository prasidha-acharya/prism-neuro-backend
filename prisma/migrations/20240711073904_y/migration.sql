-- AddForeignKey
ALTER TABLE "ModeSession" ADD CONSTRAINT "ModeSession_physioId_fkey" FOREIGN KEY ("physioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

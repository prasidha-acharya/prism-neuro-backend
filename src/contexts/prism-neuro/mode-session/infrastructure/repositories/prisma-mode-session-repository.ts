import { PrismaClient } from '@prisma/client';
import { IModeSessionRequest } from '../../domain/interface/mode-session-request.interface';
import { IModeSessionRepository } from '../../domain/repositories/mode-session-repository';

export class PrismaModeSessionRepository implements IModeSessionRepository {
  constructor(private db: PrismaClient) {}

  async setModeSession(request: IModeSessionRequest, sessionId?: string): Promise<void> {
    await this.db.modeSession.upsert({
      where: {
        id: sessionId,
        patientId: request.patientId,
        physioId: request.physioId
      },
      create: {
        ...request
      },
      update: { ...request }
    });
  }
}

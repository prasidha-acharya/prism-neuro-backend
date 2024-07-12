import { ModeSession, PrismaClient } from '@prisma/client';
import { ICreateModeSessionRequest, IGetModeSessionRequest, IUpdateModeSessionRequest } from '../../domain/interface/mode-session-request.interface';
import { IModeSessionRepository } from '../../domain/repositories/mode-session-repository';

export class PrismaModeSessionRepository implements IModeSessionRepository {
  constructor(private db: PrismaClient) {}

  getModeSessionOfPhysioAndPatient(request: IGetModeSessionRequest): Promise<ModeSession | null> {
    return this.db.modeSession.findFirst({
      where: {
        ...request
      }
    });
  }

  startModeSession(request: ICreateModeSessionRequest): Promise<ModeSession | null> {
    return this.db.modeSession.create({
      data: {
        ...request
      }
    });
  }

  async updateModeSession(request: IUpdateModeSessionRequest, sessionId: string): Promise<void> {
    await this.db.modeSession.update({
      where: { id: sessionId },
      data: {
        ...request
      }
    });
  }
}

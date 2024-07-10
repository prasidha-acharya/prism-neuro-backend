import { ICreateModeSessionRequest } from '../domain/interface/mode-session-request.interface';
import { PrismaModeSessionRepository } from '../infrastructure/repositories/prisma-mode-session-repository';

export class EndModeSessionService {
  constructor(private prismaModeSessionRepository: PrismaModeSessionRepository) {}

  async invoke(request: ICreateModeSessionRequest, sessionId: string): Promise<void> {
    this.prismaModeSessionRepository.updateModeSession(request, sessionId);
  }
}

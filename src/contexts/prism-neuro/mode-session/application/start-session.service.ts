import { IModeSessionRequest } from '../domain/interface/mode-session-request.interface';
import { PrismaModeSessionRepository } from '../infrastructure/repositories/prisma-mode-session-repository';

export class StartModeSessionService {
  constructor(private prismaModeSessionRepository: PrismaModeSessionRepository) {}

  async invoke(request: IModeSessionRequest, sessionId?: string): Promise<void> {
    this.prismaModeSessionRepository.setModeSession(request, sessionId);
  }
}

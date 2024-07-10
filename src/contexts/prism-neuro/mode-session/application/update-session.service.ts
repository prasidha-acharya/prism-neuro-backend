import { IUpdateModeSessionRequest } from '../domain/interface/mode-session-request.interface';
import { PrismaModeSessionRepository } from '../infrastructure/repositories/prisma-mode-session-repository';

export class UpdateModeSessionService {
  constructor(private prismaModeSessionRepository: PrismaModeSessionRepository) {}

  async invoke(request: IUpdateModeSessionRequest, modeSessionId: string): Promise<void> {
    this.prismaModeSessionRepository.updateModeSession(request, modeSessionId);
  }
}

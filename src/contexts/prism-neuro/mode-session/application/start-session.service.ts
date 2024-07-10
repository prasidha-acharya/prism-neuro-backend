import { ICreateModeSessionRequest } from '../domain/interface/mode-session-request.interface';
import { PrismaModeSessionRepository } from '../infrastructure/repositories/prisma-mode-session-repository';

export class StartModeSessionService {
  constructor(private prismaModeSessionRepository: PrismaModeSessionRepository) {}

  async invoke(request: ICreateModeSessionRequest): Promise<void> {
    this.prismaModeSessionRepository.startModeSession(request);
  }
}

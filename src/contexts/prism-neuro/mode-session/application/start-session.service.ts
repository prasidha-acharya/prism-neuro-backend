import { ModeSession } from '@prisma/client';
import { ICreateModeSessionRequest } from '../domain/interface/mode-session-request.interface';
import { PrismaModeSessionRepository } from '../infrastructure/repositories/prisma-mode-session-repository';

export class StartModeSessionService {
  constructor(private prismaModeSessionRepository: PrismaModeSessionRepository) {}

  invoke(request: ICreateModeSessionRequest): Promise<ModeSession | null> {
    return this.prismaModeSessionRepository.startModeSession(request);
  }
}

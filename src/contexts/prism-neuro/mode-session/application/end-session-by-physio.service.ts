import { PrismaModeSessionRepository } from '../infrastructure/repositories/prisma-mode-session-repository';

export class EndModeSessionByPhsyioService {
  constructor(private prismaModeSessionRepository: PrismaModeSessionRepository) {}

  async invoke(userId: string): Promise<void> {
    await this.prismaModeSessionRepository.endModeSessionByPhysio(userId);
  }
}

import { IPrismaModeWithDetail } from '../domain/interface/mode-response.interface';
import { PrismaModeRepository } from '../infrastructure/repositories/prisma-mode-repository';

export class GetModesService {
  constructor(private prismaModeRepository: PrismaModeRepository) {}

  invoke(sessionId: string): Promise<IPrismaModeWithDetail[] | null> {
    return this.prismaModeRepository.getModes(sessionId);
  }
}

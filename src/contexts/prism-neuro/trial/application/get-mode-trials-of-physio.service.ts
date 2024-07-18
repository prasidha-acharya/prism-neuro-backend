import { ModeTrialSession } from '@prisma/client';
import { PrismaModeTrialRepository } from '../infrastructure/repositories/prisma-mode-trial-repository';

export class GetModeTrialsOfPhysioService {
  constructor(private prismaModeTrialRepository: PrismaModeTrialRepository) {}

  invoke(physioId: string): Promise<ModeTrialSession[] | null> {
    return this.prismaModeTrialRepository.getModeTrialOfPhysio(physioId);
  }
}

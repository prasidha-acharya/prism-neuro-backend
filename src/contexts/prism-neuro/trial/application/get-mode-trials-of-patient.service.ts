import { ModeTrialSession } from '@prisma/client';
import { PrismaModeTrialRepository } from '../infrastructure/repositories/prisma-mode-trial-repository';

export class GetModeTrialsOfPatientService {
  constructor(private prismaModeTrialRepository: PrismaModeTrialRepository) {}

  invoke(userId: string): Promise<ModeTrialSession[] | null> {
    return this.prismaModeTrialRepository.getModeTrialOfPatient(userId);
  }
}

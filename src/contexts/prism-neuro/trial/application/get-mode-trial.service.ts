import { ModeTrialSession } from '@prisma/client';
import { IGetModeTrialsRequest } from '../domain/interface/mode-trial-request.interface';
import { PrismaModeTrialRepository } from '../infrastructure/repositories/prisma-mode-trial-repository';

export class GetModeTrialsBySessionService {
  constructor(private prismaModeTrialRepository: PrismaModeTrialRepository) {}

  invoke(request: IGetModeTrialsRequest): Promise<ModeTrialSession[] | null> {
    return this.prismaModeTrialRepository.getModeTrials(request);
  }
}

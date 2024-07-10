import { IEndModeTrialRequest } from '../domain/interface/mode-trial-request.interface';
import { PrismaModeTrialRepository } from '../infrastructure/repositories/prisma-mode-trial-repository';

export class EndModeTrialService {
  constructor(private prismaModeTrialRepository: PrismaModeTrialRepository) {}

  async invoke(request: IEndModeTrialRequest): Promise<void> {
    this.prismaModeTrialRepository.endModeTrial(request);
  }
}

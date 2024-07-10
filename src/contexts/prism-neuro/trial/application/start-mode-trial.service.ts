import { IStartModeTrialRequest } from '../domain/interface/mode-trial-request.interface';
import { PrismaModeTrialRepository } from '../infrastructure/repositories/prisma-mode-trial-repository';

export class StartModeTrialService {
  constructor(private prismaModeTrialRepository: PrismaModeTrialRepository) {}

  async invoke(request: IStartModeTrialRequest): Promise<void> {
    this.prismaModeTrialRepository.startModeTrial(request);
  }
}

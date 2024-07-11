import { IGetModeTrialRequest } from '../domain/interface/mode-trial-request.interface';
import { PrismaModeTrialRepository } from '../infrastructure/repositories/prisma-mode-trial-repository';

export class GetModeTrialBySessionService {
  constructor(private prismaModeTrialRepository: PrismaModeTrialRepository) {}

  async invoke(request: IGetModeTrialRequest): Promise<void> {
    this.prismaModeTrialRepository.getModeTrial(request);
  }
}

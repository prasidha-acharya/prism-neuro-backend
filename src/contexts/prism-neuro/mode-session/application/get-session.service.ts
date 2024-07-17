import { IGetModeSessionRequest, IPrismaModeSessionOfPhysioAndPatientReponse } from '../domain/interface/mode-session-request.interface';
import { PrismaModeSessionRepository } from '../infrastructure/repositories/prisma-mode-session-repository';

export class GetModeSessionOfPhysioAndPatientService {
  constructor(private prismaModeSessionRepository: PrismaModeSessionRepository) {}

  async invoke(request: IGetModeSessionRequest): Promise<IPrismaModeSessionOfPhysioAndPatientReponse | null> {
    return this.prismaModeSessionRepository.getModeSessionOfPhysioAndPatient(request);
  }
}

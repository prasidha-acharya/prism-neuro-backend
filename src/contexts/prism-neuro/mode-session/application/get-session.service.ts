import { ModeSession } from '@prisma/client';
import { IGetModeSessionRequest } from '../domain/interface/mode-session-request.interface';
import { PrismaModeSessionRepository } from '../infrastructure/repositories/prisma-mode-session-repository';

export class GetModeSessionOfPhysioAndPatientService {
  constructor(private prismaModeSessionRepository: PrismaModeSessionRepository) {}

  async invoke(request: IGetModeSessionRequest): Promise<ModeSession | null> {
    return this.prismaModeSessionRepository.getModeSessionOfPhysioAndPatient(request);
  }
}

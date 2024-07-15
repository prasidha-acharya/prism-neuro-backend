import { ModeSession } from '@prisma/client';
import { IGetModeTrialsOfPatientRequest } from '../domain/interface/mode-session-request.interface';
import { PrismaModeSessionRepository } from '../infrastructure/repositories/prisma-mode-session-repository';

export class GetSessionOfPateintService {
  constructor(private prismaModeSessionRepository: PrismaModeSessionRepository) {}

  invoke(request: IGetModeTrialsOfPatientRequest): Promise<ModeSession[] | null> {
    return this.prismaModeSessionRepository.getModeTrialsOfPatient(request);
  }
}

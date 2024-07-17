import { IPaginateResponse } from '../../users/domain/interface/user.response.interface';
import { IGetModeTrialsOfPatientRequest, IPrismaModeSessionRequest } from '../domain/interface/mode-session-request.interface';
import { PrismaModeSessionRepository } from '../infrastructure/repositories/prisma-mode-session-repository';

export class GetSessionOfPateintService {
  constructor(private prismaModeSessionRepository: PrismaModeSessionRepository) {}

  invoke(request: IGetModeTrialsOfPatientRequest): Promise<IPaginateResponse<IPrismaModeSessionRequest[] | null>> {
    return this.prismaModeSessionRepository.getModeTrialsOfPatient(request);
  }
}

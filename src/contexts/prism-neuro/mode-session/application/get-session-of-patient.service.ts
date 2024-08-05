import { ModeTransformer } from '../../../../contexts/shared/infrastructure/transformer/mode-transformer';
import { defaultLimit, defaultPage } from '../../../../contexts/shared/infrastructure/utils/constant';
import { IPaginateResponse } from '../../users/domain/interface/user.response.interface';
import { IGetModeTrialsOfPatientRequest } from '../domain/interface/mode-session-request.interface';
import { IGetModeSessionOfPatientResponse } from '../domain/interface/mode-session-response.interface';
import { PrismaModeSessionRepository } from '../infrastructure/repositories/prisma-mode-session-repository';

export class GetSessionOfPateintService {
  constructor(
    private prismaModeSessionRepository: PrismaModeSessionRepository,
    private modeTransformer: ModeTransformer
  ) {}

  async invoke(request: IGetModeTrialsOfPatientRequest): Promise<IPaginateResponse<IGetModeSessionOfPatientResponse[] | null>> {
    const response = await this.prismaModeSessionRepository.getModeTrialsOfPatient(request);

    const sessionCount = ((request?.page ?? defaultPage) - 1) * (request?.limit ?? defaultLimit);

    const modeSession = response.data === null ? null : this.modeTransformer.modeSessionOfPatients(response.data, sessionCount);

    return {
      ...response,
      data: modeSession
    };
  }
}

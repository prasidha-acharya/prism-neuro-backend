import { ModeTransformer } from '../../../../contexts/shared/infrastructure/transformer/mode-transformer';
import { IGetPatientsModeSessionByPhysioResponse } from '../../mode-session/domain/interface/mode-session-response.interface';
import { IGetPatientsActivityByPhysioServiceRequest } from '../domain/interface/user-request.interface';
import { IPaginateResponse } from '../domain/interface/user.response.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class GetAllPatientsActivityByPhysioService {
  constructor(
    private prismaUserRepository: PrismaUserRepository,
    private modeTransformer: ModeTransformer
  ) {}

  async invoke({
    search,
    physioId,
    modeId,
    startDate,
    endDate,
    page,
    limit
  }: IGetPatientsActivityByPhysioServiceRequest): Promise<IPaginateResponse<IGetPatientsModeSessionByPhysioResponse[] | null>> {
    const response = await this.prismaUserRepository.getPatientsOfPhysio(physioId, search);
    return this.modeTransformer.modeSessionActivityOfAllPatientsByPhysio(response, { search, page, limit, startDate, endDate, modeId });
  }
}

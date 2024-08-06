import { ModeTransformer } from '../../../../contexts/shared/infrastructure/transformer/mode-transformer';
import { IGetPatientsActivityResponse } from '../../mode-session/domain/interface/mode-session-response.interface';
import { IPaginateResponse } from '../domain/interface/user.response.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class GetAllPatientsActivityByAdminService {
  constructor(
    private prismaUserRepository: PrismaUserRepository,
    private modeTransformer: ModeTransformer
  ) {}

  async invoke({
    startDate,
    endDate,
    page,
    limit,
    search
  }: {
    startDate?: Date;
    endDate?: Date;
    page: number;
    limit: number;
    search?: string;
  }): Promise<IPaginateResponse<IGetPatientsActivityResponse[] | null>> {
    const response = await this.prismaUserRepository.getAllPatientsIncludingTrialSession(search);

    return this.modeTransformer.modeSessionActivityOfAllPatients(response, { limit, page, startDate, endDate });
  }
}

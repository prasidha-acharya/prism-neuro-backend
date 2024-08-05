import { StatisticsTransformer } from '../../../../contexts/shared/infrastructure/transformer/statistics-transformer';
import { PrismaModeRepository } from '../../mode/infrastructure/repositories/prisma-mode-repository';
import { IAdminModeAnalysticsRequest } from '../domain/interface/mode-request.interface';
import { IModeAnalyticsReponse } from '../domain/interface/mode-response.interface';

export class GetModeAnalyticsOfAdminService {
  constructor(
    private prismaModeRepository: PrismaModeRepository,
    private statisticsTransformer: StatisticsTransformer
  ) {}

  async invoke(request: IAdminModeAnalysticsRequest): Promise<IModeAnalyticsReponse[]> {
    const response = await this.prismaModeRepository.getModeAnalyticsByQuery(request);
    const resp = this.statisticsTransformer.modeAnalayticsTransformer(response);
    return resp;
  }
}

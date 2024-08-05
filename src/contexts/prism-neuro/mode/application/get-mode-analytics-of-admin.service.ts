import { StatisticsTransformer } from 'src/contexts/shared/infrastructure/transformer/statistics-transformer';
import { PrismaModeRepository } from '../../mode/infrastructure/repositories/prisma-mode-repository';
import { IModeAnalyticsReponse } from '../domain/interface/mode-response.interface';

export class GetModeAnalyticsOfAdminService {
  constructor(
    private prismaModeRepository: PrismaModeRepository,
    private statisticsTransformer: StatisticsTransformer
  ) {}

  async invoke(request: any): Promise<IModeAnalyticsReponse[]> {
    const response = await this.prismaModeRepository.getModeSessionsByQuery(request);
    const resp = this.statisticsTransformer.modeAnalayticsTransformer(response);
    return resp;
  }
}

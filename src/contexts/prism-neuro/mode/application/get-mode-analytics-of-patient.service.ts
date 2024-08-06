import { Filter } from '../../../../contexts/shared/domain/interface/enum';
import { StatisticsTransformer } from '../../../../contexts/shared/infrastructure/transformer/statistics-transformer';
import { PrismaModeRepository } from '../../mode/infrastructure/repositories/prisma-mode-repository';
import { IPatientModeAnalysticsRequest } from '../domain/interface/mode-request.interface';
import { IModeAnalyticsReponse } from '../domain/interface/mode-response.interface';

export class GetModeAnalyticsOfPatientService {
  constructor(
    private prismaModeRepository: PrismaModeRepository,
    private statisticsTransformer: StatisticsTransformer
  ) {}

  async invoke(request: IPatientModeAnalysticsRequest, filter: Filter): Promise<IModeAnalyticsReponse[]> {
    const response = await this.prismaModeRepository.getModeAnalyticsByQuery(request);
    const resp = this.statisticsTransformer.modeAnalayticsTransformer(response, filter);
    return resp;
  }
}

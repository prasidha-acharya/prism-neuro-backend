import { StatisticsTransformer } from 'src/contexts/shared/infrastructure/transformer/statistics-transformer';
import { PrismaModeRepository } from '../../mode/infrastructure/repositories/prisma-mode-repository';

export class GetSessionsForModeAnalyticsDashBoardService {
  constructor(
    private prismaModeRepository: PrismaModeRepository,
    private statisticsTransformer: StatisticsTransformer
  ) {}

  async invoke(request: any): Promise<any> {
    const response = await this.prismaModeRepository.getModeSessionsByQuery(request);
    const resp = this.statisticsTransformer.newModeAnalayticsDashBoardTransformer(response);
    return resp;
  }
}

import { ModeTransformer } from '../../../../contexts/shared/infrastructure/transformer/mode-transformer';
import { IGetModesDetailForTabletResponse } from '../../mode-session/domain/interface/mode-session-response.interface';
import { PrismaModeRepository } from '../infrastructure/repositories/prisma-mode-repository';

export class GetModesByPhysioService {
  constructor(
    private prismaModeRepository: PrismaModeRepository,
    private modeTransformer: ModeTransformer
  ) {}

  async invoke(sessionId: string): Promise<IGetModesDetailForTabletResponse[] | null> {
    const response = await this.prismaModeRepository.getModes(sessionId);
    return response === null ? null : this.modeTransformer.getModesDetailForTablet(response);
  }
}

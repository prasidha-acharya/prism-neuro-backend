import { ModeTransformer } from 'src/contexts/shared/infrastructure/transformer/mode-transformer';
import { IGetModesDetailForDashBoardResponse } from '../../mode-session/domain/interface/mode-session-response.interface';
import { PrismaModeRepository } from '../infrastructure/repositories/prisma-mode-repository';

export class GetModesByAdminService {
  constructor(
    private prismaModeRepository: PrismaModeRepository,
    private modeTransformer: ModeTransformer
  ) {}

  async invoke(): Promise<IGetModesDetailForDashBoardResponse[] | null> {
    const response = await this.prismaModeRepository.getModes();

    return response === null ? null : this.modeTransformer.getModesDetailForDashboard(response);
  }
}

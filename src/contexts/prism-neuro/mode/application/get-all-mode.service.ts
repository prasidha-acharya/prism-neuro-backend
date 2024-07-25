import { IGetAllModesRequest } from '../domain/interface/mode-request.interface';
import { IPrismaModeWithTrials } from '../domain/interface/mode-response.interface';
import { PrismaModeRepository } from '../infrastructure/repositories/prisma-mode-repository';

export class GetAllModesService {
  constructor(private prismaModeRepository: PrismaModeRepository) {}

  invoke(request: IGetAllModesRequest): Promise<IPrismaModeWithTrials[] | null> {
    return this.prismaModeRepository.getAllModes(request);
  }
}

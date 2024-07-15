import { Mode } from '@prisma/client';
import { IGetAllModesRequest } from '../domain/interface/mode-request.interface';
import { PrismaModeRepository } from '../infrastructure/repositories/prisma-mode-repository';

export class GetAllModesService {
  constructor(private prismaModeRepository: PrismaModeRepository) {}

  invoke(request: IGetAllModesRequest): Promise<Mode[] | null> {
    return this.prismaModeRepository.getAllModes(request);
  }
}

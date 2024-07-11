import { Mode } from '@prisma/client';
import { IGetModeByIdRequest } from '../domain/interface/mode-request.interface';
import { PrismaModeRepository } from '../infrastructure/repositories/prisma-mode-repository';

export class GetModeByIdService {
  constructor(private prismaModeRepository: PrismaModeRepository) {}

  invoke(request: IGetModeByIdRequest): Promise<Mode | null> {
    return this.prismaModeRepository.getModeById(request);
  }
}

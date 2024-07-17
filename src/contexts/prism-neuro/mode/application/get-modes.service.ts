import { Mode } from '@prisma/client';
import { PrismaModeRepository } from '../infrastructure/repositories/prisma-mode-repository';

export class GetModesService {
  constructor(private prismaModeRepository: PrismaModeRepository) {}

  invoke(): Promise<Mode[] | null> {
    return this.prismaModeRepository.getModes();
  }
}

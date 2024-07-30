import { IUpdatePhysioTherapistRequest } from '../domain/interface/user-request.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class UpdatePhysioService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(request: IUpdatePhysioTherapistRequest): Promise<void> {
    this.prismaUserRepository.updatePhysioOrAdmin(request);
  }
}

import { ICreatePhysioTherapistRequest } from '../domain/interface/user-request.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class CreatePhysioByAdminService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(request: ICreatePhysioTherapistRequest): Promise<void> {
    await this.prismaUserRepository.createPhysioByAdmin(request);
  }
}

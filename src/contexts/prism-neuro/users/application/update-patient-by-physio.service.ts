import { IUpdatePatientRequest } from '../domain/interface/user-request.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class UpdatePhysioService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(request: IUpdatePatientRequest): Promise<void> {
    this.prismaUserRepository.updatePatientByPhysio(request);
  }
}

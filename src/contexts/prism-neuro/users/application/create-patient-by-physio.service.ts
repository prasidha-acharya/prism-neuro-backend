import { ICreatePatientByPhysioRequest } from '../domain/interface/user-request.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class CreatePatientByPhysioService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(request: ICreatePatientByPhysioRequest): Promise<void> {
    await this.prismaUserRepository.createPatientByPhysio(request);
  }
}

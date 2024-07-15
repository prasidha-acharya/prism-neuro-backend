import { ICreateDoctorRequest } from '../domain/interface/user-request.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class CreateDoctorByAdminService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(request: ICreateDoctorRequest): Promise<void> {
    await this.prismaUserRepository.createPhysioByAdmin(request);
  }
}

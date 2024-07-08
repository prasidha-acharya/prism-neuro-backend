import { IUpdateDoctorRequest } from '../domain/interface/user-request.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class UpdateDoctorService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(request: IUpdateDoctorRequest): Promise<void> {
    this.prismaUserRepository.updateDoctorByAdmin(request);
  }
}

import { ICreateDoctorRequest } from '../domain/interface/create-doctor';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class CreateDoctorService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(request: ICreateDoctorRequest): Promise<void> {
    await this.prismaUserRepository.createDoctor(request);
  }
}

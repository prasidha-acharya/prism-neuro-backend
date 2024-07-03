import { ICreateDoctorRequest } from '../domain/interface/create-doctor';
import { PrismaAdminRepository } from '../infrastructure/repositories/prisma-admin-repository';

export class CreateDoctorService {
  constructor(private prismaAdminRepository: PrismaAdminRepository) {}

  public async invoke(request: ICreateDoctorRequest): Promise<void> {
    await this.prismaAdminRepository.createDoctor(request);
  }
}

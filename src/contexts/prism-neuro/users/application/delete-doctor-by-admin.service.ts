import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class DeleteDoctorService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(doctorId: string): Promise<void> {
    this.prismaUserRepository.deletePhysioByAdmin(doctorId);
  }
}

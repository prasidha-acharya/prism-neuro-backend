import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class DeletePatientByAdminService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  async invoke(patientId: string, physioId: string): Promise<void> {
    await this.prismaUserRepository.deletePatientByDoctor(patientId, physioId);
  }
}

import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class GetTotalPatientsService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  invoke(physioId: string): Promise<number> {
    return this.prismaUserRepository.getTotalPatients(physioId);
  }
}

import { IPrismaUserForGetPatientsDetailIncludingSessions } from '../domain/interface/user.response.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class GetAllPatientsInCludingSessionInfoService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  invoke(search?: string): Promise<IPrismaUserForGetPatientsDetailIncludingSessions[] | null> {
    return this.prismaUserRepository.getAllPatientsIncludingTrialSession(search);
  }
}

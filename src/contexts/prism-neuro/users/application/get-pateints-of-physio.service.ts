import { IPrismaUserForGetPatientsByPhysioResponse } from '../domain/interface/user.response.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class GetPatientsOfPhysioService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  invoke(physioId: string): Promise<IPrismaUserForGetPatientsByPhysioResponse[] | null> {
    return this.prismaUserRepository.getPatientsOfPhysio(physioId);
  }
}

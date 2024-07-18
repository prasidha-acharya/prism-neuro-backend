import { IUpdatePatientReq } from '../domain/interface/user-request.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class UpdatePatientService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(request: IUpdatePatientReq): Promise<void> {
    await this.prismaUserRepository.updatePatient(request);
  }
}

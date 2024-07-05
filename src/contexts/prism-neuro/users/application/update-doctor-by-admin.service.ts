import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class UpdateDoctorService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(): Promise<void> {}
}

import { USER_ROLES } from '@prisma/client';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class DeleteUserService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(doctorId: string, role: USER_ROLES): Promise<void> {
    this.prismaUserRepository.deleteUserByAdmin(doctorId, role);
  }
}

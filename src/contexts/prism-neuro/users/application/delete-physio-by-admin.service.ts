import { USER_ROLES } from '@prisma/client';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class DeleteUserService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(userId: string, role: USER_ROLES): Promise<void> {
    await this.prismaUserRepository.deleteUserByAdmin(userId, role);
  }
}

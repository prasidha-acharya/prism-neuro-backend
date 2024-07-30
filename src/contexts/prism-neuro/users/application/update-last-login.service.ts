import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class UpdateLastLoginService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  async invoke(userId: string): Promise<void> {
    await this.prismaUserRepository.updateLastLogin(userId);
  }
}

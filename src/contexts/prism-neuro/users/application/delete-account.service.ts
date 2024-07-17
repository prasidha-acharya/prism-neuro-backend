import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class DeleteAccountService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  invoke(userId: string): Promise<void> {
    return this.prismaUserRepository.deleteAccount(userId);
  }
}

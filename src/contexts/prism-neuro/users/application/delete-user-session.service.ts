import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class DeleteUserSessionService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(sessionId: string): Promise<void> {
    await this.prismaUserRepository.removeSession(sessionId);
  }
}

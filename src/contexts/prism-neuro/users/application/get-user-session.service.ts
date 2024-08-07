import { LoginSession } from '@prisma/client';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class GetUserSessionService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(sessionId: string): Promise<LoginSession | null> {
    return this.prismaUserRepository.getSession(sessionId);
  }
}

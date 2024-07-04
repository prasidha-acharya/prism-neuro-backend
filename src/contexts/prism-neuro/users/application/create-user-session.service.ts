import { UserSession } from '@prisma/client';
import { CreateSession } from '../domain/interface/user-session.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class AddUserSessionService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(request: CreateSession): Promise<UserSession | null> {
    return this.prismaUserRepository.createSession(request);
  }
}

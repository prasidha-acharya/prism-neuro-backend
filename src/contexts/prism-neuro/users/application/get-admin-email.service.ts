import { User } from '@prisma/client';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';
export class GetAdminByEmailService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  invoke(email: string): Promise<User | null> {
    return this.prismaUserRepository.getAdminById(email);
  }
}

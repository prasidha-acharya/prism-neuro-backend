import { User } from '@prisma/client';
import { PrismaAdminRepository } from '../infrastructure/repositories/prisma-admin-repository';
export class GetAdminByEmailService {
  constructor(private prismaAdminRepository: PrismaAdminRepository) {}

  invoke(email: string): Promise<User | null> {
    return this.prismaAdminRepository.getAdminById(email);
  }
}

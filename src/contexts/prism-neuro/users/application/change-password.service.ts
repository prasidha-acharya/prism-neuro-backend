import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class ChangePasswordService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}
}

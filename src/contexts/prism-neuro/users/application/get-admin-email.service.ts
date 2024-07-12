import { User } from '@prisma/client';
import { IGetUserRequest } from '../domain/interface/user-request.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';
export class GetAdminByEmailService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  invoke(request: IGetUserRequest): Promise<User | null> {
    return this.prismaUserRepository.getUserByEmail(request);
  }
}

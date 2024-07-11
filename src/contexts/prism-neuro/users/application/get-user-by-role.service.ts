import { User } from '@prisma/client';
import { IGetUserByRoleRequest } from '../domain/interface/user-request.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class GetUserByRoleService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(request: IGetUserByRoleRequest): Promise<User | null> {
    return this.prismaUserRepository.getUserByRole(request);
  }
}

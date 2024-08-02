import { IGetUserByRoleRequest } from '../domain/interface/user-request.interface';
import { IPrismaUserDetailByEmailAndRole } from '../domain/interface/user.response.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class GetUserByRoleService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(request: IGetUserByRoleRequest): Promise<IPrismaUserDetailByEmailAndRole | null> {
    return this.prismaUserRepository.getUserByRole(request);
  }
}

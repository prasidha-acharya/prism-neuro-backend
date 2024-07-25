import { IGetUserRequest } from '../domain/interface/user-request.interface';
import { IPrismaGetUserByEmail } from '../domain/interface/user.response.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';
export class GetAdminByEmailService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  invoke(request: IGetUserRequest): Promise<IPrismaGetUserByEmail | null> {
    return this.prismaUserRepository.getUserByEmail(request);
  }
}

import { IGetTotalUsersRequest } from '../domain/interface/user-request.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class GetTotalUsersService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  invoke(request: IGetTotalUsersRequest): Promise<number> {
    return this.prismaUserRepository.getTotalUsers(request);
  }
}

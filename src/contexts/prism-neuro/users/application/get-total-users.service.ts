import { IGetTotalUsersRequest } from '../domain/interface/user-request.interface';
import { IGetTotalUsersResponse } from '../domain/interface/user.response.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class GetTotalUsersService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  invoke(request: IGetTotalUsersRequest): Promise<IGetTotalUsersResponse> {
    return this.prismaUserRepository.getTotalUsers(request);
  }
}

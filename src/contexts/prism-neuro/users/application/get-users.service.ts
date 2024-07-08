import { IFetchUsersRequest } from '../domain/interface/user-request.interface';
import { IPaginateResponse } from '../domain/interface/user.response.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class GetUsersService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  async invoke(request: IFetchUsersRequest): Promise<IPaginateResponse<any>> {
    return this.prismaUserRepository.getPaginatedUsers(request);
  }
}

import { IFetchUsersRequest } from '../domain/interface/user-request.interface';
import { IPaginateResponse, IPrismaUserResponse } from '../domain/interface/user.response.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class GetUsersService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  async invoke(request: IFetchUsersRequest): Promise<IPaginateResponse<IPrismaUserResponse[]>> {
    return this.prismaUserRepository.getPaginatedUsers(request);
  }
}

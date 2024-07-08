import { IChangePassword } from '../domain/interface/user-request.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class ChangePasswordService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  async invoke(request: IChangePassword): Promise<void> {
    await this.prismaUserRepository.changePassword(request);
  }
}

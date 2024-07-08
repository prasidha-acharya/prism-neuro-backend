import { IResetPassword } from '../domain/interface/user-request.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class ResetPasswordService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(request: IResetPassword): Promise<void> {
    return await this.prismaUserRepository.resetPassword(request);
  }
}

import { IFogotPasswordRequest } from '../domain/interface/user-request.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class ForgotPasswordService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(request: IFogotPasswordRequest, userId: string): Promise<void> {
    this.prismaUserRepository.createOTP(request, userId);
  }
}

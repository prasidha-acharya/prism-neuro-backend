import { OTP_TYPE } from '@prisma/client';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class DeleteOTPService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(userId: string, type: OTP_TYPE): Promise<void> {
    this.prismaUserRepository.deleteOTP(userId, type);
  }
}

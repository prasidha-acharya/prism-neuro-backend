import { OTP_TYPE } from '@prisma/client';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class DeleteOTPService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(otpId: string, type: OTP_TYPE): Promise<void> {
    this.prismaUserRepository.deleteOTP(otpId, type);
  }
}

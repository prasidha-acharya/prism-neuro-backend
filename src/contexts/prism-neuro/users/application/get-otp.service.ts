import { Otp } from '@prisma/client';
import { IFetchOtpRequest } from '../domain/interface/user-request.interface';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-users-repository';

export class GetOtpService {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(request: IFetchOtpRequest): Promise<Partial<Otp> | null> {
    return await this.prismaUserRepository.getOtp(request);
  }
}

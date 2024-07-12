import { IRegisterMailRequest } from '../domain/interface/mail-request.interface';
import { PrismaMailerRepository } from '../infrastructure/repositories/prisma-mail-repostory';
import { SendResetPasswordOtpTemplate } from '../infrastructure/template/reset-password.template';

export class SendResetOtpService {
  constructor(private prismaMailerRepository: PrismaMailerRepository) {}

  public async invoke(request: IRegisterMailRequest): Promise<void> {
    const subject = 'Reset Password';
    const html = SendResetPasswordOtpTemplate({ email: request.email, otp: request.otp });
    this.prismaMailerRepository.sendMail({ subject, to: request.email, html });
  }
}

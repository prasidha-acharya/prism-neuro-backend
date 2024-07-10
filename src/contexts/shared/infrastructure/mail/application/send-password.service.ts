import { ISendPasswordToUserRequest } from '../domain/interface/mail-request.interface';
import { PrismaMailerRepository } from '../infrastructure/repositories/prisma-mail-repostory';
import { SendPasswordToUserTemplate } from '../infrastructure/template/send-password.template';

export class SendPasswordToUserService {
  constructor(private prismaMailerRepository: PrismaMailerRepository) {}

  public async invoke(request: ISendPasswordToUserRequest): Promise<void> {
    const subject = 'Your Login Credentials';
    const html = SendPasswordToUserTemplate({ email: request.email, password: request.password });
    this.prismaMailerRepository.sendMail({ subject, to: request.email, html });
  }
}

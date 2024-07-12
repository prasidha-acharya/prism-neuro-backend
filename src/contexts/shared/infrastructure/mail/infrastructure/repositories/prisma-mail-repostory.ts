import nodemailer from 'nodemailer';
import { Configuration } from '../../../../../../../config/index';
import { ISendMailRequest } from '../../domain/interface/mail-request.interface';
import { IMailerRepository } from '../../domain/repositories/mail-repository';

export class PrismaMailerRepository implements IMailerRepository {
  private mailTransporter: nodemailer.Transporter;

  constructor(private config: Configuration) {
    this.mailTransporter = nodemailer.createTransport({
      host: this.config.MAIL.HOST,
      port: this.config.MAIL.PORT,
      auth: {
        user: this.config.MAIL.AUTH_USER,
        pass: this.config.MAIL.AUTH_PASS
      }
    });
  }

  async sendMail({ to, html, subject }: ISendMailRequest): Promise<void> {
    try {
      await this.mailTransporter.sendMail({
        from: `Prism Neuro ${this.config.MAIL.SENDER_ADDRESS}`,
        to,
        subject,
        html
      });
    } catch (e) {
      console.log(e);
    }
  }
}

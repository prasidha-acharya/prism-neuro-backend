import { ISendMailRequest } from '../interface/mail-request.interface';

export interface IMailerRepository {
  sendMail(request: ISendMailRequest): Promise<void>;
}

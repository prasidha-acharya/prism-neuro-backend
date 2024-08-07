import { OTP_TYPE } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { GetAdminByEmailService } from '../../../../../contexts/prism-neuro/users/application/get-admin-email.service';
import { GetOtpService } from '../../../../../contexts/prism-neuro/users/application/get-otp.service';
import { HTTP404Error, HTTP422Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class VerifyOtpController implements Controller {
  constructor(
    private getAdminByEmailService: GetAdminByEmailService,
    private getOtpService: GetOtpService
  ) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { otp, email } = req.body;

    try {
      const user = await this.getAdminByEmailService.invoke({ email });

      if (!user) {
        throw new HTTP404Error(MESSAGE_CODES.USER.USER_NOT_FOUND);
      }

      const otpReponse = await this.getOtpService.invoke({ userId: user.id, type: OTP_TYPE.RESET_PASSWORD, otp });

      if (!otpReponse || otpReponse.otpCode !== otp) {
        throw new HTTP422Error(MESSAGE_CODES.OTP.INVALID_OTP);
      }
      res.status(httpStatus.OK).json({
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}

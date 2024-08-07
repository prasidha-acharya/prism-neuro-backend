import { OTP_TYPE } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { GetAdminByEmailService } from '../../../../../contexts/prism-neuro/users/application/get-admin-email.service';
import { GetOtpService } from '../../../../../contexts/prism-neuro/users/application/get-otp.service';
import { HTTP404Error, HTTP422Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class VerifyOtpController implements Controller {
  constructor(
    private getAdminByEmailService: GetAdminByEmailService,
    private getOtpService: GetOtpService
  ) {}

  public validate = [
    body('email')
      .exists()
      .withMessage(MESSAGE_CODES.USER.REQUIRED_EMAIL)
      .isEmail()
      .withMessage(MESSAGE_CODES.USER.INVALID_EMAIL)
      .custom(async (email: string, { req }) => {
        const isUserExist = await this.getAdminByEmailService.invoke({ email });
        if (isUserExist) {
          req.body.userId = isUserExist.id;
        }
        throw new HTTP404Error(MESSAGE_CODES.USER.INVALID_EMAIL);
      }),
    body('otp').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_OTP).isLength({ min: 6 }).withMessage(MESSAGE_CODES.USER.MIN_OTP_LENGTH_5),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { otp, userId } = req.body;

    try {
      const otpReponse = await this.getOtpService.invoke({ userId, type: OTP_TYPE.RESET_PASSWORD, otp });

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

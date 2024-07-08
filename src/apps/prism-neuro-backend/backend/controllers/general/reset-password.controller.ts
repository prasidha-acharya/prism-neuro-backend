import { OTP_TYPE } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { DeleteOTPService } from '../../../../../contexts/prism-neuro/users/application/delete-otp.service';
import { GetAdminByEmailService } from '../../../../../contexts/prism-neuro/users/application/get-admin-email.service';
import { GetOtpService } from '../../../../../contexts/prism-neuro/users/application/get-otp.service';
import { ResetPasswordService } from '../../../../../contexts/prism-neuro/users/application/reset-password.service';
import { HTTP404Error, HTTP422Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { hashPassword } from '../../../../../contexts/shared/infrastructure/encryptor/encryptor';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class ResetPasswordController implements Controller {
  constructor(
    private getAdminByEmailService: GetAdminByEmailService,
    private resetPasswordService: ResetPasswordService,
    private getOtpService: GetOtpService,
    private deleteOTPService: DeleteOTPService
  ) {}

  public validate = [
    body('email')
      .exists()
      .withMessage(MESSAGE_CODES.USER.REQUIRED_EMAIL)
      .isEmail()
      .withMessage(MESSAGE_CODES.USER.INVALID_EMAIL)
      .custom(async (email: string) => {
        const isUserExist = await this.getAdminByEmailService.invoke(email);
        if (isUserExist) return true;
        throw new HTTP404Error(MESSAGE_CODES.USER.INVALID_EMAIL);
      }),
    body('otp').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_OTP).isLength({ min: 5 }).withMessage(MESSAGE_CODES.USER.MIN_OTP_LENGTH_5),
    body('password')
      .exists()
      .withMessage(MESSAGE_CODES.USER.REQUIRED_PASSWORD)
      .isLength({ min: 6 })
      .withMessage(MESSAGE_CODES.USER.PASSWORD_MIN_LENGTH),
    body('confirmPassword')
      .exists()
      .withMessage(MESSAGE_CODES.USER.REQUIRED_PASSWORD)
      .isLength({ min: 6 })
      .withMessage(MESSAGE_CODES.USER.PASSWORD_MIN_LENGTH)
      .custom(async (confirm_password: string, { req }) => {
        if (confirm_password === req.body.password) return true;
        throw new HTTP422Error(MESSAGE_CODES.USER.CONFIRM_PASSWORD_NOT_MATCH);
      })
      .withMessage(MESSAGE_CODES.USER.CONFIRM_PASSWORD_NOT_MATCH),
    RequestValidator
  ];

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, newPassword, otp } = req.body;

      const { userId } = req.body.user;

      const otpReponse = await this.getOtpService.invoke({ userId, type: OTP_TYPE.RESET_PASSWORD, otp });

      if (!otpReponse) throw new HTTP404Error(MESSAGE_CODES.USER.INVALID_OTP);

      await this.resetPasswordService.invoke({ email, data: { password: hashPassword(newPassword) } });

      await this.deleteOTPService.invoke(userId, otpReponse.type!);

      res.status(httpStatus.OK).send();
    } catch (error) {
      next(error);
    }
  }
}

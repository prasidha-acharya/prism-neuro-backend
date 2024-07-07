import { OTP_TYPE } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { ForgotPasswordService } from '../../../../../contexts/prism-neuro/users/application/forgot-password.service';
import { GetAdminByEmailService } from '../../../../../contexts/prism-neuro/users/application/get-admin-email.service';
import { expiresAfter15Days } from '../../../../../contexts/prism-neuro/users/domain/constant/create-admin';
import { HTTP404Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { generateOtp } from '../../../../../contexts/shared/infrastructure/utils/otp-generator';
import { Controller } from '../controller';

export class ForgotPasswordController implements Controller {
  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private getAdminByEmailService: GetAdminByEmailService
  ) {}

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      //create otp
      const { email } = req.body;

      const user = await this.getAdminByEmailService.invoke(email);

      if (!user) {
        throw new HTTP404Error(MESSAGE_CODES.USER.USER_NOT_FOUND);
      }

      const expiresAt = expiresAfter15Days;

      const otpCode = generateOtp();

      await this.forgotPasswordService.invoke({ otpCode, expiresAt, type: OTP_TYPE.RESET_PASSWORD }, user.id);

      //send otp to user
      res.status(httpStatus.OK).send();
    } catch (error) {
      next(error);
    }
  }
}

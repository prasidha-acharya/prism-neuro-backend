import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { ChangePasswordService } from '../../../../../contexts/prism-neuro/users/application/change-password.service';
import { GetAdminByEmailService } from '../../../../../contexts/prism-neuro/users/application/get-admin-email.service';
import { HTTP404Error, HTTP422Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { comparePassword, hashPassword } from '../../../../../contexts/shared/infrastructure/encryptor/encryptor';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { minPasswordLength } from '../../../../../contexts/shared/infrastructure/utils/constant';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class ChangePasswordController implements Controller {
  constructor(
    private changePasswordService: ChangePasswordService,

    private getAdminByEmailService: GetAdminByEmailService
  ) {}

  public validate = [
    body('oldPassword')
      .exists()
      .withMessage(MESSAGE_CODES.USER.REQUIRED_OLD_PASSWORD)
      .isLength({ min: minPasswordLength })
      .withMessage(MESSAGE_CODES.USER.PASSWORD_MIN_LENGTH),
    body('newPassword')
      .exists()
      .withMessage(MESSAGE_CODES.USER.REQUIRED_NEW_PASSWORD)
      .isLength({ min: minPasswordLength })
      .withMessage(MESSAGE_CODES.USER.PASSWORD_MIN_LENGTH),
    body('confirmPassword')
      .exists()
      .withMessage(MESSAGE_CODES.USER.REQUIRED_CONFIRMED_PASSWORD)
      .isLength({ min: minPasswordLength })
      .withMessage(MESSAGE_CODES.USER.PASSWORD_MIN_LENGTH)
      .custom(async (confirmPassword: string, { req }) => {
        if (confirmPassword === req.body.newPassword) return true;
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
      const { newPassword, oldPassword } = req.body;
      const { userId, email } = req.body.user;

      const user = await this.getAdminByEmailService.invoke({ email });
      if (!user) {
        throw new HTTP404Error(MESSAGE_CODES.USER.USER_NOT_FOUND);
      }

      // compare password
      const isPasswordMatch = comparePassword(oldPassword, user.password);

      if (!isPasswordMatch) {
        throw new HTTP422Error(MESSAGE_CODES.USER.INCORRECT_PASSWORD);
      }
      await this.changePasswordService.invoke({ data: { password: hashPassword(newPassword) }, userId });
      res.status(httpStatus.OK).json({ status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

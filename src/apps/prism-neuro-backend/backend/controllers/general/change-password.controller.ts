import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { ChangePasswordService } from '../../../../../contexts/prism-neuro/users/application/change-password.service';
import { hashPassword } from '../../../../../contexts/shared/infrastructure/encryptor/encryptor';
import { Controller } from '../controller';

export class ChangePasswordController implements Controller {
  constructor(private changePasswordService: ChangePasswordService) {}

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { newPassword } = req.body;
      const { userId } = req.body.user;
      await this.changePasswordService.invoke({ data: { password: hashPassword(newPassword) }, userId });
      res.status(httpStatus.OK).send();
    } catch (error) {
      next(error);
    }
  }
}

import { USER_ROLES } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { param } from 'express-validator';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { DeleteUserService } from '../../../../../../contexts/prism-neuro/users/application/delete-physio-by-admin.service';
import { RequestValidator } from '../../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../../controller';

export class DeletePhysioController implements Controller {
  constructor(private deleteUserService: DeleteUserService) {}

  public validate = [
    param('physioId').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_EMAIL).isEmail().withMessage(MESSAGE_CODES.USER.INVALID_EMAIL),
    RequestValidator
  ];

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { physioId } = req.params;
      await this.deleteUserService.invoke(physioId, USER_ROLES.PHYSIO);
      res.status(httpStatus.OK).json({ status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

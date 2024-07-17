import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { DeleteUserSessionService } from '../../../../../contexts/prism-neuro/users/application/delete-user-session.service';
import { GetUserSessionService } from '../../../../../contexts/prism-neuro/users/application/get-user-session.service';
import { HTTP401Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { Controller } from '../controller';

export class UserLogoutController implements Controller {
  constructor(
    private getUserSessionService: GetUserSessionService,
    private deleteUserSessionService: DeleteUserSessionService
  ) {}

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { sessionId } = req.body.user;
      const session = await this.getUserSessionService.invoke(sessionId);

      if (!session) {
        throw new HTTP401Error();
      }

      await this.deleteUserSessionService.invoke(sessionId);

      res.status(httpStatus.OK).json({ status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

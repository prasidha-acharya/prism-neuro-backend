import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { Controller } from '../controller';

export class LogoutController implements Controller {
  constructor() {} // private removeFCMTokenService: RemoveFCMTokenService // private getUserSessionService: GetUserSessionService, // private removeUserSessionService: RemoveUserSessionService,

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      //   const { sessionId } = req.body.user;
      //   const session = await this.getUserSessionService.invoke(session_id);

      //   if (!session) {
      //     throw new HTTP401Error();
      //   }
      //   await this.removeUserSessionService.invoke(session_id);

      //   if (session.device_token_id) {
      //     await this.removeFCMTokenService.removeByFcmId(session.device_token_id);
      //   }
      res.status(httpStatus.OK).send();
    } catch (error) {
      next(error);
    }
  }
}

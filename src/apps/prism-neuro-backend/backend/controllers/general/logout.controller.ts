import { USER_ROLES } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { EndModeSessionByPhsyioService } from '../../../../../contexts/prism-neuro/mode-session/application/end-session-by-physio.service';
import { DeleteUserSessionService } from '../../../../../contexts/prism-neuro/users/application/delete-user-session.service';
import { GetUserSessionService } from '../../../../../contexts/prism-neuro/users/application/get-user-session.service';
import { HTTP401Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { Controller } from '../controller';

export class UserLogoutController implements Controller {
  constructor(
    private getUserSessionService: GetUserSessionService,
    private deleteUserSessionService: DeleteUserSessionService,
    private endModeSessionByPhsyioService: EndModeSessionByPhsyioService
  ) {}

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { sessionId, userId, role } = req.body.user;

      const loginSession = await this.getUserSessionService.invoke(sessionId);

      if (!loginSession) {
        throw new HTTP401Error();
      }

      // End login session ;Only physio can end session

      if (role === USER_ROLES.PHYSIO) {
        await this.endModeSessionByPhsyioService.invoke(userId);
      }

      // End mode session
      await this.deleteUserSessionService.invoke(sessionId);

      res.status(httpStatus.OK).json({ status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

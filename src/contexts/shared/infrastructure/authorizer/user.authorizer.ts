import { RequestHandler as Middleware, NextFunction, Request, Response } from 'express';

import { USER_ROLES } from '@prisma/client';
import { Configuration } from 'config';
import jwt from 'jsonwebtoken';
import { GetUserSessionService } from '../../../../contexts/prism-neuro/users/application/get-user-session.service';
import { HTTP401Error } from '../../domain/errors/http.exception';
import { Payload, TokenScope } from '../../domain/interface/payload';
import { IAuthorizer } from '../../domain/model/authentication/authorizer';

export class JWTUserAuthorizer implements IAuthorizer<Request, Response, NextFunction> {
  constructor(
    private getUserSessionService: GetUserSessionService,
    private config: Configuration
  ) {}

  public authorize: Middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers;

    const tokenArray = authorization !== undefined ? authorization.split(' ') : [];
    const token = tokenArray[1];

    try {
      const validRoles = [USER_ROLES.ADMIN, USER_ROLES.PATIENT, USER_ROLES.PHYSIO];

      const payload: Payload = jwt.verify(token, this.config.JWT_SECRET!) as Payload;

      const userSession = await this.getUserSessionService.invoke(payload.sessionId);

      if (!userSession || userSession.userId !== payload.userId) {
        throw new HTTP401Error();
      }
      if (
        validRoles.includes(payload.role as any) &&
        (payload.scopes.includes(TokenScope.ADMIN_ACCESS) ||
          payload.scopes.includes(TokenScope.PATIENT_ACCESS) ||
          payload.scopes.includes(TokenScope.PHYSIO_ACCESS))
      ) {
        req.body.user = payload;
        return next();
      } else {
        return next(new HTTP401Error());
      }
    } catch (err: any) {
      return next(new HTTP401Error());
    }
  };

  public adminAndPhysioauthorize: Middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers;

    const tokenArray = authorization !== undefined ? authorization.split(' ') : [];
    const token = tokenArray[1];

    try {
      const validRoles = [USER_ROLES.ADMIN, USER_ROLES.PHYSIO];

      const payload: Payload = jwt.verify(token, this.config.JWT_SECRET!) as Payload;

      const userSession = await this.getUserSessionService.invoke(payload.sessionId);

      if (!userSession || userSession.userId !== payload.userId) {
        throw new HTTP401Error();
      }
      if (
        validRoles.includes(payload.role as any) &&
        (payload.scopes.includes(TokenScope.ADMIN_ACCESS) || payload.scopes.includes(TokenScope.PHYSIO_ACCESS))
      ) {
        req.body.user = payload;
        return next();
      } else {
        return next(new HTTP401Error());
      }
    } catch (err: any) {
      return next(new HTTP401Error());
    }
  };
}

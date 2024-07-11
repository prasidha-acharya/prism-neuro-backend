import { RequestHandler as Middleware, NextFunction, Request, Response } from 'express';

import { HTTP401Error } from '../../domain/errors/http.exception';
import { IAuthorizer } from '../../domain/model/authentication/authorizer';
// var jwt = require('jsonwebtoken');
import { USER_ROLES } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { GetUserSessionService } from '../../../../contexts/prism-neuro/users/application/get-user-session.service';
import { Payload, TokenScope } from '../../domain/interface/payload';

export class JWTDoctorAuthorizer implements IAuthorizer<Request, Response, NextFunction> {
  constructor(private getUserSessionService: GetUserSessionService) {}

  public authorize: Middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers;

    const tokenArray = authorization !== undefined ? authorization.split(' ') : [];
    const token = tokenArray[1];

    try {
      const payload: Payload = jwt.verify(token, process.env.JWT_SECRET_TOKEN!) as Payload;

      const userSession = await this.getUserSessionService.invoke(payload.sessionId);
      console.log(userSession?.userId, payload.userId);

      if (!userSession || userSession.userId !== payload.userId) {
        throw new HTTP401Error();
      }

      if (payload.role === USER_ROLES.PHYSIO && payload.scopes.includes(TokenScope.PHYSIO_ACCESS)) {
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

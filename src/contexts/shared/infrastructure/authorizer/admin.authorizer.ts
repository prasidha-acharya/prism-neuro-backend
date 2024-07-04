import { RequestHandler as Middleware, NextFunction, Request, Response } from 'express';

import { HTTP401Error } from '../../domain/errors/http.exception';
import { IAuthorizer } from '../../domain/model/authentication/authorizer';
// var jwt = require('jsonwebtoken');
import { UserRoles } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Payload, TokenScope } from '../../domain/interface/payload';

export class JWTAdminAuthorizer implements IAuthorizer<Request, Response, NextFunction> {
  constructor() {}

  public authorize: Middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers;

    const tokenArray = authorization !== undefined ? authorization.split(' ') : [];
    const token = tokenArray[1];

    try {
      const payload: Payload = jwt.verify(token, process.env.JWT_SECRET_TOKEN!) as Payload;

      //   const userSession = await this.getUserSessionService.invoke(payload.session_id);

      //   if (!userSession || userSession.user_id !== payload.user_id) {
      //     throw new HTTP401Error();
      //   }

      if (payload.role === UserRoles.ADMIN && payload.scope.includes(TokenScope.ADMIN_ACCESS)) {
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

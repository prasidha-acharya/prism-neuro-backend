import { RequestHandler as Middleware, NextFunction, Request, Response } from 'express';

import { Configuration } from 'config';
import jwt from 'jsonwebtoken';
import { GetUserSessionService } from 'src/contexts/prism-neuro/users/application/get-user-session.service';
import { HTTP401Error } from '../../domain/errors/http.exception';
import { Payload, TokenScope } from '../../domain/interface/payload';
import { IAuthorizer } from '../../domain/model/authentication/authorizer';

export class RefreshAuthorizer implements IAuthorizer<Request, Response, NextFunction> {
  constructor(
    private getUserSessionService: GetUserSessionService,
    private config: Configuration
  ) {}

  public authorize: Middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers;

    const tokenArray = authorization !== undefined ? authorization.split(' ') : [];
    const token = tokenArray[1];
    console.log(token, 'token');
    console.log(this.config.JWT_SECRET);
    try {
      console.log('first');
      const payload: Payload = jwt.verify(token, this.config.JWT_SECRET) as Payload;
      console.log('second');

      console.log('🚀 ~ RefreshAuthorizer ~ authorize:Middleware= ~ payload:', payload);
      const userSession = await this.getUserSessionService.invoke(payload.sessionId);

      if (!userSession || userSession.userId !== payload.userId) {
        throw new HTTP401Error();
      }
      if (payload.scopes.includes(TokenScope.REFRESH)) {
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

import { NextFunction, Request, Response } from 'express';

import { UserRoles } from '@prisma/client';
import { Configuration } from 'config';
import httpStatus from 'http-status';
import { HTTP400Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { Payload, TokenScope } from '../../../../../contexts/shared/domain/interface/payload';
import { JWTSign } from '../../../../../contexts/shared/infrastructure/authorizer/jwt-token';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class GenerateAccessTokenController implements Controller {
  constructor(private config: Configuration) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, role, user_id, session_id } = req.body.user;

      let scopes: TokenScope[] = [];

      if (role === UserRoles.ADMIN) {
        scopes = [TokenScope.ADMIN_ACCESS];
      } else if (role === UserRoles.PHYSIO) {
        scopes = [TokenScope.PHYSIO_ACCESS];
      } else {
        throw new HTTP400Error(MESSAGE_CODES.USER.INVALID_REFRESH_TOKEN);
      }

      const payload: Payload = { user_id, email, role, session_id, scopes };
      const jwtToken = JWTSign(
        payload,
        this.config.JWT_SECRET,
        {
          expiresIn: this.config.JWT_EXPIRY
        },
        {
          expiresIn: this.config.JWT_REFRESH_EXPIRY
        }
      );
      res.status(httpStatus.OK).send({
        data: {
          token: jwtToken
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

import { NextFunction, Request, Response } from 'express';

import { USER_ROLES } from '@prisma/client';
import { Configuration } from 'config';
import httpStatus from 'http-status';
import { Payload, TokenScope } from '../../../../../contexts/shared/domain/interface/payload';
import { JWTSign } from '../../../../../contexts/shared/infrastructure/authorizer/jwt-token';
import { Controller } from '../controller';

export class GenerateAccessTokenController implements Controller {
  constructor(private config: Configuration) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, role, userId, sessionId } = req.body.user;

      let scopes: TokenScope[] = [];

      if (role === USER_ROLES.ADMIN) {
        scopes = [TokenScope.ADMIN_ACCESS];
      } else if (role === USER_ROLES.PHYSIO) {
        scopes = [TokenScope.PHYSIO_ACCESS];
      } else {
        scopes = [TokenScope.PATIENT_ACCESS];
      }

      const payload: Payload = { userId: userId, email, role, sessionId: sessionId, scopes };
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
      res.status(httpStatus.OK).json({
        data: {
          token: jwtToken
        },
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}

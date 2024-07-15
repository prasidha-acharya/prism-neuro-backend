import { USER_ROLES } from '@prisma/client';
import { Configuration } from 'config';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { AddUserSessionService } from 'src/contexts/prism-neuro/users/application/create-user-session.service';
import { IClientLoginRequest } from 'src/contexts/prism-neuro/users/domain/interface/user-client-request.interface';
import { UserTransformer } from 'src/contexts/prism-neuro/users/domain/transformer/user-transformer';
import { GetAdminByEmailService } from '../../../../../../contexts/prism-neuro/users/application/get-admin-email.service';
import { Payload, TokenScope } from '../../../../../../contexts/shared/domain/interface/payload';
import { JWTSign } from '../../../../../../contexts/shared/infrastructure/authorizer/jwt-token';
import { comparePassword } from '../../../../../../contexts/shared/infrastructure/encryptor/encryptor';
import { RequestValidator } from '../../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../../controller';

export class LoginPhysioController implements Controller {
  constructor(
    private getAdminByEmailService: GetAdminByEmailService,
    private config: Configuration,
    private addUserSessionService: AddUserSessionService,
    private userTransformer: UserTransformer
  ) {}

  public validate = [
    body('email').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_EMAIL).isEmail().withMessage(MESSAGE_CODES.USER.INVALID_EMAIL),
    RequestValidator
  ];

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password }: IClientLoginRequest = req.body;

      const user = await this.getAdminByEmailService.invoke({ email, role: USER_ROLES.PHYSIO });

      if (!user || (user && !comparePassword(password, user.password!))) {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: MESSAGE_CODES.USER.INVALID_CREDENTIALS });
        return;
      }

      const sessionResponse = await this.addUserSessionService.invoke({ userId: user.id });

      if (!sessionResponse) {
        throw new Error('');
      }

      const payload: Payload = {
        userId: user.id!,
        email: user.email!,
        sessionId: sessionResponse.id,
        role: user.role,
        scopes: [TokenScope.PHYSIO_ACCESS]
      };

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

      const userDetail = this.userTransformer.loginLists(user);

      res.status(httpStatus.OK).send({
        data: {
          token: jwtToken,
          userDetail
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

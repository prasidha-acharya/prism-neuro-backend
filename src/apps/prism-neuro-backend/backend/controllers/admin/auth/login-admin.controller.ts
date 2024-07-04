import { Configuration } from 'config';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { GetAdminByEmailService } from '../../../../../../contexts/prism-neuro/users/application/get-admin-email.service';
import { Payload, TokenScope } from '../../../../../../contexts/shared/domain/interface/payload';
import { JWTSign } from '../../../../../../contexts/shared/infrastructure/authorizer/jwt-token';
import { comparePassword } from '../../../../../../contexts/shared/infrastructure/encryptor/encryptor';
import { RequestValidator } from '../../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../../controller';

export class LoginAdminController implements Controller {
  constructor(
    private getAdminByEmailService: GetAdminByEmailService,
    private config: Configuration
  ) {}

  public validate = [
    body('email').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_EMAIL).isEmail().withMessage(MESSAGE_CODES.USER.INVALID_EMAIL),
    body('password')
      .exists()
      .withMessage(MESSAGE_CODES.USER.REQUIRED_PASSWORD)
      .isLength({ min: 6 })
      .withMessage(MESSAGE_CODES.USER.PASSWORD_MIN_LENGTH),
    body('token').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_FCM_TOKEN),
    body('device_type').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_DEVICE_TYPE),
    RequestValidator
  ];

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await this.getAdminByEmailService.invoke(email);

      if (!user || (user && !comparePassword(password, user.password!))) {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: MESSAGE_CODES.USER.INVALID_CREDENTIALS });
        return;
      }

      const payload: Payload = {
        user_id: user.id!,
        email: user.email!,
        role: user.role,
        scope: [TokenScope.ADMIN_ACCESS]
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
      res.status(httpStatus.OK).send({
        data: {
          token: jwtToken,
          user_detail: user
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

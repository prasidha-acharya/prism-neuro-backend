import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { UpdatePhysioService } from '../../../../../../contexts/prism-neuro/users/application/update-physio-by-admin.service';
import { IClientUpdatePhysioRequest } from '../../../../../../contexts/prism-neuro/users/domain/interface/user-client-request.interface';
import { IUpdatePhysioTherapistRequest } from '../../../../../../contexts/prism-neuro/users/domain/interface/user-request.interface';
import { HTTP400Error } from '../../../../../../contexts/shared/domain/errors/http.exception';
import { RequestValidator } from '../../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../../controller';

export class UpdateAdminProfileController implements Controller {
  constructor(private updatePhysioService: UpdatePhysioService) {}

  public validate = [
    body('firstName').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_FIRST_NAME),
    body('lastName').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_LAST_NAME),
    body('phoneCode')
      .custom((val, { req }) => {
        if (val && !req?.body.phoneNumber) {
          throw new HTTP400Error(MESSAGE_CODES.USER.REQUIRED_PHONE_NUMBER);
        }
        return true;
      })
      .optional(),
    body('phoneNumber')
      .isNumeric()
      .withMessage(MESSAGE_CODES.USER.INVALID_CONTACT_NUMBER)
      .custom((val, { req }) => {
        if (val && !req?.body.phoneCode) {
          throw new HTTP400Error(MESSAGE_CODES.USER.REQUIRED_PHONE_CODE);
        }
        return true;
      })
      .optional(),
    body('address.*.address').notEmpty().withMessage(MESSAGE_CODES.USER.ADDRESS.REQUIRED_ADDRESS_NAME),
    body('address.*.id').notEmpty().withMessage(MESSAGE_CODES.USER.ADDRESS.REQUIRED_ADDRESS_ID),
    RequestValidator
  ];

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const adminId: string = req.body.user.userId;
      const { address, firstName, lastName, phoneCode, phoneNumber, profileURL }: IClientUpdatePhysioRequest = req.body;

      let admin: IUpdatePhysioTherapistRequest = {
        id: adminId
      };

      if (address) {
        admin = { ...admin, address };
      }

      if (firstName) {
        admin = { ...admin, data: { ...(admin?.data ?? {}), firstName } };
      }

      if (lastName) {
        admin = { ...admin, data: { ...(admin?.data ?? {}), lastName } };
      }

      if (phoneCode && phoneNumber) {
        admin.userDetail = { phoneNumber, phoneCode };
      }

      if (profileURL) {
        admin.userDetail = {
          ...(admin.userDetail ?? {}),
          profileURL
        };
      }

      const response = await this.updatePhysioService.invoke(admin);

      res.status(httpStatus.OK).json({
        data: response,
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}

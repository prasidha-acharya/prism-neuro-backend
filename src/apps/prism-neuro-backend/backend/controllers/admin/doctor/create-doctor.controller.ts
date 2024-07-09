import { USER_ROLES } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { CreateDoctorByAdminService } from '../../../../../../contexts/prism-neuro/users/application/create-doctor-by-admin.service';
import { hashPassword } from '../../../../../../contexts/shared/infrastructure/encryptor/encryptor';
import { RequestValidator } from '../../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../../controller';

export class CreateDoctorController implements Controller {
  constructor(private createDoctorByAdminService: CreateDoctorByAdminService) {}

  public validate = [
    body('email').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_EMAIL).isEmail().withMessage(MESSAGE_CODES.USER.INVALID_EMAIL),
    body('password')
      .exists()
      .withMessage(MESSAGE_CODES.USER.REQUIRED_PASSWORD)
      .isLength({ min: 6 })
      .withMessage(MESSAGE_CODES.USER.PASSWORD_MIN_LENGTH),
    body('userName').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_NAME).isString().withMessage(MESSAGE_CODES.USER.INVALID_FCM_TOKEN),
    body('firstName').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_FIRST_NAME),
    body('lastName').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_LAST_NAME),
    body('address').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_ADDRESS).isString().withMessage(MESSAGE_CODES.USER.INVALID_ADDRESS),
    RequestValidator
  ];

  public async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    const { firstName, lastName, email, password, address, userName } = req.body;
    try {
      await this.createDoctorByAdminService.invoke({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashPassword(password),
        address,
        role: USER_ROLES.PHYSIO,
        userName
      });
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      next(error);
    }
  }
}

import { USER_ROLES } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { CreateDoctorByAdminService } from '../../../../../../contexts/prism-neuro/users/application/create-doctor-by-admin.service';
import { generatePassword, hashPassword } from '../../../../../../contexts/shared/infrastructure/encryptor/encryptor';
import { SendPasswordToUserService } from '../../../../../../contexts/shared/infrastructure/mail/application/send-password.service';
import { RequestValidator } from '../../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../../controller';

export class CreateDoctorController implements Controller {
  constructor(
    private createDoctorByAdminService: CreateDoctorByAdminService,
    private sendPasswordToUserService: SendPasswordToUserService
  ) {}

  public validate = [
    body('email').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_EMAIL).isEmail().withMessage(MESSAGE_CODES.USER.INVALID_EMAIL),
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
    const { firstName, lastName, email, address } = req.body;

    const password = generatePassword();

    try {
      await this.createDoctorByAdminService.invoke({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashPassword(password),
        address,
        role: USER_ROLES.PHYSIO
      });
      await this.sendPasswordToUserService.invoke({ email, password });

      res.status(httpStatus.CREATED).send();
    } catch (error) {
      next(error);
    }
  }
}

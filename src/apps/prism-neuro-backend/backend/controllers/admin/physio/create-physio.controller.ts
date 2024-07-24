import { USER_ROLES } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { CreatePhysioByAdminService } from '../../../../../../contexts/prism-neuro/users/application/create-doctor-by-admin.service';
import { IClientCreatePhysioRequest } from '../../../../../../contexts/prism-neuro/users/domain/interface/user-client-request.interface';
import { ICreatePhysioTherapistRequest } from '../../../../../../contexts/prism-neuro/users/domain/interface/user-request.interface';
import { HTTP400Error } from '../../../../../../contexts/shared/domain/errors/http.exception';
import { generatePassword, hashPassword } from '../../../../../../contexts/shared/infrastructure/encryptor/encryptor';
import { SendPasswordToUserService } from '../../../../../../contexts/shared/infrastructure/mail/application/send-password.service';
import { RequestValidator } from '../../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../../controller';

export class CreatePhysioController implements Controller {
  constructor(
    private createPhysioByAdminService: CreatePhysioByAdminService,
    private sendPasswordToUserService: SendPasswordToUserService
  ) {}

  public validate = [
    body('physioTherapist.email').isEmail().withMessage(MESSAGE_CODES.USER.REQUIRED_EMAIL),
    body('physioTherapist.firstName')
      .exists()
      .withMessage(MESSAGE_CODES.USER.REQUIRED_FIRST_NAME)
      .isString()
      .withMessage(MESSAGE_CODES.USER.INVALID_FIRST_NAME),
    body('physioTherapist.lastName')
      .exists()
      .withMessage(MESSAGE_CODES.USER.REQUIRED_LAST_NAME)
      .isString()
      .withMessage(MESSAGE_CODES.USER.INVALID_LAST_NAME),
    body('physioTherapist.phoneCode')
      .custom((val, { req }) => {
        console.log(val);
        if (val && !req?.body.physioTherapist.phoneNumber) {
          throw new HTTP400Error(MESSAGE_CODES.USER.REQUIRED_PHONE_NUMBER);
        }
        return true;
      })
      .optional(),
    body('physioTherapist.phoneNumber')
      .isNumeric()
      .withMessage(MESSAGE_CODES.USER.INVALID_CONTACT_NUMBER)
      .custom((val, { req }) => {
        console.log(val);
        if (val && !req?.body.physioTherapist.phoneCode) {
          throw new HTTP400Error(MESSAGE_CODES.USER.REQUIRED_PHONE_CODE);
        }
        return true;
      })
      .optional(),
    body('physioTherapist.address').isArray().withMessage(MESSAGE_CODES.USER.REQUIRED_ADDRESS),
    body('physioTherapist.address.*.address').isString().withMessage(MESSAGE_CODES.USER.ADDRESS.REQUIRED_ADDRESS_NAME),
    RequestValidator
  ];

  public parse(req: Request, res: Response, next: NextFunction): void {
    const physioTherapist = JSON.parse(req.body.physioTherapist);
    req.body.physioTherapist = { ...physioTherapist };
    next();
  }

  public async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    const { firstName, lastName, email, address, phoneCode, phoneNumber }: IClientCreatePhysioRequest = req.body.physioTherapist;

    const password = generatePassword();

    let physioData: ICreatePhysioTherapistRequest = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashPassword(password),
      address,
      role: USER_ROLES.PHYSIO
    };

    if (phoneCode && phoneNumber) {
      physioData = { ...physioData, userDetail: { phoneNumber, phoneCode } };
    }

    try {
      await this.createPhysioByAdminService.invoke(physioData);

      await this.sendPasswordToUserService.invoke({ email, password });

      res.status(httpStatus.CREATED).json({
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}

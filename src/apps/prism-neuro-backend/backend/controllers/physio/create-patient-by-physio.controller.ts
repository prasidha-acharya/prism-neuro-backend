import { USER_ROLES } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { CreatePatientByPhysioService } from '../../../../../contexts/prism-neuro/users/application/create-patient-by-physio.service';
import { ICreatePhysioDetail, ICreateUser } from '../../../../../contexts/prism-neuro/users/domain/interface/user-request.interface';
import { HTTP422Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { generatePassword, hashPassword } from '../../../../../contexts/shared/infrastructure/encryptor/encryptor';
import { SendPasswordToUserService } from '../../../../../contexts/shared/infrastructure/mail/application/send-password.service';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class CreatePatientByPhysioController implements Controller {
  constructor(
    private createPatientByPhysioService: CreatePatientByPhysioService,
    private sendPasswordToUserService: SendPasswordToUserService
  ) {}

  public validate = [
    body('email').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_EMAIL).isEmail().withMessage(MESSAGE_CODES.USER.INVALID_EMAIL),
    body('firstName').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_FIRST_NAME).isString().withMessage(MESSAGE_CODES.USER.INVALID_FIRST_NAME),
    body('lastName').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_LAST_NAME).isString().withMessage(MESSAGE_CODES.USER.INVALID_LAST_NAME),
    body('address')
      .isArray()
      .withMessage(MESSAGE_CODES.USER.REQUIRED_ADDRESS)
      .custom(value => {
        if (value.length === 0) {
          throw new HTTP422Error(MESSAGE_CODES.USER.REQUIRED_ADDRESS);
        }
        return true;
      }),
    body('address.*.address').notEmpty().withMessage(MESSAGE_CODES.USER.ADDRESS.REQUIRED_ADDRESS_NAME),
    body('phoneNumber').optional().isMobilePhone('any').withMessage(MESSAGE_CODES.USER.INVALID_CONTACT_NUMBER),
    body('phoneCode').optional(),
    body('age').optional().isNumeric().withMessage(MESSAGE_CODES.USER.AGE_SHOULD_BE_NUMBER),
    body('weight').optional().isNumeric().withMessage(MESSAGE_CODES.USER.WEIGHT_SHOULD_BE_NUMBER),
    body('profileURL').optional().isString().withMessage(MESSAGE_CODES.USER.PROFILE_URL_MUST_BE_STRING),

    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { address, firstName, lastName, email, age, weight, phoneCode, phoneNumber, userName, profileURL } = req.body;

    const { userId } = req.body.user;

    const password = generatePassword();

    const data: ICreateUser = {
      email: email.toLowerCase(),
      firstName,
      lastName,
      password: hashPassword(password),
      role: USER_ROLES.PATIENT,
      createdBy: userId
    };

    let detail: ICreatePhysioDetail | undefined;

    if (age) {
      detail = { ...(detail ?? {}), age };
    }

    if (weight) {
      detail = { ...(detail ?? {}), weight };
    }

    if (phoneCode) {
      detail = { ...(detail ?? {}), phoneCode };
    }

    if (phoneNumber) {
      detail = { ...(detail ?? {}), phoneNumber };
    }

    if (profileURL) {
      detail = { ...(detail ?? {}), profileURL };
    }

    if (userName) {
      data.userName = userName;
    }

    try {
      await this.createPatientByPhysioService.invoke({ data, address, detail });
      //send password  to the patient
      await this.sendPasswordToUserService.invoke({ email, password });
      res.status(httpStatus.CREATED).json({ status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

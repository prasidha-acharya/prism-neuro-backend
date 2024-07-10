import { USER_ROLES } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { CreatePatientByPhysioService } from '../../../../../contexts/prism-neuro/users/application/create-patient-by-physio.service';
import { ICreatePhysioDetail, ICreateUser } from '../../../../../contexts/prism-neuro/users/domain/interface/user-request.interface';
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
    body('address').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_ADDRESS),
    body('phoneCode').optional(),
    body('phoneNumber').optional(),
    body('age').optional().isNumeric().withMessage(MESSAGE_CODES.USER.AGE_SHOULD_BE_NUMBER),
    body('weight').optional().isNumeric().withMessage(MESSAGE_CODES.USER.WEIGHT_SHOULD_BE_NUMBER),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { address, firstName, lastName, email, age, weight } = req.body;

    const password = generatePassword();

    console.log('🚀 ~ CreatePatientByPhysioController ~ invoke ~ password:', password);

    const data: ICreateUser = {
      email,
      firstName,
      lastName,
      password: hashPassword(password),
      role: USER_ROLES.PATIENT
    };

    let detail: ICreatePhysioDetail | {} = {};

    if (age) {
      detail = { ...detail, age };
    }

    if (weight) {
      detail = { ...detail, weight };
    }

    try {
      await this.createPatientByPhysioService.invoke({ data, address, detail });
      //send password  to the patient
      await this.sendPasswordToUserService.invoke({ email, password });
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      next(error);
    }
  }
}

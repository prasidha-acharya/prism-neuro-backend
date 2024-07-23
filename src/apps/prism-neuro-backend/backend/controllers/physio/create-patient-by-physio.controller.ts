import { USER_ROLES } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import multer from 'multer';
import { CreatePatientByPhysioService } from '../../../../../contexts/prism-neuro/users/application/create-patient-by-physio.service';
import { ICreatePhysioDetail, ICreateUser } from '../../../../../contexts/prism-neuro/users/domain/interface/user-request.interface';
import { generatePassword, hashPassword } from '../../../../../contexts/shared/infrastructure/encryptor/encryptor';
import { SendPasswordToUserService } from '../../../../../contexts/shared/infrastructure/mail/application/send-password.service';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

const imageUpload = multer({});

export class CreatePatientByPhysioController implements Controller {
  constructor(
    private createPatientByPhysioService: CreatePatientByPhysioService,
    private sendPasswordToUserService: SendPasswordToUserService
  ) {}

  public upload = imageUpload.single('file');

  public validate = [
    body('patient.email').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_EMAIL).isEmail().withMessage(MESSAGE_CODES.USER.INVALID_EMAIL),
    body('patient.firstName')
      .exists()
      .withMessage(MESSAGE_CODES.USER.REQUIRED_FIRST_NAME)
      .isString()
      .withMessage(MESSAGE_CODES.USER.INVALID_FIRST_NAME),
    body('patient.lastName').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_LAST_NAME).isString().withMessage(MESSAGE_CODES.USER.INVALID_LAST_NAME),
    body('patient.address.*.address').notEmpty().withMessage(MESSAGE_CODES.USER.ADDRESS.REQUIRED_ADDRESS_NAME),
    body('patient.phoneNumber').optional(),
    body('patient.age').optional().isNumeric().withMessage(MESSAGE_CODES.USER.AGE_SHOULD_BE_NUMBER),
    body('patient.weight').optional().isNumeric().withMessage(MESSAGE_CODES.USER.WEIGHT_SHOULD_BE_NUMBER),
    RequestValidator
  ];

  public parse(req: Request, _: Response, next: NextFunction): void {
    const patient = JSON.parse(req.body.patient);
    req.body.patient = { ...patient };
    next();
  }

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { address, firstName, lastName, email, age, weight, phoneCode, phoneNumber } = req.body.patient;

    const { userId } = req.body.user;

    // image upload service

    const password = generatePassword();

    const data: ICreateUser = {
      email: email.toLowerCase(),
      firstName,
      lastName,
      password: hashPassword(password),
      role: USER_ROLES.PATIENT,
      createdBy: userId
    };

    let profileURL: string | undefined;

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

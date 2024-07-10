import { USER_ROLES } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ICreatePhysioDetail, ICreateUser } from 'src/contexts/prism-neuro/users/domain/interface/user-request.interface';
import { SendPasswordToUserService } from 'src/contexts/shared/infrastructure/mail/application/send-password.service';
import { CreatePatientByPhysioService } from '../../../../../contexts/prism-neuro/users/application/create-patient-by-physio.service';
import { generatePassword, hashPassword } from '../../../../../contexts/shared/infrastructure/encryptor/encryptor';
import { Controller } from '../controller';

export class CreatePatientByPhysioController implements Controller {
  constructor(
    private createPatientByPhysioService: CreatePatientByPhysioService,
    private sendPasswordToUserService: SendPasswordToUserService
  ) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { address, firstName, lastName, email, age, weight } = req.body;

    const password = generatePassword();

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

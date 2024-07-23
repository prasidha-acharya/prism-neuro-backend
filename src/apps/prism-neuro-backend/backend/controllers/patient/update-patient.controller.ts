import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { UpdatePatientService } from '../../../../../contexts/prism-neuro/users/application/update-patient-by-physio.service';
import { IUpdatePatientReq } from '../../../../../contexts/prism-neuro/users/domain/interface/user-request.interface';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class UpdatePatientProfileController implements Controller {
  constructor(private updatePatientService: UpdatePatientService) {}

  public validate = [
    body('patient.firstName').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_FIRST_NAME),
    body('patient.lastName').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_LAST_NAME),
    body('patient.address.*.address').notEmpty().withMessage(MESSAGE_CODES.USER.ADDRESS.REQUIRED_ADDRESS_NAME),
    body('patient.address.*.id').notEmpty().withMessage(MESSAGE_CODES.USER.ADDRESS.REQUIRED_ADDRESS_ID),
    body('patient.phoneCode').optional(),
    body('patient.phoneNumber').optional(),
    body('patient.age').optional().isNumeric().withMessage(MESSAGE_CODES.USER.AGE_SHOULD_BE_NUMBER),
    body('patient.weight').optional().isNumeric().withMessage(MESSAGE_CODES.USER.WEIGHT_SHOULD_BE_NUMBER),
    RequestValidator
  ];

  public parse(req: Request, res: Response, next: NextFunction): void {
    if (!req.body.patient || Object.values(req.body.patient).length === 0) {
      res.status(httpStatus.BAD_REQUEST).json({
        status: 'ERROR',
        message: 'At least one field should be required.'
      });
      return;
    }
    const patient = JSON.parse(req.body.patient);
    req.body.patient = { ...patient, address: JSON.parse(patient.address) };
    next();
  }

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { firstName, lastName, age, weight, phoneCode, phoneNumber, address } = req.body.patient;

    const userId = req.body.user.userId;

    // TODO: profile URL

    let request: IUpdatePatientReq = {
      id: userId
    };

    if (firstName) {
      request = { ...request, data: { ...(request.data ?? {}), firstName } };
    }

    if (lastName) {
      request = { ...request, data: { ...(request.data ?? {}), lastName } };
    }

    if (age) {
      request = {
        ...request,
        userDetail: {
          ...(request.userDetail ?? {}),
          age
        }
      };
    }

    if (weight) {
      request = {
        ...request,
        userDetail: {
          ...(request.userDetail ?? {}),
          weight
        }
      };
    }

    if (phoneNumber) {
      request = {
        ...request,
        userDetail: {
          ...(request.userDetail ?? {}),
          phoneNumber
        }
      };
    }

    if (phoneCode) {
      request = {
        ...request,
        userDetail: {
          ...(request.userDetail ?? {}),
          phoneCode
        }
      };
    }

    if (address.length > 0) {
      request = {
        ...request,
        addresses: address
      };
    }

    try {
      await this.updatePatientService.invoke(request);

      res.status(httpStatus.OK).json({ status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

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
    body('firstName').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_FIRST_NAME),
    body('lastName').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_LAST_NAME),
    body('address.*.address').notEmpty().withMessage(MESSAGE_CODES.USER.ADDRESS.REQUIRED_ADDRESS_NAME),
    body('address.*.id').notEmpty().withMessage(MESSAGE_CODES.USER.ADDRESS.REQUIRED_ADDRESS_ID),
    body('phoneCode').optional(),
    body('phoneNumber').optional(),
    body('age').optional().isNumeric().withMessage(MESSAGE_CODES.USER.AGE_SHOULD_BE_NUMBER),
    body('weight').optional().isNumeric().withMessage(MESSAGE_CODES.USER.WEIGHT_SHOULD_BE_NUMBER),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { firstName, lastName, age, weight, phoneCode, phoneNumber, address, profileURL } = req.body;

    const userId = req.body.user.userId;

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

    if (profileURL) {
      request = {
        ...request,
        userDetail: {
          ...(request.userDetail ?? {}),
          profileURL
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

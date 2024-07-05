import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { UpdateDoctorService } from 'src/contexts/prism-neuro/users/application/update-doctor-by-admin.service';
import { RequestValidator } from '../../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../../controller';

export class UpdateDoctorController implements Controller {
  constructor(private updateDoctorService: UpdateDoctorService) {}

  public validate = [
    body('email').optional().isEmail().withMessage(MESSAGE_CODES.USER.INVALID_EMAIL),
    body('password').optional().isLength({ min: 6 }).withMessage(MESSAGE_CODES.USER.PASSWORD_MIN_LENGTH),
    body('userName').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_FCM_TOKEN),
    body('firstName').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_FIRST_NAME),
    body('lastName').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_LAST_NAME),
    body('address').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_ADDRESS),
    RequestValidator
  ];

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const request = req.body;
      const doctor = await this.updateDoctorService.invoke({ ...request });
      res.status(httpStatus.OK).send({
        data: {
          doctor
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

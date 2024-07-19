import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { UpdatePhysioService } from '../../../../../../contexts/prism-neuro/users/application/update-doctor-by-admin.service';
import { IClientUpdatePhysioRequest } from '../../../../../../contexts/prism-neuro/users/domain/interface/user-client-request.interface';
import { IUpdatePhysioTherapistRequest } from '../../../../../../contexts/prism-neuro/users/domain/interface/user-request.interface';
import { HTTP400Error } from '../../../../../../contexts/shared/domain/errors/http.exception';
import { RequestValidator } from '../../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../../controller';

export class UpdatePhysioController implements Controller {
  constructor(private updatePhysioService: UpdatePhysioService) {}

  public validate = [
    body('physioTherapist.email').optional().isEmail().withMessage(MESSAGE_CODES.USER.INVALID_EMAIL),
    body('physioTherapist.password').optional().isLength({ min: 6 }).withMessage(MESSAGE_CODES.USER.PASSWORD_MIN_LENGTH),
    body('physioTherapist.firstName').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_FIRST_NAME),
    body('physioTherapist.lastName').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_LAST_NAME),
    body('physioTherapist.address').optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_ADDRESS),
    body('physioTherapist.physioId').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_PHYSIO_ID),
    RequestValidator
  ];

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      // const physioId: string = req.body.physioId;
      const { address, firstName, lastName, phoneCode, phoneNumber, physioId }: IClientUpdatePhysioRequest = JSON.parse(req.body.physioTherapist);

      let physioData: IUpdatePhysioTherapistRequest = {
        id: physioId
      };

      if (address) {
        physioData = { ...physioData, address };
      }

      if (firstName) {
        physioData = { ...physioData, data: { ...(physioData?.data ?? {}), firstName } };
      }

      if (lastName) {
        physioData = { ...physioData, data: { ...(physioData?.data ?? {}), lastName } };
      }

      if (phoneCode && phoneNumber) {
        physioData.userDetail = { phoneNumber, phoneCode };
      }

      if (!physioId) {
        throw new HTTP400Error(MESSAGE_CODES.USER.REQUIRED_PHYSIO_ID);
      }
      const physio = await this.updatePhysioService.invoke(physioData);
      res.status(httpStatus.OK).json({
        data: physio,
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { IUpdatePatientReq } from 'src/contexts/prism-neuro/users/domain/interface/user-request.interface';
import { UpdatePatientService } from '../../../../../contexts/prism-neuro/users/application/update-patient-by-physio.service';
import { Controller } from '../controller';

export class UpdatePatientProfileController implements Controller {
  constructor(private updatePatientService: UpdatePatientService) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { firstName, lastName, age, weight, phoneCode, phoneNumber, addresses } = JSON.parse(req.body.patient);

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
          phoneCode
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

    if (addresses) {
      request = {
        ...request,
        addresses
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

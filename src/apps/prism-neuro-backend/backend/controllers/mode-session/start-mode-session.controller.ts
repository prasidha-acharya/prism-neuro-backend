import { MODE_SESSION_STATUS, USER_ROLES } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import httpStatus from 'http-status';
import { GetModeSessionOfPhysioAndPatientService } from '../../../../../contexts/prism-neuro/mode-session/application/get-session.service';
import { StartModeSessionService } from '../../../../../contexts/prism-neuro/mode-session/application/start-session.service';
import { GetUserByRoleService } from '../../../../../contexts/prism-neuro/users/application/get-user-by-role.service';
import { HTTP404Error, HTTP405Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class StartModeSessionController implements Controller {
  constructor(
    private startModeSessionService: StartModeSessionService,
    private getUserByRoleService: GetUserByRoleService,
    private getModeSessionOfPhysioAndPatientService: GetModeSessionOfPhysioAndPatientService
  ) {}

  public validate = [
    param('patientId')
      .exists()
      .withMessage(MESSAGE_CODES.MODE.REQUIRED_PATIENT_ID)
      .custom(async (value, { req }) => {
        const isPatientAvailable = await this.getUserByRoleService.invoke({ userId: value, role: USER_ROLES.PATIENT });

        const physioId = req?.body?.user?.userId;

        if (!physioId) {
          throw new HTTP404Error(MESSAGE_CODES.USER.INVALID_PHYSIO_THERAPIST);
        }

        if (!isPatientAvailable) {
          throw new HTTP404Error(MESSAGE_CODES.USER.INVALID_PATIENT);
        }

        // checking if any session is on.
        const isModeSessionAlreadyStarted = await this.getModeSessionOfPhysioAndPatientService.invoke({
          patientId: value,
          physioId,
          status: MODE_SESSION_STATUS.START
        });

        if (isModeSessionAlreadyStarted) {
          throw new HTTP405Error(MESSAGE_CODES.MODE.CANNOT_CREATE_MODE_SESSION);
        }

        return true;
      }),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const physioId = req.body.user.userId as string;
    const patientId = req.params.patientId as string;

    try {
      const response = await this.startModeSessionService.invoke({ patientId, physioId, status: MODE_SESSION_STATUS.START });

      res.status(httpStatus.OK).send({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }
}

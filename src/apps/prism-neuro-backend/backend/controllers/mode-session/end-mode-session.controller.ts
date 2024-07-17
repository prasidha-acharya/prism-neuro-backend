import { MODE_SESSION_STATUS, MODE_TRIAL_SESSION_STATUS } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { param, query } from 'express-validator';
import httpStatus from 'http-status';
import { EndModeSessionService } from '../../../../../contexts/prism-neuro/mode-session/application/end-session.service';
import { GetModeSessionOfPhysioAndPatientService } from '../../../../../contexts/prism-neuro/mode-session/application/get-session.service';
import { HTTP405Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class EndModeSessionController implements Controller {
  constructor(
    private endModeSessionService: EndModeSessionService,
    private getModeSessionOfPhysioAndPatientService: GetModeSessionOfPhysioAndPatientService
  ) {}

  public validate = [
    param('patientId').exists().withMessage(MESSAGE_CODES.MODE.REQUIRED_PATIENT_ID),
    query('sessionId')
      .exists()
      .withMessage(MESSAGE_CODES.MODE.REQUIRED_SESSION_ID)
      .custom(async (value, { req }) => {
        // if session exists

        const physioId = req.body.user.userId;

        const patientId = req.body.params;

        const isModeSessionOpen = await this.getModeSessionOfPhysioAndPatientService.invoke({
          status: MODE_SESSION_STATUS.START,
          patientId,
          physioId,
          id: value
        });

        const isTrailSessionStarted =
          isModeSessionOpen &&
          isModeSessionOpen?.modeTrialSession?.length > 0 &&
          isModeSessionOpen?.modeTrialSession.every(({ status }) => status === MODE_TRIAL_SESSION_STATUS.COMPLETED);

        if (!isModeSessionOpen || !isTrailSessionStarted) {
          throw new HTTP405Error(MESSAGE_CODES.MODE.CANNOT_END_MODE_SESSION);
        }

        return true;
      }),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const physioId = req.body.user.userId as string;
    const patientId = req.params.patientId as string;
    const sessionId = req.query.sessionId as string; // mode session id

    try {
      await this.endModeSessionService.invoke({ patientId, physioId, status: MODE_SESSION_STATUS.STOP }, sessionId);
      res.status(httpStatus.OK).json({ status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

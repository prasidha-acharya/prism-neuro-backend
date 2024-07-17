import { MODE_SESSION_STATUS } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';
import httpStatus from 'http-status';
import { GetModeSessionOfPhysioAndPatientService } from 'src/contexts/prism-neuro/mode-session/application/get-session.service';
import { GetModeByIdService } from 'src/contexts/prism-neuro/mode/application/get-mode-by-id.service';
import { UpdateModeSessionService } from '../../../../../contexts/prism-neuro/mode-session/application/update-session.service';
import { StartModeTrialService } from '../../../../../contexts/prism-neuro/trial/application/start-mode-trial.service';
import { HTTP400Error, HTTP404Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class StartModeTrialController implements Controller {
  constructor(
    private startModeTrialService: StartModeTrialService,
    private updateModeSessionService: UpdateModeSessionService,
    private getModeByIdService: GetModeByIdService,
    private getModeSessionOfPhysioAndPatientService: GetModeSessionOfPhysioAndPatientService
  ) {}

  public validate = [
    param('modeId').exists().withMessage(MESSAGE_CODES.MODE.REQUIRED_MODE_ID),
    body('trialId')
      .exists()
      .withMessage(MESSAGE_CODES.MODE.REQUIRED_TRIAL_NUMBER)
      .custom(async (value, { req }) => {
        const modeId = req?.params?.modeId;
        if (!modeId) {
          throw new HTTP404Error(MESSAGE_CODES.MODE.REQUIRED_MODE_ID);
        }

        // fetch model to valid trial

        const modeResponse = await this.getModeByIdService.invoke(modeId);

        if (!modeResponse) {
          throw new HTTP404Error(MESSAGE_CODES.MODE.MODE_SESSION_NOT_FOUND);
        }
        console.log(modeResponse, value, '====', value >= 1 && value <= modeResponse.trialCount);

        if (!(value >= 1 && value <= modeResponse.trialCount)) {
          throw new HTTP400Error(MESSAGE_CODES.MODE.INVALID_TRIAL_NUMBER);
        }

        return true;
      }),
    body('startTime').isISO8601().withMessage(MESSAGE_CODES.INVALID_DATE).toDate().withMessage(MESSAGE_CODES.INVALID_DATE),
    body('sessionId')
      .exists()
      .withMessage(MESSAGE_CODES.MODE.REQUIRED_SESSION_ID)
      .custom(async value => {
        const modeSesion = await this.getModeSessionOfPhysioAndPatientService.invoke({ id: value, status: MODE_SESSION_STATUS.START });

        if (!modeSesion) {
          throw new HTTP400Error(MESSAGE_CODES.MODE.SESSION_IS_NOT_STARTED);
        }
        return true;
      }),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { trialId, startTime, sessionId } = req.body;
    const modeId = req.params.modeId as string;

    try {
      // update modeId  in mode session
      await this.updateModeSessionService.invoke({ modeId }, sessionId);

      await this.startModeTrialService.invoke({ trialId, startTime, modeId, modeSessionId: sessionId });

      res.status(httpStatus.CREATED).json({ status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

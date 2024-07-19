import { MODE_SESSION_STATUS, MODE_TRIAL_SESSION_STATUS } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';
import httpStatus from 'http-status';
import { GetModeSessionOfPhysioAndPatientService } from '../../../../../contexts/prism-neuro/mode-session/application/get-session.service';
import { EndModeTrialService } from '../../../../../contexts/prism-neuro/trial/application/end-mode-trial.service';
import { HTTP400Error, HTTP422Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class EndModeTrialController implements Controller {
  constructor(
    private endModeTrialService: EndModeTrialService,
    private getModeSessionOfPhysioAndPatientService: GetModeSessionOfPhysioAndPatientService
  ) {}

  public validate = [
    param('modeId').exists().withMessage(MESSAGE_CODES.MODE.REQUIRED_MODE_ID),
    param('modeTrialId').exists().withMessage(MESSAGE_CODES.MODE.REQUIRED_MODE_ID),
    body('results').exists().withMessage(MESSAGE_CODES.MODE.REQUIRED_TRIAL_NUMBER),
    body('endTime')
      .isISO8601()
      .withMessage(MESSAGE_CODES.INVALID_DATE)
      .toDate()
      .withMessage(MESSAGE_CODES.INVALID_DATE)
      .custom((value, { req }) => {
        if (req?.body?.endTime) {
          const today = new Date();
          const to_date = new Date(value);
          if (to_date >= today) {
            throw new HTTP422Error(MESSAGE_CODES.DATE_SHOULD_BE_LESSER_THAN_TODAY);
          }
        }
        return true;
      }),
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
    const { results, endTime, rawData, trialId, startTime, sessionId } = req.body;

    const modeId = req.params.modeId as string;

    try {
      await this.endModeTrialService.invoke({
        results,
        rawData,
        status: MODE_TRIAL_SESSION_STATUS.COMPLETED,
        endTime,
        trialId,
        modeId,
        startTime,
        modeSessionId: sessionId
      });

      res.status(httpStatus.OK).json({ status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

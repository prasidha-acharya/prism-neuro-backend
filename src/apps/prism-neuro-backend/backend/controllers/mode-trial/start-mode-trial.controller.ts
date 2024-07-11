import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';
import httpStatus from 'http-status';
import { UpdateModeSessionService } from '../../../../../contexts/prism-neuro/mode-session/application/update-session.service';
import { StartModeTrialService } from '../../../../../contexts/prism-neuro/trial/application/start-mode-trial.service';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class StartModeTrialController implements Controller {
  constructor(
    private startModeTrialService: StartModeTrialService,
    private updateModeSessionService: UpdateModeSessionService
  ) {}

  public validate = [
    param('modeId')
      .exists()
      .withMessage(MESSAGE_CODES.MODE.REQUIRED_MODE_ID)
      .custom(value => {
        console.log({ value });
        //check if model exists and check the trial count
      }),
    body('trialId').exists().withMessage(MESSAGE_CODES.MODE.REQUIRED_TRIAL_NUMBER),
    body('startTime')
      .isISO8601()
      .withMessage(MESSAGE_CODES.INVALID_DATE)
      .toDate()
      .withMessage(MESSAGE_CODES.INVALID_DATE)
      .custom((value, { req }) => {
        console.log(req.body, value);
        // if (req?.body?.startTime) {
        //   const today = new Date();
        //   const to_date = new Date(value);
        //   console.log('🚀 ~ StartModeTrialController ~ .custom ~ to_date:', to_date);
        //   if (to_date >= today) {
        //     throw new HTTP422Error(MESSAGE_CODES.DATE_SHOULD_BE_LESSER_THAN_TODAY);
        //   }
        // }
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

      await this.startModeTrialService.invoke({ trialId, startTime, modeId });

      res.status(httpStatus.CREATED).send('OK');
    } catch (error) {
      console.log('🚀 ~ StartModeTrialController ~ invoke ~ error:', error);
      next(error);
    }
  }
}

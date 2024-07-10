import { MODE_TRIAL_SESSION_STATUS } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';
import httpStatus from 'http-status';
import { EndModeTrialService } from 'src/contexts/prism-neuro/trial/application/end-mode-trial.service';
import { HTTP422Error } from 'src/contexts/shared/domain/errors/http.exception';
import { RequestValidator } from 'src/contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from 'src/contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class EndModeTrialController implements Controller {
  constructor(private endModeTrialService: EndModeTrialService) {}

  public validate = [
    param('modeId')
      .exists()
      .withMessage(MESSAGE_CODES.MODE.REQUIRED_MODE_ID)
      .custom(value => {
        console.log({ value });
        //check if model exists and check the trial count
      }),
    param('modeTrialId')
      .exists()
      .withMessage(MESSAGE_CODES.MODE.REQUIRED_MODE_ID)
      .custom(value => {
        console.log({ value });
        //check if model exists and check the trial count
      }),
    body('trialId').exists().withMessage(MESSAGE_CODES.MODE.REQUIRED_TRIAL_NUMBER),
    body('results').exists().withMessage(MESSAGE_CODES.MODE.REQUIRED_TRIAL_NUMBER),
    body('endTime')
      .isISO8601()
      .withMessage(MESSAGE_CODES.INVALID_DATE)
      .toDate()
      .withMessage(MESSAGE_CODES.INVALID_DATE)
      .custom((value, { req }) => {
        console.log(req.body, value);
        if (req?.body?.endTime) {
          const today = new Date();
          const to_date = new Date(value);
          if (to_date >= today) {
            throw new HTTP422Error(MESSAGE_CODES.DATE_SHOULD_BE_LESSER_THAN_TODAY);
          }
        }
        return true;
      }),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { results, endTime } = req.body;
    const modeId = req.params.modeId as string;
    const modeTrialId = req.params.modeTrialId as string;
    try {
      await this.endModeTrialService.invoke({
        data: {
          results,
          status: MODE_TRIAL_SESSION_STATUS.COMPLETED,
          endTime
        },
        id: modeTrialId,
        modeId
      });
      res.status(httpStatus.OK).send();
    } catch (error) {
      next(error);
    }
  }
}

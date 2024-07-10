import { MODE_TRIAL_SESSION_STATUS } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { EndModeTrialService } from 'src/contexts/prism-neuro/trial/application/end-mode-trial.service';
import { Controller } from '../controller';

export class EndModeTrialController implements Controller {
  constructor(private endModeTrialService: EndModeTrialService) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { modeTrialSessionId, trialId, results, endTime } = req.body;
    try {
      await this.endModeTrialService.invoke({
        data: {
          results,
          status: MODE_TRIAL_SESSION_STATUS.COMPLETED,
          endTime
        },
        id: modeTrialSessionId,
        trialId
      });
      res.status(httpStatus.OK).send();
    } catch (error) {
      next(error);
    }
  }
}

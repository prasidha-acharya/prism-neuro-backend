import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { StartModeTrialService } from '../../../../../contexts/prism-neuro/trial/application/start-mode-trial.service';
import { Controller } from '../controller';

export class StartModeTrialController implements Controller {
  constructor(private startModeTrialService: StartModeTrialService) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const request = req.body;
    try {
      await this.startModeTrialService.invoke({ ...request });
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      next(error);
    }
  }
}

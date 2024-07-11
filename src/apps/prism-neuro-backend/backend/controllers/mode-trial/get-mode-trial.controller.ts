import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { GetModeTrialsBySessionService } from 'src/contexts/prism-neuro/trial/application/get-mode-trial.service';
import { Controller } from '../controller';

export class GetModeTrialBySessionController implements Controller {
  constructor(private getModeTrialsBySessionService: GetModeTrialsBySessionService) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const modeId = req.params.modeId as string;
    const modeSessionId = req.params.modeId as string;

    try {
      const response = await this.getModeTrialsBySessionService.invoke({ modeId, modeSessionId });

      res.status(httpStatus.ACCEPTED).send({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }
}

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { GetModeTrialsBySessionService } from '../../../../../contexts/prism-neuro/trial/application/get-mode-trial.service';
import { ModeTransformer } from '../../../../../contexts/shared/infrastructure/transformer/mode-transformer';
import { Controller } from '../controller';

export class GetModeTrialBySessionController implements Controller {
  constructor(
    private getModeTrialsBySessionService: GetModeTrialsBySessionService,
    private modeTransformer: ModeTransformer
  ) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const modeId = req.params.modeId as string;
    const modeSessionId = req.params.modeSessionId as string;

    try {
      const response = await this.getModeTrialsBySessionService.invoke({ modeId, modeSessionId });
      const data = response == null ? [] : this.modeTransformer.getModeTrialsofActiveSessions(response);
      res.status(httpStatus.OK).json({
        data,
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}

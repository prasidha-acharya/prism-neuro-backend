import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { GetModesService } from '../../../../../../contexts/prism-neuro/mode/application/get-modes.service';
import { ModeTransformer } from '../../../../../../contexts/shared/infrastructure/transformer/mode-transformer';
import { Controller } from '../../controller';

export class GetModesByAdminController implements Controller {
  constructor(
    private getModesService: GetModesService,
    private modeTransformer: ModeTransformer
  ) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const sessionId = req.params.modeSessionId;
    try {
      const response = await this.getModesService.invoke(sessionId);

      const data = response === null ? null : this.modeTransformer.getModesDetailForDashboard(response ?? []);
      res.status(httpStatus.OK).json({
        data,
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}

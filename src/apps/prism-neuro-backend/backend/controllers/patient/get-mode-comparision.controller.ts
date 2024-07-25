import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { GetAllModesService } from 'src/contexts/prism-neuro/mode/application/get-all-mode.service';
import { StatisticsTransformer } from 'src/contexts/shared/infrastructure/transformer/statistics-transformer';
import { Controller } from '../controller';

export class GetModeComparisionController implements Controller {
  constructor(
    private getAllModesService: GetAllModesService,
    private statisticsTransformer: StatisticsTransformer
  ) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const patientId = req.body.user.userId;

    try {
      const response = await this.getAllModesService.invoke({ patientId });

      const data = response === null ? [] : this.statisticsTransformer.modeComparisionTransformer(response);

      res.status(httpStatus.OK).json({ data, status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

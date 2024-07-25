import { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';
import httpStatus from 'http-status';
import { GetAllModesService } from '../../../../../contexts/prism-neuro/mode/application/get-all-mode.service';
import { HTTP400Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { StatisticsTransformer } from '../../../../../contexts/shared/infrastructure/transformer/statistics-transformer';
import {
  getDateBeforeOneMonth,
  getDateBeforeWeek,
  getEndDayOfDate,
  getStartDayOfDate
} from '../../../../../contexts/shared/infrastructure/utils/date';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class GetPatientModeAnalyticsController implements Controller {
  constructor(
    private getAllModesService: GetAllModesService,
    private statisticsTransformer: StatisticsTransformer
  ) {}

  public validate = [query('filter').exists().withMessage(MESSAGE_CODES.MODE), RequestValidator];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const patientId = req.body.user.userId as string;

    let startDate: any | undefined;
    let endDate: any | undefined;

    const filter = req?.query?.filter as string;

    const currentDate = new Date();

    endDate = getEndDayOfDate(currentDate);

    if (filter === 'monthly') {
      startDate = getDateBeforeOneMonth();
    } else if (filter === 'weekly') {
      startDate = getDateBeforeWeek();
    } else {
      startDate = getStartDayOfDate(currentDate);
    }

    try {
      if (!startDate || !endDate) {
        throw new HTTP400Error(MESSAGE_CODES.INVALID_DATE);
      }

      const response = await this.getAllModesService.invoke({ startDate, endDate, patientId });

      const data = response === null ? [] : this.statisticsTransformer.modeAnalyticsTransformer(response);

      res.status(httpStatus.OK).json({ data, status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

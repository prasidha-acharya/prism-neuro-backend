import { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';
import httpStatus from 'http-status';
import { GetAllModesService } from '../../../../../contexts/prism-neuro/mode/application/get-all-mode.service';
import { GetModeAnalyticsOfPhysioService } from '../../../../../contexts/prism-neuro/mode/application/get-mode-analytics-of-physio.service';
import { HTTP400Error, HTTP422Error } from '../../../../../contexts/shared/domain/errors/http.exception';
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

export class GetPhysioModeAnalyticsController implements Controller {
  constructor(
    private getAllModesService: GetAllModesService,
    private statisticsTransformer: StatisticsTransformer,
    private getModeAnalyticsOfPhysioService: GetModeAnalyticsOfPhysioService
  ) {}

  public validate = [
    query('startDate')
      .optional()
      .isISO8601()
      .withMessage(MESSAGE_CODES.INVALID_DATE)
      .toDate()
      .withMessage(MESSAGE_CODES.INVALID_DATE)
      .custom((value, { req }) => {
        if (req?.query?.startDate) {
          const today = new Date();
          const to_date = new Date(value);
          if (to_date >= today) {
            throw new HTTP422Error(MESSAGE_CODES.DATE_SHOULD_BE_LESSER_THAN_TODAY);
          }

          if (req.query.endDate && req.query.startDate >= req.query.endDate)
            throw new HTTP422Error(MESSAGE_CODES.FROM_DATE_SHOULD_BE_SMALLER_THAN_TO_DATE);
        }

        return true;
      }),
    query('endDate')
      .optional()
      .isISO8601()
      .withMessage(MESSAGE_CODES.INVALID_DATE)
      .toDate()
      .withMessage(MESSAGE_CODES.INVALID_DATE)
      .custom((value, { req }) => {
        if (req?.query?.from_date) {
          const today = new Date();
          const endDate = new Date(value);
          if (endDate >= today) {
            throw new HTTP422Error(MESSAGE_CODES.DATE_SHOULD_BE_LESSER_THAN_TODAY);
          }

          if (req.query.endDate && req.query.from_date >= req.query.endDate)
            throw new HTTP422Error(MESSAGE_CODES.FROM_DATE_SHOULD_BE_SMALLER_THAN_TO_DATE);
        }

        return true;
      }),
    query('filter')
      .optional()
      .custom((val, { req }) => {
        if (!req?.query?.startDate && !val) {
          throw new HTTP400Error(MESSAGE_CODES.MODE.REQUIRED_FILTER_OR_DATE_RANGE);
        }
        return true;
      }),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    let startDate: any | undefined;
    let endDate: any | undefined;

    const physioId = req.body.user.userId;

    const filter = req?.query?.filter as string;

    const currentDate = new Date();

    endDate = getEndDayOfDate(currentDate);

    if (req?.query?.startDate) {
      startDate = getStartDayOfDate(req.query.startDate as unknown as Date);
    }

    if (req?.query?.endDate) {
      endDate = getEndDayOfDate(req.query.endDate as unknown as Date);
    }

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

      const response = await this.getModeAnalyticsOfPhysioService.invoke({ startDate, endDate, physioId });

      // const data = response === null ? [] : this.statisticsTransformer.modeAnalyticsTransformer(response);

      res.status(httpStatus.OK).json({ data: response, status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

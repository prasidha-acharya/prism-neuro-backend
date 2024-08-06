import { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';
import httpStatus from 'http-status';
import { GetModeAnalyticsOfAdminService } from '../../../../../../contexts/prism-neuro/mode/application/get-mode-analytics-of-admin.service';
import { HTTP400Error, HTTP422Error } from '../../../../../../contexts/shared/domain/errors/http.exception';
import { Filter } from '../../../../../../contexts/shared/domain/interface/enum';
import { RequestValidator } from '../../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { getEndDayOfDate, getStartDayOfDate } from '../../../../../../contexts/shared/infrastructure/utils/date';
import { MESSAGE_CODES } from '../../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../../controller';

export class GetModeAnalyticsController implements Controller {
  constructor(private getModeAnalyticsOfAdminService: GetModeAnalyticsOfAdminService) {}

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
      .isIn([Filter.DAILY, Filter.MONTHLY])
      .withMessage(MESSAGE_CODES.MODE.FILTER_VALUE_MUST_BE_DAILY_OR_MONTHLY)
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

    const filter = req?.query?.filter as Filter;

    const currentDate = new Date();

    endDate = getEndDayOfDate(currentDate);

    if (req?.query?.startDate) {
      startDate = getStartDayOfDate(req.query.startDate as unknown as Date);
    }

    if (req?.query?.endDate) {
      endDate = getEndDayOfDate(req.query.endDate as unknown as Date);
    }

    try {
      const resp = await this.getModeAnalyticsOfAdminService.invoke({ startDate, endDate }, filter);

      res.status(httpStatus.OK).json({ data: resp, status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

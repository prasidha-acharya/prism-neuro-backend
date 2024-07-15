import { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';
import httpStatus from 'http-status';
import { GetAllModesService } from '../../../../../../contexts/prism-neuro/mode/application/get-all-mode.service';
import { HTTP400Error, HTTP422Error } from '../../../../../../contexts/shared/domain/errors/http.exception';
import { RequestValidator } from '../../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../../controller';

export class GetModeAnalyticsController implements Controller {
  constructor(private getAllModesService: GetAllModesService) {}

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
    query('filter').optional(),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const startDate = req.query.startDate as Date | undefined;
    const endDate = req.query.endDate as Date | undefined;

    try {
      if (!startDate || !endDate) {
        throw new HTTP400Error(MESSAGE_CODES.INVALID_DATE);
      }

      const response = await this.getAllModesService.invoke({ startDate, endDate });

      res.status(httpStatus.ACCEPTED).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}

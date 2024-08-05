import { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';
import httpStatus from 'http-status';
import { GetModeAnalyticsOfPatientService } from 'src/contexts/prism-neuro/mode/application/get-mode-analytics-of-patient.service';
import { HTTP400Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import {
  getDateBeforeOneMonth,
  getDateBeforeWeek,
  getEndDayOfDate,
  getStartDayOfDate
} from '../../../../../contexts/shared/infrastructure/utils/date';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class GetPatientModeAnalyticsController implements Controller {
  constructor(private getModeAnalyticsOfPatientService: GetModeAnalyticsOfPatientService) {}

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

      const response = await this.getModeAnalyticsOfPatientService.invoke({ startDate, endDate, patientId });

      res.status(httpStatus.OK).json({ data: response, status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

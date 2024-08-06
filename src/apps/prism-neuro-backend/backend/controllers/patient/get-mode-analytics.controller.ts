import { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';
import httpStatus from 'http-status';
import { Filter } from '../../../../..//contexts/shared/domain/interface/enum';
import { GetModeAnalyticsOfPatientService } from '../../../../../contexts/prism-neuro/mode/application/get-mode-analytics-of-patient.service';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { getEndDayOfDate } from '../../../../../contexts/shared/infrastructure/utils/date';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class GetPatientModeAnalyticsController implements Controller {
  constructor(private getModeAnalyticsOfPatientService: GetModeAnalyticsOfPatientService) {}

  public validate = [
    query('filter').isIn([Filter.DAILY, Filter.MONTHLY]).withMessage(MESSAGE_CODES.MODE.FILTER_VALUE_MUST_BE_DAILY_OR_MONTHLY),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const patientId = req.body.user.userId as string;

    let startDate: any | undefined;
    let endDate: any | undefined;

    const filter = req?.query?.filter as Filter;

    const currentDate = new Date();

    endDate = getEndDayOfDate(currentDate);

    try {
      const response = await this.getModeAnalyticsOfPatientService.invoke({ startDate, endDate, patientId }, filter);

      res.status(httpStatus.OK).json({ data: response, status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

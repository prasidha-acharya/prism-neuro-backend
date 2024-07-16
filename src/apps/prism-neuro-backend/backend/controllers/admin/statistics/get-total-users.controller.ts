import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { GetTotalUsersService } from '../../../../../../contexts/prism-neuro/users/application/get-total-users.service';
import { HTTP400Error } from '../../../../../../contexts/shared/domain/errors/http.exception';
import {
  getDateBeforeOneMonth,
  getDateBeforeWeek,
  getEndDayOfDate,
  getStartDayOfDate
} from '../../../../../../contexts/shared/infrastructure/utils/date';
import { MESSAGE_CODES } from '../../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../../controller';

export class GetTotalUsersController implements Controller {
  constructor(private getTotalUsersService: GetTotalUsersService) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const filter = req.query.filter as string;

    let startDate: any;
    let endDate: any;

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

      const [users, patients, physio] = await Promise.all([
        this.getTotalUsersService.invoke({ startDate, endDate }),
        this.getTotalUsersService.invoke({ role: 'PATIENT', startDate, endDate }),
        this.getTotalUsersService.invoke({ role: 'PHYSIO', startDate, endDate })
      ]);

      res.status(httpStatus.ACCEPTED).send({
        data: { users, patients, physio }
      });
    } catch (error) {
      next(error);
    }
  }
}

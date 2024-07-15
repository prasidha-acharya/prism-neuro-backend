import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';

export class GetModeAnalyticsController implements Controller {
  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    console.log(startDate, endDate);

    try {
      res.status(httpStatus.ACCEPTED).send();
    } catch (error) {
      next(error);
    }
  }
}

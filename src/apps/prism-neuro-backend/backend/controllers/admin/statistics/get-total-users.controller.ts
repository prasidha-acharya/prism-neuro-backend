import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { GetTotalUsersService } from '../../../../../../contexts/prism-neuro/users/application/get-total-users.service';
import { Controller } from '../../controller';

export class GetTotalUsersController implements Controller {
  constructor(private getTotalUsersService: GetTotalUsersService) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const filter = req.query.filter as string;

    const startDate = new Date();
    const endDate = new Date();

    if (filter === 'monthly') {
      // end day of today
      // start day
    } else if (filter === 'weekly') {
    } else {
    }

    try {
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

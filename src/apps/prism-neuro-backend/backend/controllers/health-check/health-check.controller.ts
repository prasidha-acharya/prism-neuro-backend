import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../controller';

export class HealthCheckController implements Controller {
  async invoke(_req: Request, res: Response): Promise<void> {
    res.status(httpStatus.OK).json({
      status: 'SUCCESS',
      date: new Date().toISOString()
    });
  }
}

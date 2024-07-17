import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { GetModesService } from '../../../../../contexts/prism-neuro/mode/application/get-modes.service';
import { Controller } from '../controller';

export class GetModesController implements Controller {
  constructor(private getModesService: GetModesService) {}

  async invoke(_: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.getModesService.invoke();
      res.status(httpStatus.OK).json({
        data: response,
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}

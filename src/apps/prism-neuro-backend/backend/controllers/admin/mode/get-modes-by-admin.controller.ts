import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { GetModesByAdminService } from 'src/contexts/prism-neuro/mode/application/get-modes-by-admin.service';
import { Controller } from '../../controller';

export class GetModesByAdminController implements Controller {
  constructor(private getModesByAdminService: GetModesByAdminService) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await this.getModesByAdminService.invoke();

      res.status(httpStatus.OK).json({
        data,
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}

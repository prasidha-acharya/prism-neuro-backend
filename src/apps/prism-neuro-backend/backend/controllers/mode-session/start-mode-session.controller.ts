import { MODE_SESSION_STATUS } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { StartModeSessionService } from 'src/contexts/prism-neuro/mode-session/application/start-session.service';
import { Controller } from '../controller';

export class StartModeSessionController implements Controller {
  constructor(private startModeSessionService: StartModeSessionService) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const physioId = req.query.physioId as string;
    const patientId = req.query.patientId as string;

    try {
      const response = await this.startModeSessionService.invoke({ patientId, physioId, status: MODE_SESSION_STATUS.START });

      res.status(httpStatus.OK).send({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }
}

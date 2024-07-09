import { MODE_SESSION_STATUS } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { EndModeSessionService } from '../../../../../contexts/prism-neuro/mode-session/application/end-session.service';
import { Controller } from '../controller';

export class EndModeSessionController implements Controller {
  constructor(private endModeSessionService: EndModeSessionService) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const physioId = req.query.physioId as string;
    const patientId = req.query.physioId as string;
    const sessionId = req.query.physioId as string;

    try {
      this.endModeSessionService.invoke({ patientId, physioId, status: MODE_SESSION_STATUS.STOP }, sessionId);
      res.status(httpStatus.OK).send();
    } catch (error) {
      next(error);
    }
  }
}

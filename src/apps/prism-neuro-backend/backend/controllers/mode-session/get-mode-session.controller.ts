import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import httpStatus from 'http-status';
import { GetSessionOfPateintService } from '../../../../../contexts/prism-neuro/mode-session/application/get-session-of-patient.service';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { ModeTransformer } from '../../../../../contexts/shared/infrastructure/transformer/mode-transformer';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class GetModeSessionOfPatientController implements Controller {
  constructor(
    private getSessionOfPateintService: GetSessionOfPateintService,
    private modeTransformer: ModeTransformer
  ) {}

  public validate = [
    param('patientId').exists().withMessage(MESSAGE_CODES.MODE.REQUIRED_PATIENT_ID),
    param('modeId').exists().withMessage(MESSAGE_CODES.MODE.REQUIRED_MODE_ID),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { limit, page, endDate, search, startDate } = req?.query as unknown as {
      limit?: number;
      page?: number;
      search?: string;
      endDate?: Date;
      startDate?: Date;
    };

    const { modeId, patientId }: { modeId: string; patientId: string } = req.body;

    try {
      const response = await this.getSessionOfPateintService.invoke({ modeId, patientId, search, startDate, endDate, limit, page });

      const data = response.data === null ? [] : this.modeTransformer.modeSessionOfPatients(response.data);
      res.status(httpStatus.ACCEPTED).send({
        data: {
          ...response,
          data
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

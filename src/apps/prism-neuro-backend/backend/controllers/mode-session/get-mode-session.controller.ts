import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import httpStatus from 'http-status';
import { GetSessionOfPateintService } from '../../../../../contexts/prism-neuro/mode-session/application/get-session-of-patient.service';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { defaultLimit, defaultPage } from '../../../../../contexts/shared/infrastructure/utils/constant';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class GetModeSessionOfPatientController implements Controller {
  constructor(private getSessionOfPateintService: GetSessionOfPateintService) {}

  public validate = [
    param('patientId').exists().withMessage(MESSAGE_CODES.MODE.REQUIRED_PATIENT_ID),
    param('modeId').exists().withMessage(MESSAGE_CODES.MODE.REQUIRED_MODE_ID),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const {
      limit = defaultLimit,
      page = defaultPage,
      endDate,
      search,
      startDate
    } = req?.query as unknown as {
      limit?: number;
      page?: number;
      search?: string;
      endDate?: Date;
      startDate?: Date;
    };

    const { modeId, patientId }: { modeId: string; patientId: string } = req.body;

    try {
      const data = await this.getSessionOfPateintService.invoke({
        modeId,
        patientId,
        search,
        startDate,
        endDate,
        limit: Number(limit),
        page: Number(page)
      });

      res.status(httpStatus.OK).json({
        data,
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}

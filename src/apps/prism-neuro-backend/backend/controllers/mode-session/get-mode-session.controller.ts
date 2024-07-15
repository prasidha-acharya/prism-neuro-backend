import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import httpStatus from 'http-status';
import { GetSessionOfPateintService } from '../../../../../contexts/prism-neuro/mode-session/application/get-session-of-patient.service';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
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
    try {
      console.log(req.body.params);
      const response = await this.getSessionOfPateintService.invoke({ modeId: req.body.modeId, patientId: req.body.patientId });
      res.status(httpStatus.ACCEPTED).send({ data: response });
    } catch (error) {
      next(error);
    }
  }
}

import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import httpStatus from 'http-status';
import { DeletePatientByAdminService } from '../../../../../contexts/prism-neuro/users/application/delete-patient-by-physio.service';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class DeletePatientByAdminController implements Controller {
  constructor(private deletePatientByAdminService: DeletePatientByAdminService) {}

  public validate = [param('patientId').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_PATIENT_ID), RequestValidator];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const physioId = req.body.user.userId;
    const patientId = req.params.patientId;

    try {
      await this.deletePatientByAdminService.invoke(patientId, physioId);
      res.status(httpStatus.OK).json({
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}

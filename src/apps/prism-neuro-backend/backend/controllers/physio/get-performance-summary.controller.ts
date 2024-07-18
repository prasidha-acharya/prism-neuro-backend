import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { GetModeTrialsOfPhysioService } from 'src/contexts/prism-neuro/trial/application/get-mode-trials-of-physio.service';
import { GetTotalPatientsService } from 'src/contexts/prism-neuro/users/application/get-total-patients.service';
import { UserTransformer } from '../../../../../contexts/prism-neuro/users/domain/transformer/user-transformer';
import { HTTP422Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class GetPerformanceSummaryOfPhysioController implements Controller {
  constructor(
    private getModeTrialsOfPhysioService: GetModeTrialsOfPhysioService,
    private userTransformer: UserTransformer,
    private getTotalPatientsService: GetTotalPatientsService
  ) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const physioId = req.body.user.userId as string;
    try {
      if (!physioId) {
        throw new HTTP422Error(MESSAGE_CODES.USER.USER_NOT_FOUND);
      }
      const trials = await this.getModeTrialsOfPhysioService.invoke(physioId);

      const totalPatients = await this.getTotalPatientsService.invoke(physioId);

      const data = trials == null ? {} : this.userTransformer.getPerformanceSummary(trials);

      res.status(httpStatus.OK).json({
        status: 'SUCCESS',
        data: {
          ...data,
          patients: totalPatients
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

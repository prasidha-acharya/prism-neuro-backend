import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserTransformer } from 'src/contexts/prism-neuro/users/domain/transformer/user-transformer';
import { GetModeTrialsOfPatientService } from '../../../../../contexts/prism-neuro/trial/application/get-mode-trials-of-patient.service';
import { HTTP422Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class GetPerformanceSummaryOfPatientController implements Controller {
  constructor(
    private getModeTrialsOfPatientService: GetModeTrialsOfPatientService,
    private userTransformer: UserTransformer
  ) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.body.user.userId as string;
    try {
      if (!userId) {
        throw new HTTP422Error(MESSAGE_CODES.USER.USER_NOT_FOUND);
      }
      const trials = await this.getModeTrialsOfPatientService.invoke(userId);

      const data = trials == null ? {} : this.userTransformer.getPerformanceSummary(trials);

      res.status(httpStatus.OK).json({
        status: 'SUCCESS',
        data
      });
    } catch (error) {
      next(error);
    }
  }
}

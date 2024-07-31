import { MODE_SESSION_STATUS } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import httpStatus from 'http-status';
import { GetModeSessionOfPhysioAndPatientService } from '../../../../../contexts/prism-neuro/mode-session/application/get-session.service';
import { GetModesService } from '../../../../../contexts/prism-neuro/mode/application/get-modes.service';
import { HTTP404Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { ModeTransformer } from '../../../../../contexts/shared/infrastructure/transformer/mode-transformer';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class GetModesController implements Controller {
  constructor(
    private getModesService: GetModesService,
    private getModeSessionOfPhysioAndPatientService: GetModeSessionOfPhysioAndPatientService,
    private modeTransformer: ModeTransformer
  ) {}

  public validate = [
    param('modeSessionId')
      .exists()
      .withMessage(MESSAGE_CODES.MODE.REQUIRED_SESSION_ID)
      .custom(async (val, { req }) => {
        const physioId = req.body.user.userId;

        //check if session is active of physio

        const isModeSessionAlreadyStarted = await this.getModeSessionOfPhysioAndPatientService.invoke({
          id: val,
          physioId,
          status: MODE_SESSION_STATUS.START
        });

        if (!isModeSessionAlreadyStarted) {
          throw new HTTP404Error(MESSAGE_CODES.MODE.SESSION_IS_NOT_ACTIVE);
        }

        return true;
      }),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const sessionId = req.params.modeSessionId;
    try {
      const response = await this.getModesService.invoke(sessionId);

      const data = response === null ? null : this.modeTransformer.getModesDetailForTablet(response);

      res.status(httpStatus.OK).json({
        data,
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}

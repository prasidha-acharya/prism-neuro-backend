import { NextFunction, Request, Response } from 'express';
import { param, query } from 'express-validator';
import httpStatus from 'http-status';
import { IDataFilterQueryRequest } from 'src/contexts/prism-neuro/users/domain/interface/user-request.interface';
import { GetAllPatientsActivityByPhysioService } from '../../../../../contexts/prism-neuro/users/application/get-all-patients-activity-by-physio.service';
import { HTTP422Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { defaultLimit, defaultPage } from '../../../../../contexts/shared/infrastructure/utils/constant';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class GetModeSessionActivityOfPatientByPhysioController implements Controller {
  constructor(private getAllPatientsActivityByPhysioService: GetAllPatientsActivityByPhysioService) {}

  public validate = [
    param('modeId').exists().withMessage(MESSAGE_CODES.MODE.REQUIRED_MODE_ID),
    query('startDate')
      .optional()
      .isISO8601()
      .withMessage(MESSAGE_CODES.INVALID_DATE)
      .toDate()
      .withMessage(MESSAGE_CODES.INVALID_DATE)
      .custom((value, { req }) => {
        if (req?.query?.startDate) {
          const today = new Date();
          const to_date = new Date(value);
          if (to_date >= today) {
            throw new HTTP422Error(MESSAGE_CODES.DATE_SHOULD_BE_LESSER_THAN_TODAY);
          }

          if (req.query.endDate && req.query.startDate >= req.query.endDate)
            throw new HTTP422Error(MESSAGE_CODES.FROM_DATE_SHOULD_BE_SMALLER_THAN_TO_DATE);
        }

        return true;
      }),
    query('endDate')
      .optional()
      .isISO8601()
      .withMessage(MESSAGE_CODES.INVALID_DATE)
      .toDate()
      .withMessage(MESSAGE_CODES.INVALID_DATE)
      .custom((value, { req }) => {
        if (req?.query?.from_date) {
          const today = new Date();
          const endDate = new Date(value);
          if (endDate >= today) {
            throw new HTTP422Error(MESSAGE_CODES.DATE_SHOULD_BE_LESSER_THAN_TODAY);
          }

          if (req.query.endDate && req.query.from_date >= req.query.endDate)
            throw new HTTP422Error(MESSAGE_CODES.FROM_DATE_SHOULD_BE_SMALLER_THAN_TO_DATE);
        }

        return true;
      }),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { limit = defaultLimit, page = defaultPage, endDate = new Date(), search, startDate } = req?.query as unknown as IDataFilterQueryRequest;

    const physioId = req.body.user.userId;

    const modeId = req.params.modeId;

    try {
      const data = await this.getAllPatientsActivityByPhysioService.invoke({
        physioId,
        search,
        page: Number(page),
        limit: Number(limit),
        startDate,
        endDate,
        modeId
      });

      res.status(httpStatus.OK).json({
        status: 'SUCCESS',
        data
      });
    } catch (error) {
      next(error);
    }
  }
}

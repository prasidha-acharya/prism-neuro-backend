import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { query } from 'express-validator';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { GetAllPatientsActivityByAdminService } from '../../../../../../contexts/prism-neuro/users/application/get-all-patients-activity-by-admin.service';
import { IDataFilterQueryRequest } from '../../../../../../contexts/prism-neuro/users/domain/interface/user-request.interface';
import { HTTP422Error } from '../../../../../../contexts/shared/domain/errors/http.exception';
import { RequestValidator } from '../../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { ModeTransformer } from '../../../../../../contexts/shared/infrastructure/transformer/mode-transformer';
import { defaultLimit, defaultPage } from '../../../../../../contexts/shared/infrastructure/utils/constant';
import { MESSAGE_CODES } from '../../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../../controller';

export class GetAllPatientActivityController implements Controller {
  constructor(
    private modeTransformer: ModeTransformer,
    private getAllPatientsActivityByAdminService: GetAllPatientsActivityByAdminService
  ) {}

  public validate = [
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
    query('search').optional(),
    RequestValidator
  ];

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page = defaultPage, limit = defaultLimit, startDate, endDate, search } = req.query as unknown as IDataFilterQueryRequest;
      const data = await this.getAllPatientsActivityByAdminService.invoke({
        limit: Number(limit),
        page: Number(page),
        startDate,
        endDate,
        search
      });
      res.status(httpStatus.OK).json({ data, status: 'SUCESS' });
    } catch (error) {
      next(error);
    }
  }
}

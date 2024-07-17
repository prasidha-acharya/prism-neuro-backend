import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { query } from 'express-validator';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { GetSessionOfPateintService } from '../../../../../../contexts/prism-neuro/mode-session/application/get-session-of-patient.service';
import { GetUsersService } from '../../../../../../contexts/prism-neuro/users/application/get-users.service';
import { HTTP422Error } from '../../../../../../contexts/shared/domain/errors/http.exception';
import { RequestValidator } from '../../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { ActivityTransformer } from '../../../../../../contexts/shared/infrastructure/transformer/activity-transformer';
import { MESSAGE_CODES } from '../../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../../controller';

export class GetAllPatientActivityController implements Controller {
  constructor(
    private getUsersService: GetUsersService,
    private activityTransformer: ActivityTransformer,
    private getSessionOfPateintService: GetSessionOfPateintService
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
      const search = req.query.search as string | undefined;
      const startDate = req.query.startDate as Date | undefined;
      const endDate = req.query.startDate as Date | undefined;

      // const response = await this.getUsersService.invoke({ search, startDate, endDate, role: USER_ROLES.PATIENT });

      const response = await this.getSessionOfPateintService.invoke({ search, startDate, endDate });
      const data = response.data === null ? [] : this.activityTransformer.activityResponse(response.data);
      res.status(httpStatus.OK).json({ data: { ...response, data }, status: 'SUCESS' });
    } catch (error) {
      next(error);
    }
  }
}

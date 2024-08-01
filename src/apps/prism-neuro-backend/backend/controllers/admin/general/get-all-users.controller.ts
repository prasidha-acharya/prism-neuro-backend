import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { query } from 'express-validator';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { GetUsersService } from '../../../../../../contexts/prism-neuro/users/application/get-users.service';
import { UserTransformer } from '../../../../../../contexts/prism-neuro/users/domain/transformer/user-transformer';
import { HTTP422Error } from '../../../../../../contexts/shared/domain/errors/http.exception';
import { RequestValidator } from '../../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../../controller';

export class GetAllUsersController implements Controller {
  constructor(
    private getUsersService: GetUsersService,
    private userTransformer: UserTransformer
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
    query('role').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_ROLE),
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

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = req.query;

      const response = await this.getUsersService.invoke({ ...params, limit: Number(params.limit), page: Number(params.page) });

      const data = response.data === null ? [] : this.userTransformer.userListsByAdmin(response.data);

      res.status(httpStatus.ACCEPTED).json({
        data: {
          ...response,
          data
        },
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}

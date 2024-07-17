import { USER_ROLES } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { GetUsersService } from '../../../../../../contexts/prism-neuro/users/application/get-users.service';
import { UserTransformer } from '../../../../../../contexts/prism-neuro/users/domain/transformer/user-transformer';
import { Controller } from '../../controller';

export class GetAllPatientListByPhysioIdController implements Controller {
  constructor(
    private getUsersService: GetUsersService,
    private userTransformer: UserTransformer
  ) {}

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = req.query;
      const physioId = req.params.physioId as string;

      const response = await this.getUsersService.invoke({ ...params, role: USER_ROLES.PATIENT, createdBy: physioId });
      const data = this.userTransformer.userListsByAdmin(response.data);
      res.status(httpStatus.OK).json({ data: { ...response, data }, status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}

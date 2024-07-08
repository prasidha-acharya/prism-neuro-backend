import { UserRoles } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { GetUsersService } from '../../../../../../contexts/prism-neuro/users/application/get-users.service';
import { Controller } from '../../controller';

export class GetAllPatientListByPhysioIdController implements Controller {
  constructor(private getUsersService: GetUsersService) {}

  async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = req.query;
      const physioId = req.params.physioId as string;

      const response = await this.getUsersService.invoke({ ...params, role: UserRoles.PATIENT, createdBy: physioId });

      res.status(httpStatus.ACCEPTED).send({ data: response });
    } catch (error) {
      next(error);
    }
  }
}

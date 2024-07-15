import { USER_ROLES } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { GetUsersService } from '../../../../../contexts/prism-neuro/users/application/get-users.service';
import { UserTransformer } from '../../../../../contexts/prism-neuro/users/domain/transformer/user-transformer';
import { Controller } from '../controller';

export class GetAllPatientListsWithSessionController implements Controller {
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
      const physioId = req.body.user.userId;

      const response = await this.getUsersService.invoke({ ...params, role: USER_ROLES.PATIENT, createdBy: physioId });

      res.status(httpStatus.ACCEPTED).send({ data: this.userTransformer.patientListsByPhysio(response) });
    } catch (error) {
      next(error);
    }
  }
}

import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { ParsedQs } from 'qs';
import { CreateDoctorService } from 'src/contexts/prism-neuro/admin/application/create-doctor.service';

export class CreateDoctorController {
  constructor(private createDoctorService: CreateDoctorService) {}

  public async invoke(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    const { firstName, lastName, email, password, address, role, userName } = req.body;
    try {
      this.createDoctorService.invoke({ firstName, lastName, email, password, address, role, userName });
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      next(error);
    }
  }
}

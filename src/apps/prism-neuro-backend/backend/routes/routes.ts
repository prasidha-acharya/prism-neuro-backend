import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../controllers';
import { adminAuthRoutesHandler } from './admin/auth.routes';
import { physioRoutesHandler } from './admin/physio.routes';

export const masterRouter = (
  createDoctorController: controllers.CreateDoctorController,
  loginAdminController: controllers.LoginAdminController,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>
): Router => {
  const apiRouter = Router();

  physioRoutesHandler({ createDoctorController }, adminAuthorizer, apiRouter);
  adminAuthRoutesHandler({ loginAdminController }, apiRouter);

  return apiRouter;
};

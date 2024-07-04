import { Router } from 'express';
import * as controllers from '../controllers';
import { adminAuthRoutesHandler } from './admin/auth.routes';
import { physioRoutesHandler } from './admin/physio.routes';

export const masterRouter = (
  createDoctorController: controllers.CreateDoctorController,
  loginAdminController: controllers.LoginAdminController
): Router => {
  const apiRouter = Router();

  physioRoutesHandler({ createDoctorController }, apiRouter);
  adminAuthRoutesHandler({ loginAdminController }, apiRouter);

  return apiRouter;
};

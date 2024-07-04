import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../controllers';
import { adminAuthRoutesHandler } from './admin/auth.routes';
import { physioRoutesHandler } from './admin/physio.routes';
import { doctorRoutesHandler } from './doctor/doctor.route';
import { PatientRoutesHandler } from './patient/patient.routes';

export const masterRouter = (
  createDoctorController: controllers.CreateDoctorController,
  loginAdminController: controllers.LoginAdminController,
  loginPatientController: controllers.LoginPatientController,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>
): Router => {
  const apiRouter = Router();

  physioRoutesHandler({ createDoctorController }, adminAuthorizer, apiRouter);
  adminAuthRoutesHandler({ loginAdminController }, apiRouter);
  doctorRoutesHandler({}, apiRouter);
  PatientRoutesHandler({ loginPatientController }, apiRouter);

  return apiRouter;
};

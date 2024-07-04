import { NextFunction, Request, Response, Router } from 'express';
import { RefreshAuthorizer } from 'src/contexts/shared/infrastructure/authorizer/refresh.authorizer';
import { JWTUserAuthorizer } from 'src/contexts/shared/infrastructure/authorizer/user.authorizer';
import { IAuthorizer } from '../../../../contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../controllers';
import { adminAuthRoutesHandler } from './admin/auth.routes';
import { physioRoutesHandler } from './admin/physio.routes';
import { userRoutesHandler } from './admin/user.routes';
import { doctorRoutesHandler } from './doctor/doctor.routes';
import { PatientRoutesHandler } from './patient/patient.routes';

export const masterRouter = (
  createDoctorController: controllers.CreateDoctorController,
  loginAdminController: controllers.LoginAdminController,
  loginPatientController: controllers.LoginPatientController,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  userLogoutController: controllers.UserLogoutController,
  generateAccessTokenController: controllers.GenerateAccessTokenController,
  loginDoctorController: controllers.LoginDoctorController,
  refreshAuthorizer: RefreshAuthorizer,
  userAuthorizer: JWTUserAuthorizer
): Router => {
  const apiRouter = Router();

  physioRoutesHandler({ createDoctorController }, adminAuthorizer, apiRouter);
  adminAuthRoutesHandler({ loginAdminController }, apiRouter);
  doctorRoutesHandler({ loginDoctorController }, apiRouter);
  PatientRoutesHandler({ loginPatientController }, apiRouter);
  userRoutesHandler({ userLogoutController, generateAccessTokenController }, userAuthorizer, refreshAuthorizer, apiRouter);

  return apiRouter;
};

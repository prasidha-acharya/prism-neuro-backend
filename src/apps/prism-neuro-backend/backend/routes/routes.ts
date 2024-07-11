import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from '../../../../contexts/shared/domain/model/authentication/authorizer';
import { JWTDoctorAuthorizer } from '../../../../contexts/shared/infrastructure/authorizer/doctor.authorizer';
import { RefreshAuthorizer } from '../../../../contexts/shared/infrastructure/authorizer/refresh.authorizer';
import { JWTUserAuthorizer } from '../../../../contexts/shared/infrastructure/authorizer/user.authorizer';
import * as controllers from '../controllers';
import { adminAuthRoutesHandler } from './admin/auth.routes';
import { physioRoutesHandler } from './admin/doctor.routes';
import { userRoutesHandler } from './admin/user.routes';
import { doctorRoutesHandler } from './doctor/doctor.routes';
import { modeSessionRoutesHandler } from './mode-session/mode-session.routes';
import { modeTrialRoutesHandler } from './mode-trial/mode-trial.routes';
import { PatientRoutesHandler } from './patient/patient.routes';

export const masterRouter = (
  createDoctorController: controllers.CreateDoctorController,
  loginAdminController: controllers.LoginAdminController,
  loginPatientController: controllers.LoginPatientController,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  userLogoutController: controllers.UserLogoutController,
  generateAccessTokenController: controllers.GenerateAccessTokenController,
  loginDoctorController: controllers.LoginDoctorController,
  deleteDoctorController: controllers.DeleteDoctorController,
  updateDoctorController: controllers.UpdateDoctorController,
  forgotPasswordController: controllers.ForgotPasswordController,
  changePasswordController: controllers.ChangePasswordController,
  resetPasswordController: controllers.ResetPasswordController,
  getAllUsersController: controllers.GetAllUsersController,
  getAllPatientListByPhysioIdController: controllers.GetAllPatientListByPhysioIdController,
  startModeSessionController: controllers.StartModeSessionController,
  endModeSessionController: controllers.EndModeSessionController,
  createPatientByPhysioController: controllers.CreatePatientByPhysioController,
  endModeTrialController: controllers.EndModeTrialController,
  startModeTrialController: controllers.StartModeTrialController,
  getModeTrialBySessionController: controllers.GetModeTrialBySessionController,
  refreshAuthorizer: RefreshAuthorizer,
  userAuthorizer: JWTUserAuthorizer,
  physioAuthorizer: JWTDoctorAuthorizer
): Router => {
  const apiRouter = Router();

  physioRoutesHandler(
    { createDoctorController, updateDoctorController, deleteDoctorController, getAllUsersController, getAllPatientListByPhysioIdController },
    adminAuthorizer,
    apiRouter
  );
  adminAuthRoutesHandler({ loginAdminController }, apiRouter);
  doctorRoutesHandler(
    { loginDoctorController, updateDoctorController, deleteDoctorController, createPatientByPhysioController },
    physioAuthorizer,
    apiRouter
  );
  PatientRoutesHandler({ loginPatientController }, apiRouter);
  userRoutesHandler(
    {
      userLogoutController,
      generateAccessTokenController,
      forgotPasswordController,
      changePasswordController,
      resetPasswordController
    },
    userAuthorizer,
    refreshAuthorizer,
    apiRouter
  );

  modeSessionRoutesHandler({ endModeSessionController, startModeSessionController }, physioAuthorizer, apiRouter);
  modeTrialRoutesHandler({ endModeTrialController, startModeTrialController, getModeTrialBySessionController }, physioAuthorizer, apiRouter);

  return apiRouter;
};

import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from '../../../../contexts/shared/domain/model/authentication/authorizer';
import { JWTDoctorAuthorizer } from '../../../../contexts/shared/infrastructure/authorizer/doctor.authorizer';
import { RefreshAuthorizer } from '../../../../contexts/shared/infrastructure/authorizer/refresh.authorizer';
import { JWTUserAuthorizer } from '../../../../contexts/shared/infrastructure/authorizer/user.authorizer';
import * as controllers from '../controllers';
import { activityRoutesHandler } from './admin/activity.routes';
import { adminPhysioRoutesHandler } from './admin/admin-physio.routes';
import { adminAuthRoutesHandler } from './admin/auth.routes';
import { statisticsRoutesHandler } from './admin/statistics.routes';
import { userRoutesHandler } from './admin/user.routes';
import { physioRoutesHandler } from './doctor/doctor.routes';
import { modeSessionRoutesHandler } from './mode-session/mode-session.routes';
import { modeTrialRoutesHandler } from './mode-trial/mode-trial.routes';
import { PatientRoutesHandler } from './patient/patient.routes';

export const masterRouter = (
  createPhysioController: controllers.CreatePhysioController,
  loginAdminController: controllers.LoginAdminController,
  loginPatientController: controllers.LoginPatientController,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  userLogoutController: controllers.UserLogoutController,
  generateAccessTokenController: controllers.GenerateAccessTokenController,
  loginPhysioController: controllers.LoginDoctorController,
  deletePhysioController: controllers.DeletePhysioController,
  updatePhysioController: controllers.UpdatePhysioController,
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
  getAllPatientListsWithSessionController: controllers.GetAllPatientListsWithSessionController,
  getModeSessionOfPatientController: controllers.GetModeSessionOfPatientController,
  getAllPatientActivityController: controllers.GetAllPatientActivityController,
  getTotalUsersController: controllers.GetTotalUsersController,
  refreshAuthorizer: RefreshAuthorizer,
  userAuthorizer: JWTUserAuthorizer,
  physioAuthorizer: JWTDoctorAuthorizer
): Router => {
  const apiRouter = Router();

  adminPhysioRoutesHandler(
    {
      createPhysioController,
      updatePhysioController,
      deletePhysioController,
      getAllUsersController,
      getAllPatientListByPhysioIdController
    },
    adminAuthorizer,
    apiRouter
  );

  activityRoutesHandler({ getAllPatientActivityController }, adminAuthorizer, apiRouter);

  statisticsRoutesHandler({ getTotalUsersController }, adminAuthorizer, apiRouter);

  adminAuthRoutesHandler({ loginAdminController }, apiRouter);
  physioRoutesHandler(
    {
      loginPhysioController,
      updatePhysioController,
      deletePhysioController,
      getAllPatientListsWithSessionController,
      createPatientByPhysioController
    },
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

  modeSessionRoutesHandler(
    { endModeSessionController, startModeSessionController, getModeSessionOfPatientController },
    physioAuthorizer,
    adminAuthorizer,
    apiRouter
  );
  modeTrialRoutesHandler(
    {
      endModeTrialController,
      startModeTrialController,
      getModeTrialBySessionController
    },
    physioAuthorizer,
    adminAuthorizer,
    apiRouter
  );

  return apiRouter;
};

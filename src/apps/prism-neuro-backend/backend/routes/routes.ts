import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from '../../../../contexts/shared/domain/model/authentication/authorizer';
import { JWTPatientAuthorizer } from '../../../../contexts/shared/infrastructure/authorizer/patient.authorizer';
import { JWTPhysioTherapistAuthorizer } from '../../../../contexts/shared/infrastructure/authorizer/physio.authorizer';
import { RefreshAuthorizer } from '../../../../contexts/shared/infrastructure/authorizer/refresh.authorizer';
import { JWTUserAuthorizer } from '../../../../contexts/shared/infrastructure/authorizer/user.authorizer';
import * as controllers from '../controllers';
import { activityRoutesHandler } from './admin/activity.routes';
import { adminPhysioRoutesHandler } from './admin/admin-physio.routes';
import { adminAuthRoutesHandler } from './admin/auth.routes';
import { adminPatientRoutesHandler } from './admin/patient.routes';
import { statisticsRoutesHandler } from './admin/statistics.routes';
import { userRoutesHandler } from './admin/user.routes';
import { modeSessionRoutesHandler } from './mode-session/mode-session.routes';
import { modeTrialRoutesHandler } from './mode-trial/mode-trial.routes';
import { modeRoutesHandler } from './mode/mode.routes';
import { patientRoutesHandler } from './patient/patient.routes';
import { physioRoutesHandler } from './physio/physio.routes';

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
  getModeAnalyticsController: controllers.GetModeAnalyticsController,
  getModesController: controllers.GetModesController,
  getModeSessionActivityOfPatientController: controllers.GetModeSessionActivityOfPatientController,
  deleteAccountController: controllers.DeleteAccountController,
  getPerformanceSummaryOfPatientController: controllers.GetPerformanceSummaryOfPatientController,
  getModeComparisionController: controllers.GetModeComparisionController,
  getPatientModeAnalyticsController: controllers.GetPatientModeAnalyticsController,
  updatePatientProfileController: controllers.UpdatePatientProfileController,
  getPhysioModeAnalyticsController: controllers.GetPhysioModeAnalyticsController,
  getPerformanceSummaryOfPhysioController: controllers.GetPerformanceSummaryOfPhysioController,
  deletePatientByAdminController: controllers.DeletePatientByAdminController,
  getModeSessionActivityOfPatientByPhysioController: controllers.GetModeSessionActivityOfPatientByPhysioController,
  getSessionsBetweenPatientAndDoctorController: controllers.GetSessionsBetweenPatientAndDoctorController,
  refreshAuthorizer: RefreshAuthorizer,
  userAuthorizer: JWTUserAuthorizer,
  physioAuthorizer: JWTPhysioTherapistAuthorizer,
  patientAuthorizer: JWTPatientAuthorizer
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

  statisticsRoutesHandler({ getTotalUsersController, getModeAnalyticsController }, adminAuthorizer, apiRouter);

  adminAuthRoutesHandler({ loginAdminController }, apiRouter);

  adminPatientRoutesHandler({ deletePatientByAdminController }, adminAuthorizer, apiRouter);

  physioRoutesHandler(
    {
      loginPhysioController,
      updatePhysioController,
      deletePhysioController,
      getAllPatientListsWithSessionController,
      createPatientByPhysioController,
      getPhysioModeAnalyticsController,
      getPerformanceSummaryOfPhysioController,
      deletePatientByAdminController,
      getModeSessionActivityOfPatientByPhysioController,
      getSessionsBetweenPatientAndDoctorController
    },
    physioAuthorizer,
    apiRouter
  );

  patientRoutesHandler(
    {
      loginPatientController,
      getModeSessionActivityOfPatientController,
      getPerformanceSummaryOfPatientController,
      getModeComparisionController,
      updatePatientProfileController,
      getPatientModeAnalyticsController
    },
    patientAuthorizer,
    apiRouter
  );

  userRoutesHandler(
    {
      userLogoutController,
      generateAccessTokenController,
      forgotPasswordController,
      changePasswordController,
      resetPasswordController,
      deleteAccountController
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

  modeRoutesHandler({ getModesController }, userAuthorizer, apiRouter);

  return apiRouter;
};

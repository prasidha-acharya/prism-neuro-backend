import { NextFunction, Request, Response, Router } from 'express';
import { JWTPatientAuthorizer } from 'src/contexts/shared/infrastructure/authorizer/patient.authorizer';
import { IAuthorizer } from '../../../../contexts/shared/domain/model/authentication/authorizer';
import { JWTPhysioTherapistAuthorizer } from '../../../../contexts/shared/infrastructure/authorizer/physio.authorizer';
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
import { modeRoutesHandler } from './mode/mode.routes';
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
  getModeAnalyticsController: controllers.GetModeAnalyticsController,
  getModesController: controllers.GetModesController,
  getModeSessionActivityOfPatientController: controllers.GetModeSessionActivityOfPatientController,
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
  PatientRoutesHandler({ loginPatientController, getModeSessionActivityOfPatientController }, patientAuthorizer, apiRouter);
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

  modeRoutesHandler({ getModesController }, userAuthorizer, apiRouter);

  return apiRouter;
};

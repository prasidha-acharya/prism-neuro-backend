import { AwilixContainer, InjectionMode, asClass, asFunction, asValue, createContainer } from 'awilix';
import { config } from '../../../../config';
import { EndModeSessionService } from '../../../contexts/prism-neuro/mode-session/application/end-session.service';
import { GetSessionOfPateintService } from '../../../contexts/prism-neuro/mode-session/application/get-session-of-patient.service';
import { GetModeSessionOfPhysioAndPatientService } from '../../../contexts/prism-neuro/mode-session/application/get-session.service';
import { StartModeSessionService } from '../../../contexts/prism-neuro/mode-session/application/start-session.service';
import { UpdateModeSessionService } from '../../../contexts/prism-neuro/mode-session/application/update-session.service';
import { PrismaModeSessionRepository } from '../../../contexts/prism-neuro/mode-session/infrastructure/repositories/prisma-mode-session-repository';
import { GetAllModesService } from '../../../contexts/prism-neuro/mode/application/get-all-mode.service';
import { GetModeByIdService } from '../../../contexts/prism-neuro/mode/application/get-mode-by-id.service';
import { GetModesService } from '../../../contexts/prism-neuro/mode/application/get-modes.service';
import { PrismaModeRepository } from '../../../contexts/prism-neuro/mode/infrastructure/repositories/prisma-mode-repository';
import { CreateModeSeeder } from '../../../contexts/prism-neuro/mode/infrastructure/seeders/create-mode.seeder';
import { EndModeTrialService } from '../../../contexts/prism-neuro/trial/application/end-mode-trial.service';
import { GetModeTrialsBySessionService } from '../../../contexts/prism-neuro/trial/application/get-mode-trial.service';
import { GetModeTrialsOfPatientService } from '../../../contexts/prism-neuro/trial/application/get-mode-trials-of-patient.service';
import { GetModeTrialsOfPhysioService } from '../../../contexts/prism-neuro/trial/application/get-mode-trials-of-physio.service';
import { StartModeTrialService } from '../../../contexts/prism-neuro/trial/application/start-mode-trial.service';
import { PrismaModeTrialRepository } from '../../../contexts/prism-neuro/trial/infrastructure/repositories/prisma-mode-trial-repository';
import { ChangePasswordService } from '../../../contexts/prism-neuro/users/application/change-password.service';
import { CreateDoctorByAdminService } from '../../../contexts/prism-neuro/users/application/create-doctor-by-admin.service';
import { CreatePatientByPhysioService } from '../../../contexts/prism-neuro/users/application/create-patient-by-physio.service';
import { AddUserSessionService } from '../../../contexts/prism-neuro/users/application/create-user-session.service';
import { DeleteAccountService } from '../../../contexts/prism-neuro/users/application/delete-account.service';
import { DeleteDoctorService } from '../../../contexts/prism-neuro/users/application/delete-doctor-by-admin.service';
import { DeleteOTPService } from '../../../contexts/prism-neuro/users/application/delete-otp.service';
import { DeleteUserSessionService } from '../../../contexts/prism-neuro/users/application/delete-user-session.service';
import { ForgotPasswordService } from '../../../contexts/prism-neuro/users/application/forgot-password.service';
import { GetAdminByEmailService } from '../../../contexts/prism-neuro/users/application/get-admin-email.service';
import { GetOtpService } from '../../../contexts/prism-neuro/users/application/get-otp.service';
import { GetTotalPatientsService } from '../../../contexts/prism-neuro/users/application/get-total-patients.service';
import { GetTotalUsersService } from '../../../contexts/prism-neuro/users/application/get-total-users.service';
import { GetUserByRoleService } from '../../../contexts/prism-neuro/users/application/get-user-by-role.service';
import { GetUserSessionService } from '../../../contexts/prism-neuro/users/application/get-user-session.service';
import { GetUsersService } from '../../../contexts/prism-neuro/users/application/get-users.service';
import { ImageUploadService } from '../../../contexts/prism-neuro/users/application/image-upload.service';
import { ResetPasswordService } from '../../../contexts/prism-neuro/users/application/reset-password.service';
import { UpdatePhysioService } from '../../../contexts/prism-neuro/users/application/update-doctor-by-admin.service';
import { UpdatePatientService } from '../../../contexts/prism-neuro/users/application/update-patient-by-physio.service';
import { UserTransformer } from '../../../contexts/prism-neuro/users/domain/transformer/user-transformer';
import { PrismaUserRepository } from '../../../contexts/prism-neuro/users/infrastructure/repositories/prisma-users-repository';
import { CreateAdminSeeder } from '../../../contexts/prism-neuro/users/infrastructure/seeders/create-admin.seeder';
import { JWTAdminAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import { JWTPatientAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/patient.authorizer';
import { JWTPhysioTherapistAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/physio.authorizer';
import { RefreshAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/refresh.authorizer';
import { JWTUserAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/user.authorizer';
import { SendPasswordToUserService } from '../../../contexts/shared/infrastructure/mail/application/send-password.service';
import { SendResetOtpService } from '../../../contexts/shared/infrastructure/mail/application/send-reset-otp.service';
import { PrismaMailerRepository } from '../../../contexts/shared/infrastructure/mail/infrastructure/repositories/prisma-mail-repostory';
import { ErrorMiddleware } from '../../../contexts/shared/infrastructure/middleware/error-middleware';
import { createPrismaClient } from '../../../contexts/shared/infrastructure/persistence/prisma';
import { RequestLogger } from '../../../contexts/shared/infrastructure/request-logs/request-logger';
import { ActivityTransformer } from '../../../contexts/shared/infrastructure/transformer/activity-transformer';
import { ModeTransformer } from '../../../contexts/shared/infrastructure/transformer/mode-transformer';
import { StatisticsTransformer } from '../../../contexts/shared/infrastructure/transformer/statistics-transformer';
import { ServerLogger } from '../../../contexts/shared/infrastructure/winston-logger/index';
import * as controller from './controllers';
import { Router } from './router';
import { masterRouter } from './routes/routes';
import { Server } from './server';

const {
  CreatePhysioController,
  DeletePhysioController,
  ForgotPasswordController,
  GenerateAccessTokenController,
  LoginAdminController,
  LoginDoctorController,
  LoginPatientController,
  UpdatePhysioController,
  GetAllPatientListByPhysioIdController,
  UserLogoutController,
  ChangePasswordController,
  ResetPasswordController,
  CreatePatientByPhysioController,
  EndModeTrialController,
  StartModeTrialController,
  GetModeSessionOfPatientController,
  GetTotalUsersController,
  GetModeAnalyticsController,
  GetModesController,
  GetModeTrialBySessionController,
  StartModeSessionController,
  GetAllPatientActivityController,
  GetAllPatientListsWithSessionController,
  GetModeSessionActivityOfPatientController,
  DeleteAccountController,
  GetPerformanceSummaryOfPatientController,
  GetModeComparisionController,
  GetPatientModeAnalyticsController,
  UpdatePatientProfileController,
  GetPhysioModeAnalyticsController,
  GetPerformanceSummaryOfPhysioController
} = controller;
export class Container {
  private readonly container: AwilixContainer;

  constructor() {
    this.container = createContainer({
      injectionMode: InjectionMode.CLASSIC
    });
    this.register();
  }

  public register(): void {
    // register server...
    this.container
      .register({
        router: asFunction(Router).singleton(),
        config: asValue(config),
        server: asClass(Server).singleton(),
        requestLogger: asClass(RequestLogger).singleton(),
        db: asFunction(createPrismaClient).singleton(),
        logger: asClass(ServerLogger).singleton()
      })
      //mail
      .register({
        prismaMailerRepository: asClass(PrismaMailerRepository).singleton(),
        sendResetOtpService: asClass(SendResetOtpService).singleton(),
        sendPasswordToUserService: asClass(SendPasswordToUserService).singleton()
      })
      .register({
        errorMiddleware: asClass(ErrorMiddleware).singleton(),
        masterRouter: asFunction(masterRouter).singleton()
      })
      // admin repository
      .register({
        prismaUserRepository: asClass(PrismaUserRepository),
        createDoctorByAdminService: asClass(CreateDoctorByAdminService).singleton(),
        createPhysioController: asClass(CreatePhysioController),
        getAdminByEmailService: asClass(GetAdminByEmailService).singleton(),
        getUsersService: asClass(GetUsersService).singleton()
      })
      //admin auth
      .register({
        loginAdminController: asClass(LoginAdminController),
        deleteAccountService: asClass(DeleteAccountService).singleton(),
        deleteAccountController: asClass(DeleteAccountController)
      })
      // general auth
      .register({
        forgotPasswordController: asClass(ForgotPasswordController)
      })
      //authorizer
      .register({
        adminAuthorizer: asClass(JWTAdminAuthorizer).singleton(),
        userAuthorizer: asClass(JWTUserAuthorizer).singleton(),
        physioAuthorizer: asClass(JWTPhysioTherapistAuthorizer).singleton(),
        generateAccessTokenController: asClass(GenerateAccessTokenController).singleton(),
        patientAuthorizer: asClass(JWTPatientAuthorizer).singleton()
      })
      // user session
      .register({
        addUserSessionService: asClass(AddUserSessionService).singleton(),
        getUserSessionService: asClass(GetUserSessionService).singleton(),
        deleteUserSessionService: asClass(DeleteUserSessionService).singleton()
      })
      // patient login
      .register({
        loginPatientController: asClass(LoginPatientController),
        loginPhysioController: asClass(LoginDoctorController)
      })
      //seeder
      .register({
        adminSeeder: asClass(CreateAdminSeeder).singleton(),
        modeSeeder: asClass(CreateModeSeeder).singleton()
      })
      //user logout
      .register({
        userLogoutController: asClass(UserLogoutController),
        refreshAuthorizer: asClass(RefreshAuthorizer),
        forgotPasswordService: asClass(ForgotPasswordService).singleton(),
        deleteOTPService: asClass(DeleteOTPService).singleton(),
        getOtpService: asClass(GetOtpService).singleton(),
        changePasswordService: asClass(ChangePasswordService).singleton(),
        resetPasswordService: asClass(ResetPasswordService).singleton(),
        changePasswordController: asClass(ChangePasswordController).singleton(),
        resetPasswordController: asClass(ResetPasswordController)
      })
      .register({
        getAllUsersController: asClass(controller.GetAllUsersController),
        getAllPatientListByPhysioIdController: asClass(GetAllPatientListByPhysioIdController),
        getUserByRoleService: asClass(GetUserByRoleService).singleton(),
        getAllPatientActivityController: asClass(GetAllPatientActivityController),
        getTotalUsersService: asClass(GetTotalUsersService).singleton(),
        getTotalUsersController: asClass(GetTotalUsersController),
        updatePatientService: asClass(UpdatePatientService).singleton(),
        updatePatientProfileController: asClass(UpdatePatientProfileController)
      })
      //doctor
      .register({
        deleteDoctorService: asClass(DeleteDoctorService).singleton(),
        updatePhysioService: asClass(UpdatePhysioService).singleton(),
        deletePhysioController: asClass(DeletePhysioController),
        updatePhysioController: asClass(UpdatePhysioController),
        createPatientByPhysioService: asClass(CreatePatientByPhysioService).singleton(),
        createPatientByPhysioController: asClass(CreatePatientByPhysioController),
        getAllPatientListsWithSessionController: asClass(GetAllPatientListsWithSessionController).singleton()
      })
      // mode
      .register({
        prismaModeRepository: asClass(PrismaModeRepository),
        getAllModesService: asClass(GetAllModesService),
        getModeAnalyticsController: asClass(GetModeAnalyticsController),
        getModeByIdService: asClass(GetModeByIdService).singleton(),
        prismaModeSessionRepository: asClass(PrismaModeSessionRepository),
        startModeSessionService: asClass(StartModeSessionService).singleton(),
        endModeSessionService: asClass(EndModeSessionService).singleton(),
        startModeSessionController: asClass(StartModeSessionController),
        updateModeSessionService: asClass(UpdateModeSessionService).singleton(),
        endModeSessionController: asClass(controller.EndModeSessionController),
        getModeSessionOfPhysioAndPatientService: asClass(GetModeSessionOfPhysioAndPatientService).singleton(),
        getSessionOfPateintService: asClass(GetSessionOfPateintService).singleton(),
        getModeSessionOfPatientController: asClass(GetModeSessionOfPatientController),
        getModesService: asClass(GetModesService).singleton(),
        getModesController: asClass(GetModesController),
        getModeSessionActivityOfPatientController: asClass(GetModeSessionActivityOfPatientController),
        getModeTrialsOfPatientService: asClass(GetModeTrialsOfPatientService).singleton(),
        getPerformanceSummaryOfPatientController: asClass(GetPerformanceSummaryOfPatientController),
        getModeComparisionController: asClass(GetModeComparisionController),
        getPatientModeAnalyticsController: asClass(GetPatientModeAnalyticsController),
        getPhysioModeAnalyticsController: asClass(GetPhysioModeAnalyticsController),
        getModeTrialsOfPhysioService: asClass(GetModeTrialsOfPhysioService).singleton(),
        getPerformanceSummaryOfPhysioController: asClass(GetPerformanceSummaryOfPhysioController),
        getTotalPatientsService: asClass(GetTotalPatientsService).singleton()
      })
      //mode trial session
      .register({
        prismaModeTrialRepository: asClass(PrismaModeTrialRepository),
        startModeTrialService: asClass(StartModeTrialService).singleton(),
        endModeTrialService: asClass(EndModeTrialService).singleton(),
        startModeTrialController: asClass(StartModeTrialController),
        endModeTrialController: asClass(EndModeTrialController),
        getModeTrialsBySessionService: asClass(GetModeTrialsBySessionService),
        getModeTrialBySessionController: asClass(GetModeTrialBySessionController)
      })
      //image upload
      .register({
        imageUploadService: asClass(ImageUploadService).singleton()
      })
      .register({
        userTransformer: asClass(UserTransformer),
        statisticsTransformer: asClass(StatisticsTransformer),
        modeTransformer: asClass(ModeTransformer),
        activityTransformer: asClass(ActivityTransformer)
      });
  }

  public invoke(): AwilixContainer {
    return this.container;
  }
}

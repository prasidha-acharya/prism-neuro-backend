import { AwilixContainer, InjectionMode, asClass, asFunction, asValue, createContainer } from 'awilix';
import { config } from '../../../../config';
import { EndModeSessionByPhsyioService } from '../../../contexts/prism-neuro/mode-session/application/end-session-by-physio.service';
import { EndModeSessionService } from '../../../contexts/prism-neuro/mode-session/application/end-session.service';
import { GetSessionOfPateintService } from '../../../contexts/prism-neuro/mode-session/application/get-session-of-patient.service';
import { GetModeSessionOfPhysioAndPatientService } from '../../../contexts/prism-neuro/mode-session/application/get-session.service';
import { StartModeSessionService } from '../../../contexts/prism-neuro/mode-session/application/start-session.service';
import { UpdateModeSessionService } from '../../../contexts/prism-neuro/mode-session/application/update-session.service';
import { PrismaModeSessionRepository } from '../../../contexts/prism-neuro/mode-session/infrastructure/repositories/prisma-mode-session-repository';
import { GetAllModesService } from '../../../contexts/prism-neuro/mode/application/get-all-mode.service';
import { GetModeAnalyticsOfAdminService } from '../../../contexts/prism-neuro/mode/application/get-mode-analytics-of-admin.service';
import { GetModeAnalyticsOfPatientService } from '../../../contexts/prism-neuro/mode/application/get-mode-analytics-of-patient.service';
import { GetModeAnalyticsOfPhysioService } from '../../../contexts/prism-neuro/mode/application/get-mode-analytics-of-physio.service';
import { GetModeByIdService } from '../../../contexts/prism-neuro/mode/application/get-mode-by-id.service';
import { GetModesByAdminService } from '../../../contexts/prism-neuro/mode/application/get-modes-by-admin.service';
import { GetActiveSessionModesByPhysioService } from '../../../contexts/prism-neuro/mode/application/get-modes-by-physio.service';
import { PrismaModeRepository } from '../../../contexts/prism-neuro/mode/infrastructure/repositories/prisma-mode-repository';
import { EndModeTrialService } from '../../../contexts/prism-neuro/trial/application/end-mode-trial.service';
import { GetModeTrialsBySessionService } from '../../../contexts/prism-neuro/trial/application/get-mode-trial.service';
import { GetModeTrialsOfPatientService } from '../../../contexts/prism-neuro/trial/application/get-mode-trials-of-patient.service';
import { GetModeTrialsOfPhysioService } from '../../../contexts/prism-neuro/trial/application/get-mode-trials-of-physio.service';
import { StartModeTrialService } from '../../../contexts/prism-neuro/trial/application/start-mode-trial.service';
import { PrismaModeTrialRepository } from '../../../contexts/prism-neuro/trial/infrastructure/repositories/prisma-mode-trial-repository';
import { ChangePasswordService } from '../../../contexts/prism-neuro/users/application/change-password.service';
import { CreatePatientByPhysioService } from '../../../contexts/prism-neuro/users/application/create-patient-by-physio.service';
import { CreatePhysioByAdminService } from '../../../contexts/prism-neuro/users/application/create-physio-by-admin.service';
import { AddUserSessionService } from '../../../contexts/prism-neuro/users/application/create-user-session.service';
import { DeleteAccountService } from '../../../contexts/prism-neuro/users/application/delete-account.service';
import { DeleteOTPService } from '../../../contexts/prism-neuro/users/application/delete-otp.service';
import { DeletePatientByAdminService } from '../../../contexts/prism-neuro/users/application/delete-patient-by-physio.service';
import { DeleteUserService } from '../../../contexts/prism-neuro/users/application/delete-physio-by-admin.service';
import { DeleteUserSessionService } from '../../../contexts/prism-neuro/users/application/delete-user-session.service';
import { ForgotPasswordService } from '../../../contexts/prism-neuro/users/application/forgot-password.service';
import { GetAdminByEmailService } from '../../../contexts/prism-neuro/users/application/get-admin-email.service';
import { GetAllPatientsActivityByAdminService } from '../../../contexts/prism-neuro/users/application/get-all-patients-activity-by-admin.service';
import { GetAllPatientsActivityByPhysioService } from '../../../contexts/prism-neuro/users/application/get-all-patients-activity-by-physio.service';
import { GetOtpService } from '../../../contexts/prism-neuro/users/application/get-otp.service';
import { GetTotalPatientsService } from '../../../contexts/prism-neuro/users/application/get-total-patients.service';
import { GetTotalUsersService } from '../../../contexts/prism-neuro/users/application/get-total-users.service';
import { GetUserByRoleService } from '../../../contexts/prism-neuro/users/application/get-user-by-role.service';
import { GetUserSessionService } from '../../../contexts/prism-neuro/users/application/get-user-session.service';
import { GetUsersService } from '../../../contexts/prism-neuro/users/application/get-users.service';
import { ResetPasswordService } from '../../../contexts/prism-neuro/users/application/reset-password.service';
import { UpdateLastLoginService } from '../../../contexts/prism-neuro/users/application/update-last-login.service';
import { UpdatePatientService } from '../../../contexts/prism-neuro/users/application/update-patient-by-physio.service';
import { UpdatePhysioService } from '../../../contexts/prism-neuro/users/application/update-physio-by-admin.service';
import { UserTransformer } from '../../../contexts/prism-neuro/users/domain/transformer/user-transformer';
import { PrismaUserRepository } from '../../../contexts/prism-neuro/users/infrastructure/repositories/prisma-users-repository';
import { JWTAdminAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import { JWTPatientAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/patient.authorizer';
import { JWTPhysioTherapistAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/physio.authorizer';
import { RefreshAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/refresh.authorizer';
import { JWTUserAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/user.authorizer';
import { CreateFileService } from '../../../contexts/shared/infrastructure/file/application/create-file.service';
import { DeleteFileFromBucketService } from '../../../contexts/shared/infrastructure/file/application/delete-file-from-bucket.service';
import { GetFilesService } from '../../../contexts/shared/infrastructure/file/application/get-files.service';
import { GetSignedURLService } from '../../../contexts/shared/infrastructure/file/application/get-signed-url.service';
import { UploadFileToBucketService } from '../../../contexts/shared/infrastructure/file/application/upload-file-to-bucket.service';
import { PrismaFileRepository } from '../../../contexts/shared/infrastructure/file/infrastructure/repositories/prisma-file-repository';
import { SendPasswordToUserService } from '../../../contexts/shared/infrastructure/mail/application/send-password.service';
import { SendResetOtpService } from '../../../contexts/shared/infrastructure/mail/application/send-reset-otp.service';
import { PrismaMailerRepository } from '../../../contexts/shared/infrastructure/mail/infrastructure/repositories/prisma-mail-repostory';
import { ErrorMiddleware } from '../../../contexts/shared/infrastructure/middleware/error-middleware';
import { createPrismaClient } from '../../../contexts/shared/infrastructure/persistence/prisma';
import { RequestLogger } from '../../../contexts/shared/infrastructure/request-logs/request-logger';
import { ActivityTransformer } from '../../../contexts/shared/infrastructure/transformer/activity-transformer';
import { FileTransformer } from '../../../contexts/shared/infrastructure/transformer/files.transformer';
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
  LoginPhysioController,
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
  GetPerformanceSummaryOfPhysioController,
  DeletePatientByAdminController,
  GetModeSessionActivityOfPatientByPhysioController,
  GetSessionsBetweenPatientAndPhysioController,
  GetModeSessionsByPatientIdController,
  DeleteFilesController,
  UpdatePatientProfileByPhysioController,
  UploadModeFilesController,
  GetModeFilesController,
  UploadProfileImageController,
  UpdatePhysioByPhysioController,
  GetUserDetailController,
  UpdateAdminProfileController,
  GetModesByAdminController,
  GetStaticFilesController,
  HealthCheckController,
  GetUserDetailByIdController
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
      // Admin repository
      .register({
        prismaUserRepository: asClass(PrismaUserRepository),
        createPhysioByAdminService: asClass(CreatePhysioByAdminService).singleton(),
        createPhysioController: asClass(CreatePhysioController),
        getAdminByEmailService: asClass(GetAdminByEmailService).singleton(),
        getUsersService: asClass(GetUsersService).singleton(),
        updateAdminProfileController: asClass(UpdateAdminProfileController)
      })
      //Admin auth
      .register({
        loginAdminController: asClass(LoginAdminController),
        deleteAccountService: asClass(DeleteAccountService).singleton(),
        deleteAccountController: asClass(DeleteAccountController)
      })
      // General auth
      .register({
        forgotPasswordController: asClass(ForgotPasswordController)
      })
      //Authorizer
      .register({
        adminAuthorizer: asClass(JWTAdminAuthorizer).singleton(),
        userAuthorizer: asClass(JWTUserAuthorizer).singleton(),
        physioAuthorizer: asClass(JWTPhysioTherapistAuthorizer).singleton(),
        generateAccessTokenController: asClass(GenerateAccessTokenController).singleton(),
        patientAuthorizer: asClass(JWTPatientAuthorizer).singleton()
      })
      // User session
      .register({
        addUserSessionService: asClass(AddUserSessionService).singleton(),
        getUserSessionService: asClass(GetUserSessionService).singleton(),
        deleteUserSessionService: asClass(DeleteUserSessionService).singleton()
      })
      // Login
      .register({
        loginPhysioController: asClass(LoginPhysioController)
      })
      //User logout
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
        updatePatientProfileController: asClass(UpdatePatientProfileController),
        deletePatientByAdminService: asClass(DeletePatientByAdminService).singleton(),
        deletePatientByAdminController: asClass(DeletePatientByAdminController),
        getAllPatientsActivityByPhysioService: asClass(GetAllPatientsActivityByPhysioService).singleton(),
        getUserDetailController: asClass(GetUserDetailController),
        updateLastLoginService: asClass(UpdateLastLoginService).singleton(),
        getUserDetailByIdController: asClass(GetUserDetailByIdController)
      })
      //Physio
      .register({
        deleteUserService: asClass(DeleteUserService).singleton(),
        updatePhysioService: asClass(UpdatePhysioService).singleton(),
        deletePhysioController: asClass(DeletePhysioController),
        updatePhysioController: asClass(UpdatePhysioController),
        createPatientByPhysioService: asClass(CreatePatientByPhysioService).singleton(),
        createPatientByPhysioController: asClass(CreatePatientByPhysioController),
        getAllPatientListsWithSessionController: asClass(GetAllPatientListsWithSessionController),
        updatePatientProfileByPhysioController: asClass(UpdatePatientProfileByPhysioController),
        updatePhysioByPhysioController: asClass(UpdatePhysioByPhysioController)
      })
      // Mode
      .register({
        prismaModeRepository: asClass(PrismaModeRepository),
        getAllModesService: asClass(GetAllModesService).singleton(),
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
        getModesController: asClass(GetModesController),
        getModeSessionActivityOfPatientController: asClass(GetModeSessionActivityOfPatientController),
        getModeTrialsOfPatientService: asClass(GetModeTrialsOfPatientService).singleton(),
        getPerformanceSummaryOfPatientController: asClass(GetPerformanceSummaryOfPatientController),
        getModeComparisionController: asClass(GetModeComparisionController),
        getPatientModeAnalyticsController: asClass(GetPatientModeAnalyticsController),
        getPhysioModeAnalyticsController: asClass(GetPhysioModeAnalyticsController),
        getModeTrialsOfPhysioService: asClass(GetModeTrialsOfPhysioService).singleton(),
        getPerformanceSummaryOfPhysioController: asClass(GetPerformanceSummaryOfPhysioController),
        getTotalPatientsService: asClass(GetTotalPatientsService).singleton(),
        getModeSessionActivityOfPatientByPhysioController: asClass(GetModeSessionActivityOfPatientByPhysioController),
        getSessionsBetweenPatientAndPhysioController: asClass(GetSessionsBetweenPatientAndPhysioController),
        getModeSessionsByPatientIdController: asClass(GetModeSessionsByPatientIdController),
        getAllPatientsActivityByAdminService: asClass(GetAllPatientsActivityByAdminService).singleton(),
        endModeSessionByPhsyioService: asClass(EndModeSessionByPhsyioService).singleton(),
        getModesByAdminController: asClass(GetModesByAdminController),
        getStaticFilesController: asClass(GetStaticFilesController),
        getModeAnalyticsOfPatientService: asClass(GetModeAnalyticsOfPatientService).singleton(),
        getModeAnalyticsOfPhysioService: asClass(GetModeAnalyticsOfPhysioService).singleton(),
        getModeAnalyticsOfAdminService: asClass(GetModeAnalyticsOfAdminService).singleton(),
        getModesByAdminService: asClass(GetModesByAdminService).singleton(),
        getModesByPhysioService: asClass(GetActiveSessionModesByPhysioService).singleton()
      })
      //Mode trial session
      .register({
        prismaModeTrialRepository: asClass(PrismaModeTrialRepository),
        startModeTrialService: asClass(StartModeTrialService).singleton(),
        endModeTrialService: asClass(EndModeTrialService).singleton(),
        startModeTrialController: asClass(StartModeTrialController),
        endModeTrialController: asClass(EndModeTrialController),
        getModeTrialsBySessionService: asClass(GetModeTrialsBySessionService).singleton(),
        getModeTrialBySessionController: asClass(GetModeTrialBySessionController)
      })
      //Image upload
      .register({
        uploadModeFilesController: asClass(UploadModeFilesController),
        uploadFileToBucketService: asClass(UploadFileToBucketService).singleton(),
        prismaFileRepository: asClass(PrismaFileRepository),
        createFileService: asClass(CreateFileService).singleton(),
        getSignedURLService: asClass(GetSignedURLService).singleton(),
        getFilesService: asClass(GetFilesService).singleton(),
        getModeFilesController: asClass(GetModeFilesController),
        deleteFileFromBucketService: asClass(DeleteFileFromBucketService),
        deleteFilesController: asClass(DeleteFilesController),
        uploadProfileImageController: asClass(UploadProfileImageController)
      })
      //Transformer
      .register({
        userTransformer: asClass(UserTransformer),
        statisticsTransformer: asClass(StatisticsTransformer),
        modeTransformer: asClass(ModeTransformer),
        activityTransformer: asClass(ActivityTransformer),
        fileTransformer: asClass(FileTransformer)
      })
      .register({
        healthCheckController: asClass(HealthCheckController)
      });
  }

  public invoke(): AwilixContainer {
    return this.container;
  }
}

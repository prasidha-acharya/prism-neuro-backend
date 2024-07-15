import { AwilixContainer, InjectionMode, asClass, asFunction, asValue, createContainer } from 'awilix';
import { config } from '../../../../config';
import { EndModeSessionService } from '../../../contexts/prism-neuro/mode-session/application/end-session.service';
import { GetSessionOfPateintService } from '../../../contexts/prism-neuro/mode-session/application/get-session-of-patient.service';
import { GetModeSessionOfPhysioAndPatientService } from '../../../contexts/prism-neuro/mode-session/application/get-session.service';
import { StartModeSessionService } from '../../../contexts/prism-neuro/mode-session/application/start-session.service';
import { UpdateModeSessionService } from '../../../contexts/prism-neuro/mode-session/application/update-session.service';
import { PrismaModeSessionRepository } from '../../../contexts/prism-neuro/mode-session/infrastructure/repositories/prisma-mode-session-repository';
import { GetModeByIdService } from '../../../contexts/prism-neuro/mode/application/get-mode-by-id.service';
import { PrismaModeRepository } from '../../../contexts/prism-neuro/mode/infrastructure/repositories/prisma-mode-repository';
import { CreateModeSeeder } from '../../../contexts/prism-neuro/mode/infrastructure/seeders/create-mode.seeder';
import { EndModeTrialService } from '../../../contexts/prism-neuro/trial/application/end-mode-trial.service';
import { GetModeTrialsBySessionService } from '../../../contexts/prism-neuro/trial/application/get-mode-trial.service';
import { StartModeTrialService } from '../../../contexts/prism-neuro/trial/application/start-mode-trial.service';
import { PrismaModeTrialRepository } from '../../../contexts/prism-neuro/trial/infrastructure/repositories/prisma-mode-trial-repository';
import { ChangePasswordService } from '../../../contexts/prism-neuro/users/application/change-password.service';
import { CreateDoctorByAdminService } from '../../../contexts/prism-neuro/users/application/create-doctor-by-admin.service';
import { CreatePatientByPhysioService } from '../../../contexts/prism-neuro/users/application/create-patient-by-physio.service';
import { AddUserSessionService } from '../../../contexts/prism-neuro/users/application/create-user-session.service';
import { DeleteDoctorService } from '../../../contexts/prism-neuro/users/application/delete-doctor-by-admin.service';
import { DeleteOTPService } from '../../../contexts/prism-neuro/users/application/delete-otp.service';
import { DeleteUserSessionService } from '../../../contexts/prism-neuro/users/application/delete-user-session.service';
import { ForgotPasswordService } from '../../../contexts/prism-neuro/users/application/forgot-password.service';
import { GetAdminByEmailService } from '../../../contexts/prism-neuro/users/application/get-admin-email.service';
import { GetOtpService } from '../../../contexts/prism-neuro/users/application/get-otp.service';
import { GetUserByRoleService } from '../../../contexts/prism-neuro/users/application/get-user-by-role.service';
import { GetUserSessionService } from '../../../contexts/prism-neuro/users/application/get-user-session.service';
import { GetUsersService } from '../../../contexts/prism-neuro/users/application/get-users.service';
import { ImageUploadService } from '../../../contexts/prism-neuro/users/application/image-upload.service';
import { ResetPasswordService } from '../../../contexts/prism-neuro/users/application/reset-password.service';
import { UpdatePhysioService } from '../../../contexts/prism-neuro/users/application/update-doctor-by-admin.service';
import { UserTransformer } from '../../../contexts/prism-neuro/users/domain/transformer/user-transformer';
import { PrismaUserRepository } from '../../../contexts/prism-neuro/users/infrastructure/repositories/prisma-users-repository';
import { CreateAdminSeeder } from '../../../contexts/prism-neuro/users/infrastructure/seeders/create-admin.seeder';
import { JWTAdminAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import { JWTDoctorAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/doctor.authorizer';
import { RefreshAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/refresh.authorizer';
import { JWTUserAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/user.authorizer';
import { SendPasswordToUserService } from '../../../contexts/shared/infrastructure/mail/application/send-password.service';
import { SendResetOtpService } from '../../../contexts/shared/infrastructure/mail/application/send-reset-otp.service';
import { PrismaMailerRepository } from '../../../contexts/shared/infrastructure/mail/infrastructure/repositories/prisma-mail-repostory';
import { ErrorMiddleware } from '../../../contexts/shared/infrastructure/middleware/error-middleware';
import { createPrismaClient } from '../../../contexts/shared/infrastructure/persistence/prisma';
import { RequestLogger } from '../../../contexts/shared/infrastructure/request-logs/request-logger';
import { ServerLogger } from '../../../contexts/shared/infrastructure/winston-logger/index';
import * as controller from './controllers';
import { StartModeSessionController } from './controllers/mode-session/start-mode-session.controller';
import { GetModeTrialBySessionController } from './controllers/mode-trial/get-mode-trial.controller';
import { GetAllPatientListsWithSessionController } from './controllers/physio/get-patient-lists.controller';
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
  GetModeSessionOfPatientController
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
        loginAdminController: asClass(LoginAdminController)
      })
      // general auth
      .register({
        forgotPasswordController: asClass(ForgotPasswordController)
      })
      //authorizer
      .register({
        adminAuthorizer: asClass(JWTAdminAuthorizer).singleton(),
        userAuthorizer: asClass(JWTUserAuthorizer).singleton(),
        physioAuthorizer: asClass(JWTDoctorAuthorizer).singleton(),
        generateAccessTokenController: asClass(GenerateAccessTokenController).singleton()
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
        getUserByRoleService: asClass(GetUserByRoleService).singleton()
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
        getModeByIdService: asClass(GetModeByIdService).singleton(),
        prismaModeSessionRepository: asClass(PrismaModeSessionRepository),
        startModeSessionService: asClass(StartModeSessionService).singleton(),
        endModeSessionService: asClass(EndModeSessionService).singleton(),
        startModeSessionController: asClass(StartModeSessionController),
        updateModeSessionService: asClass(UpdateModeSessionService).singleton(),
        endModeSessionController: asClass(controller.EndModeSessionController),
        getModeSessionOfPhysioAndPatientService: asClass(GetModeSessionOfPhysioAndPatientService).singleton(),
        getSessionOfPateintService: asClass(GetSessionOfPateintService).singleton(),
        getModeSessionOfPatientController: asClass(GetModeSessionOfPatientController)
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
        userTransformer: asClass(UserTransformer)
      });
  }

  public invoke(): AwilixContainer {
    return this.container;
  }
}

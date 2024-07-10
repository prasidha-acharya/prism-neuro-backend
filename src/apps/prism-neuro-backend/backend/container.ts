import { AwilixContainer, InjectionMode, asClass, asFunction, asValue, createContainer } from 'awilix';
import { config } from '../../../../config';
import { EndModeSessionService } from '../../../contexts/prism-neuro/mode-session/application/end-session.service';
import { StartModeSessionService } from '../../../contexts/prism-neuro/mode-session/application/start-session.service';
import { PrismaModeSessionRepository } from '../../../contexts/prism-neuro/mode-session/infrastructure/repositories/prisma-mode-session-repository';
import { PrismaModeRepository } from '../../../contexts/prism-neuro/mode/infrastructure/repositories/prisma-mode-repository';
import { CreateModeSeeder } from '../../../contexts/prism-neuro/mode/infrastructure/seeders/create-mode.seeder';
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
import { GetUserSessionService } from '../../../contexts/prism-neuro/users/application/get-user-session.service';
import { GetUsersService } from '../../../contexts/prism-neuro/users/application/get-users.service';
import { ResetPasswordService } from '../../../contexts/prism-neuro/users/application/reset-password.service';
import { UpdateDoctorService } from '../../../contexts/prism-neuro/users/application/update-doctor-by-admin.service';
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
import { Router } from './router';
import { masterRouter } from './routes/routes';
import { Server } from './server';

const {
  CreateDoctorController,
  DeleteDoctorController,
  ForgotPasswordController,
  GenerateAccessTokenController,
  LoginAdminController,
  LoginDoctorController,
  LoginPatientController,
  UpdateDoctorController,
  UserLogoutController,
  ChangePasswordController,
  ResetPasswordController,
  CreatePatientByPhysioController
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
        createDoctorController: asClass(CreateDoctorController),
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
        loginDoctorController: asClass(LoginDoctorController)
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
        getAllPatientListByPhysioIdController: asClass(controller.GetAllPatientListByPhysioIdController)
      })
      //doctor
      .register({
        deleteDoctorService: asClass(DeleteDoctorService).singleton(),
        updateDoctorService: asClass(UpdateDoctorService).singleton(),
        deleteDoctorController: asClass(DeleteDoctorController),
        updateDoctorController: asClass(UpdateDoctorController),
        createPatientByPhysioService: asClass(CreatePatientByPhysioService).singleton(),
        createPatientByPhysioController: asClass(CreatePatientByPhysioController)
      })
      // mode
      .register({
        prismaModeRepository: asClass(PrismaModeRepository),
        prismaModeSessionRepository: asClass(PrismaModeSessionRepository),
        startModeSessionService: asClass(StartModeSessionService).singleton(),
        endModeSessionService: asClass(EndModeSessionService).singleton(),
        startModeSessionController: asClass(StartModeSessionController),
        endModeSessionController: asClass(controller.EndModeSessionController)
      });
  }

  public invoke(): AwilixContainer {
    return this.container;
  }
}

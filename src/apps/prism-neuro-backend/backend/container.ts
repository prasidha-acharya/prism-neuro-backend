import { AwilixContainer, InjectionMode, asClass, asFunction, asValue, createContainer } from 'awilix';
import { config } from '../../../../config';
import { ChangePasswordService } from '../../../contexts/prism-neuro/users/application/change-password.service';
import { CreateDoctorByAdminService } from '../../../contexts/prism-neuro/users/application/create-doctor-by-admin.service';
import { AddUserSessionService } from '../../../contexts/prism-neuro/users/application/create-user-session.service';
import { DeleteDoctorService } from '../../../contexts/prism-neuro/users/application/delete-doctor-by-admin.service';
import { DeleteOTPService } from '../../../contexts/prism-neuro/users/application/delete-otp.service';
import { DeleteUserSessionService } from '../../../contexts/prism-neuro/users/application/delete-user-session.service';
import { ForgotPasswordService } from '../../../contexts/prism-neuro/users/application/forgot-password.service';
import { GetAdminByEmailService } from '../../../contexts/prism-neuro/users/application/get-admin-email.service';
import { GetOtpService } from '../../../contexts/prism-neuro/users/application/get-otp.service';
import { GetUserSessionService } from '../../../contexts/prism-neuro/users/application/get-user-session.service';
import { ResetPasswordService } from '../../../contexts/prism-neuro/users/application/reset-password.service';
import { UpdateDoctorService } from '../../../contexts/prism-neuro/users/application/update-doctor-by-admin.service';
import { PrismaUserRepository } from '../../../contexts/prism-neuro/users/infrastructure/repositories/prisma-users-repository';
import { CreateAdminSeeder } from '../../../contexts/prism-neuro/users/infrastructure/seeders/create-admin.seeder';
import { JWTAdminAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import { JWTDoctorAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/doctor.authorizer';
import { RefreshAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/refresh.authorizer';
import { JWTUserAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/user.authorizer';
import { ErrorMiddleware } from '../../../contexts/shared/infrastructure/middleware/error-middleware';
import { createPrismaClient } from '../../../contexts/shared/infrastructure/persistence/prisma';
import { RequestLogger } from '../../../contexts/shared/infrastructure/request-logs/request-logger';
import { ServerLogger } from '../../../contexts/shared/infrastructure/winston-logger/index';
import * as controller from './controllers';
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
  ResetPasswordController
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
      .register({
        errorMiddleware: asClass(ErrorMiddleware).singleton(),
        masterRouter: asFunction(masterRouter).singleton()
      })
      // admin repository
      .register({
        prismaUserRepository: asClass(PrismaUserRepository),
        createDoctorByAdminService: asClass(CreateDoctorByAdminService).singleton(),
        createDoctorController: asClass(CreateDoctorController),
        getAdminByEmailService: asClass(GetAdminByEmailService).singleton()
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
        doctorAuthorizer: asClass(JWTDoctorAuthorizer).singleton(),
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
      .register({ adminSeeder: asClass(CreateAdminSeeder).singleton() })
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
      //doctor
      .register({
        deleteDoctorService: asClass(DeleteDoctorService).singleton(),
        updateDoctorService: asClass(UpdateDoctorService).singleton(),
        deleteDoctorController: asClass(DeleteDoctorController),
        updateDoctorController: asClass(UpdateDoctorController)
      });
  }

  public invoke(): AwilixContainer {
    return this.container;
  }
}

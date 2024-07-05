import { AwilixContainer, InjectionMode, asClass, asFunction, asValue, createContainer } from 'awilix';
import { DeleteDoctorService } from 'src/contexts/prism-neuro/users/application/delete-doctor-by-admin.service';
import { UpdateDoctorService } from 'src/contexts/prism-neuro/users/application/update-doctor-by-admin.service';
import { config } from '../../../../config';
import { CreateDoctorByAdminService } from '../../../contexts/prism-neuro/users/application/create-doctor-by-admin.service';
import { AddUserSessionService } from '../../../contexts/prism-neuro/users/application/create-user-session.service';
import { DeleteUserSessionService } from '../../../contexts/prism-neuro/users/application/delete-user-session.service';
import { GetAdminByEmailService } from '../../../contexts/prism-neuro/users/application/get-admin-email.service';
import { GetUserSessionService } from '../../../contexts/prism-neuro/users/application/get-user-session.service';
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
import { LoginAdminController, LoginDoctorController } from './controllers';
import { CreateDoctorController } from './controllers/admin/doctor/create-doctor.controller';
import { GenerateAccessTokenController } from './controllers/general/access-token.controller';
import { UserLogoutController } from './controllers/general/logout.controller';
import { LoginPatientController } from './controllers/patient/login-patient.controller';
import { Router } from './router';
import { masterRouter } from './routes/routes';
import { Server } from './server';

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
        refreshAuthorizer: asClass(RefreshAuthorizer)
      })
      //doctor
      .register({
        deleteDoctorService: asClass(DeleteDoctorService).singleton(),
        updateDoctorService: asClass(UpdateDoctorService).singleton()
      });
  }

  public invoke(): AwilixContainer {
    return this.container;
  }
}

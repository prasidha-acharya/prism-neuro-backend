import { AwilixContainer, InjectionMode, asClass, asFunction, asValue, createContainer } from 'awilix';
import { config } from '../../../../config';
import { CreateDoctorByAdminService } from '../../../contexts/prism-neuro/users/application/create-doctor-by-admin.service';
import { GetAdminByEmailService } from '../../../contexts/prism-neuro/users/application/get-admin-email.service';
import { PrismaUserRepository } from '../../../contexts/prism-neuro/users/infrastructure/repositories/prisma-users-repository';
import { CreateAdminSeeder } from '../../../contexts/prism-neuro/users/infrastructure/seeders/create-admin.seeder';
import { JWTAdminAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import { ErrorMiddleware } from '../../../contexts/shared/infrastructure/middleware/error-middleware';
import { createPrismaClient } from '../../../contexts/shared/infrastructure/persistence/prisma';
import { RequestLogger } from '../../../contexts/shared/infrastructure/request-logs/request-logger';
import { ServerLogger } from '../../../contexts/shared/infrastructure/winston-logger/index';
import { LoginAdminController } from './controllers';
import { CreateDoctorController } from './controllers/admin/doctor/create-doctor.controller';
import { GenerateAccessTokenController } from './controllers/general/access-token.controller';
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
        generateAccessTokenController: asClass(GenerateAccessTokenController).singleton()
      })
      // patient login
      .register({
        loginPatientController: asClass(LoginPatientController)
      })
      //seeder
      .register({ adminSeeder: asClass(CreateAdminSeeder).singleton() });
  }

  public invoke(): AwilixContainer {
    return this.container;
  }
}

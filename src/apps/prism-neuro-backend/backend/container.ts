import { AwilixContainer, InjectionMode, asClass, asFunction, asValue, createContainer } from 'awilix';
import { PrismaDoctorRepository } from 'src/contexts/prism-neuro/admin/infrastructure/repositories/prisma-doctor-repository';
import { config } from '../../../../config';
import { CreateDoctorService } from '../../../contexts/prism-neuro/admin/application/create-doctor.service';
import { GetAdminByEmailService } from '../../../contexts/prism-neuro/admin/application/get-admin-email.service';
import { PrismaAdminRepository } from '../../../contexts/prism-neuro/admin/infrastructure/repositories/prisma-admin-repository';
import { CreateAdminSeeder } from '../../../contexts/prism-neuro/admin/infrastructure/seeders/create-admin.seeder';
import { JWTAdminAuthorizer } from '../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import { ErrorMiddleware } from '../../../contexts/shared/infrastructure/middleware/error-middleware';
import { createPrismaClient } from '../../../contexts/shared/infrastructure/persistence/prisma';
import { RequestLogger } from '../../../contexts/shared/infrastructure/request-logs/request-logger';
import { ServerLogger } from '../../../contexts/shared/infrastructure/winston-logger/index';
import { CreateDoctorController } from './controllers/admin/doctor/create-doctor.controller';
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
        prismaAdminRepository: asClass(PrismaAdminRepository),
        createDoctorService: asClass(CreateDoctorService).singleton(),
        createDoctorController: asClass(CreateDoctorController),
        getAdminByEmailService: asClass(GetAdminByEmailService).singleton()
      })
      //admin doctor
      .register({
        prismaDoctorRepository: asClass(PrismaDoctorRepository).singleton()
      })
      //authorizer
      .register({
        adminAuthorizer: asClass(JWTAdminAuthorizer).singleton()
      })
      //seeder
      .register({ adminSeeder: asClass(CreateAdminSeeder).singleton() });
  }

  public invoke(): AwilixContainer {
    return this.container;
  }
}

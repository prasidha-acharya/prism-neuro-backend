import { AwilixContainer, InjectionMode, asClass, asFunction, asValue, createContainer } from 'awilix';
import { Router } from './router';
import { config } from '../../../../config';
import { Server } from './server';
import { masterRouter } from './routes/routes';
import { RequestLogger } from '../../../contexts/shared/infrastructure/request-logs/request-logger';
import { createPrismaClient } from '../../../contexts/shared/infrastructure/persistence/prisma';
import { ServerLogger } from '../../../contexts/shared/infrastructure/winston-logger/index';
import { ErrorMiddleware } from '../../../contexts/shared/infrastructure/middleware/error-middleware';

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
      });
  }

  public invoke(): AwilixContainer {
    return this.container;
  }
}

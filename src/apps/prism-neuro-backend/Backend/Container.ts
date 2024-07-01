import { AwilixContainer, InjectionMode, asClass, asFunction, asValue, createContainer } from 'awilix';
import { Router } from './Router';
import { config } from '../../../../config';
import { Server } from './Server';
import { masterRouter } from './routes/routes';

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
        server: asClass(Server).singleton()
      })
      .register({
        // errorMiddleware: asClass(ErrorMiddleware).singleton()
        masterRouter: asFunction(masterRouter).singleton()
      });
  }

  public invoke(): AwilixContainer {
    return this.container;
  }
}

import { Configuration } from '../../../../config';
import { CreateAdminSeeder } from '../../../contexts/prism-neuro/users/infrastructure/seeders/create-admin.seeder';
import { Container } from './container';
import { Server } from './server';
const container = new Container();
const server = container.invoke().resolve<Server>('server');
const config = container.invoke().resolve<Configuration>('config');
const adminCreationSeeder = container.invoke().resolve<CreateAdminSeeder>('adminSeeder');
// const createModeSeeder = container.invoke().resolve<CreateModeSeeder>('modeSeeder');

server
  .start()
  .then(() => {
    adminCreationSeeder.invoke();
    // createModeSeeder.invoke();
    console.log('🚀 ~ Environment:', config.NODE_ENV, '🚀 ~  App Log :', config.APP_LOG_LEVEL);
  })

  .catch(error => {
    console.log(error);
    process.exit(1);
  });

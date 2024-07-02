import { Configuration } from '../../../../config';
import { Container } from './Container';
import { Server } from './Server';

const container = new Container();
const server = container.invoke().resolve<Server>('server');
const config = container.invoke().resolve<Configuration>('config');

server
  .start()
  .then(() => {
    console.log('🚀 ~ Environment:', config.NODE_ENV, '🚀 ~  App Log', config.APP_LOG_LEVEL);
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

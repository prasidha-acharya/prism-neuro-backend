import path from 'path';
import swaggerAutogen from 'swagger-autogen';
import { config } from '../../../../../config/index';
import { AdminSchema } from '../../../../contexts/prism-neuro/admin/infrastructure/swagger/schema';

const doc = {
  info: {
    title: 'Neuro API',
    description: 'Description'
  },
  schemes: ['http', 'https'],
  host: [`${config.BASE_URL}`],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    },
    schemas: {
      createDoctorRequest: AdminSchema.createDoctorRequest
    },
    parameters: {}
  }
};

const routes = [path.join(__dirname, '../../../../apps/prism-neuro-backend/backend/routes/**/*.routes.ts')];
const outputFile = path.join(__dirname, '../../../../../swaggerApi.json');

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);

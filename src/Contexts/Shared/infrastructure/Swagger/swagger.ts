import swaggerAutogen from 'swagger-autogen';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.BASE_URL ,"Base urlll")
const doc = {
  info: {
    title: 'Neuro API',
    description: 'Description'
  },
  schemes: ['http', 'https'],
  host: [`${process.env.BASE_URL}`]
};

const routes = [path.join(__dirname, '../../../../apps/prism-neuro-backend/backend/routes/**/*.routes.ts')];
const outputFile = path.join(__dirname, '../../../../../swaggerApi.json');

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);

import bodyParser from 'body-parser';
import cors from 'cors';
import { Router as ExpressRouter } from 'express';
import helmet from 'helmet';
import { ErrorMiddleware } from 'src/contexts/shared/infrastructure/middleware/error-middleware';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../../../swaggerApi.json';

export const Router = (masterRouter: ExpressRouter, errorMiddleware: ErrorMiddleware): ExpressRouter => {
  const router = ExpressRouter();

  router
    .use(helmet())
    .use(cors())
    .use(bodyParser.json())
    .use(
      bodyParser.urlencoded({
        extended: false
      })
    );
  router.use('/api', masterRouter);

  router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  router.use(errorMiddleware.routeNotFoundErrorHandler);

  router.use(errorMiddleware.clientErrorHandler);

  router.use(errorMiddleware.InternalServerError);
  return router;
};

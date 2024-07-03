import { Router as ExpressRouter } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../../../swaggerApi.json';
import { ErrorMiddleware } from 'src/contexts/shared/infrastructure/middleware/error-middleware';

export const Router = (masterRouter: ExpressRouter, errorMiddleware: ErrorMiddleware): ExpressRouter => {
  const router = ExpressRouter();

  router.use('/api', masterRouter);

  router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  router.use(errorMiddleware.routeNotFoundErrorHandler);

  router.use(errorMiddleware.clientErrorHandler);

  router.use(errorMiddleware.InternalServerError);
  return router;
};

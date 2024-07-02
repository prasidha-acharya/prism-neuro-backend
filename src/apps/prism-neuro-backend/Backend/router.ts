import { Router as ExpressRouter } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../../../swaggerApi.json';

export const Router = (masterRouter: ExpressRouter) => {
  const router = ExpressRouter();

  router.use('/api', masterRouter);

  router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  return router;
};

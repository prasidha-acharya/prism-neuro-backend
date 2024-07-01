import { Router } from 'express';
import { testRouteHandlers } from './users/test.route';

export const masterRouter = () => {
  const apiRouter = Router();

  // routers
  testRouteHandlers(apiRouter);

  return apiRouter;
};

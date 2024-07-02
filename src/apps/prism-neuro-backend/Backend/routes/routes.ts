import { Router } from 'express';
import { testRouteHandlers } from './users/test.routes';

export const masterRouter = () => {
  const apiRouter = Router();

  // routers
  console.log("first")
  testRouteHandlers(apiRouter);

  return apiRouter;
};

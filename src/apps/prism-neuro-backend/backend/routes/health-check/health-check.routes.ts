import { Router } from 'express';
import * as controllers from '../../controllers/index';

interface IRouterHandler {
  healthCheckController: controllers.HealthCheckController;
}
export const healthCheckRoutesHandler = ({ healthCheckController }: IRouterHandler, router: Router): Router => {
  router.post(
    '/health-check',
    healthCheckController.invoke.bind(healthCheckController)
    /*
   #swagger.tags =['Health check']
   #swagger.description = ''
   #swagger.summary = 'Check if end point is working or not'

*/
  );
  return router;
};

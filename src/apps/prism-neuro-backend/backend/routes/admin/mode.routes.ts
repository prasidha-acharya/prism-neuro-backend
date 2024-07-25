import { Router } from 'express';
import { JWTAdminAuthorizer } from '../../../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  getModesController: controllers.GetModesController;
}
export const adminModeRoutesHandler = ({ getModesController }: IHandler, adminAuthorizer: JWTAdminAuthorizer, router: Router): Router => {
  router.get(
    '/admin/modes',
    adminAuthorizer.authorize,
    getModesController.invoke.bind(getModesController)
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags= ['Admin']
    #swagger.summary ='Admin can access to this end point'
    
     */
  );

  return router;
};

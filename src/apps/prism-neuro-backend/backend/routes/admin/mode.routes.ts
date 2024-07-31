import { Router } from 'express';
import { JWTAdminAuthorizer } from '../../../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  getModesByAdminController: controllers.GetModesByAdminController;
}
export const adminModeRoutesHandler = ({ getModesByAdminController }: IHandler, adminAuthorizer: JWTAdminAuthorizer, router: Router): Router => {
  router.get(
    '/admin/modes',
    adminAuthorizer.authorize,
    getModesByAdminController.invoke.bind(getModesByAdminController)
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

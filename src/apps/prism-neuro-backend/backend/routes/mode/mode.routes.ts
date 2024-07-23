import { Router } from 'express';
import { JWTUserAuthorizer } from '../../../../../contexts/shared/infrastructure/authorizer/user.authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  getModesController: controllers.GetModesController;
}
export const modeRoutesHandler = ({ getModesController }: IHandler, userAuthorizer: JWTUserAuthorizer, router: Router): Router => {
  router.get(
    '/physio/modes',
    userAuthorizer.adminAndPhysioauthorize,
    getModesController.invoke.bind(getModesController)
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags= ['Mode']
    #swagger.summary ='Fetch modes'
    
     */
  );

  return router;
};

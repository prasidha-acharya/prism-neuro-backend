import { Router } from 'express';
import { JWTPhysioTherapistAuthorizer } from '../../../../../contexts/shared/infrastructure/authorizer/physio.authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  getModesController: controllers.GetModesController;
}
export const modeRoutesHandler = ({ getModesController }: IHandler, physioAuthorizer: JWTPhysioTherapistAuthorizer, router: Router): Router => {
  router.get(
    '/physio/modes',
    physioAuthorizer.authorize,
    getModesController.invoke.bind(getModesController)
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags= ['Tablet Mode']
    #swagger.summary ='Phsyio therapist can access to this end point'
    
     */
  );

  return router;
};

import { Router } from 'express';
import { JWTAdminAuthorizer } from 'src/contexts/shared/infrastructure/authorizer/admin.authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  getAllPatientActivityController: controllers.GetAllPatientActivityController;
}

export const activityRoutesHandler = ({ getAllPatientActivityController }: IHandler, adminAuthorizer: JWTAdminAuthorizer, router: Router): Router => {
  router.get(
    '/admin/activity',
    adminAuthorizer.authorize,
    getAllPatientActivityController.validate,
    getAllPatientActivityController.invoke.bind(getAllPatientActivityController)
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Admin']
      #swagger.summary = 'Fetch all physio'
      #swagger.description = 'Admin can access to all physio and patient'
       #swagger.parameters['search'] = {
        in: 'query',
        type: 'string'
      }
      #swagger.parameters['startDate'] = {
        in: 'query',
        type: 'Date'
      }
      #swagger.parameters['endDate'] = {
        in: 'query',
        type: 'Date'
      }
      #swagger.parameters['page'] = {
        in: 'query',
        type: 'number'
      }
      #swagger.parameters['limit'] = {
        in: 'query',
        type: 'number'
      }
      #swagger.responses[200]
    }
    */
  );
  return router;
};

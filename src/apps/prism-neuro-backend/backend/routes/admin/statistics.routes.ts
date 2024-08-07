import { Router } from 'express';
import { JWTAdminAuthorizer } from '../../../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  getTotalUsersController: controllers.GetTotalUsersController;
  getModeAnalyticsController: controllers.GetModeAnalyticsController;
}

export const statisticsRoutesHandler = (
  { getTotalUsersController, getModeAnalyticsController }: IHandler,
  adminAuthorizer: JWTAdminAuthorizer,
  router: Router
): Router => {
  router.get(
    '/admin/statistics/users',
    adminAuthorizer.authorize,
    getTotalUsersController.invoke.bind(getTotalUsersController)
    /*
    #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags =['Admin']
    #swagger.summary = ""
    #swagger.description = ""
    #swagger.parameters['filter'] = {
    in:'query',
    required:true,
      schema: {
                '@enum': ['monthly','weekly',"daily"]
            }
    }
            #swagger.responses[200] ={}
    */
  );

  router.get(
    '/admin/statistics/mode-analytics',
    adminAuthorizer.authorize,
    getModeAnalyticsController.validate,
    getModeAnalyticsController.invoke.bind(getModeAnalyticsController)
    /*
    #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags =['Admin']
    #swagger.summary = "Admin Statistics"
    #swagger.description = "Admin can view the statistics"
    #swagger.parameters['filter'] = {
    in:'query',
    required:false,
      schema: {
                '@enum': ['monthly',"daily"]
            }
    }

      #swagger.parameters['startDate'] = {
    in:'query',
    required:false,
    }
      #swagger.parameters['endDate'] = {
    in:'query',
    required:false,
    }
    #swagger.response[200] ={
    
    }
    */
  );
  return router;
};

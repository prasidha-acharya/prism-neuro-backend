import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from '../../../../../contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  getTotalUsersController: controllers.GetTotalUsersController;
}

export const statisticsRoutesHandler = (
  { getTotalUsersController }: IHandler,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>,
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
    */
  );

  router.get(
    '/admin/statistics/mode-analytics',
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
    required:false,
      schema: {
                '@enum': ['monthly','weekly',"daily"]
            }
    }

      #swagger.parameters['startDate'] = {
    in:'query',
    required:true,
    }
      #swagger.parameters['endDate'] = {
    in:'query',
    required:true,
    }
    */
  );
  return router;
};

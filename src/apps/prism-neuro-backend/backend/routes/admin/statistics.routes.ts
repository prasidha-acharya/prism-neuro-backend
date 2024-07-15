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
  return router;
};

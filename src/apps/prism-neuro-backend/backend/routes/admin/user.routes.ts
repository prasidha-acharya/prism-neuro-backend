import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  userLogoutController: controllers.UserLogoutController;
  generateAccessTokenController: controllers.GenerateAccessTokenController;
}

export const userRoutesHandler = (
  { userLogoutController, generateAccessTokenController }: IHandler,
  userAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  refreshAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  router.get(
    '/refresh',
    refreshAuthorizer.authorize,
    generateAccessTokenController.invoke.bind(generateAccessTokenController)
    /*
        #swagger.tags = ['User']
        #swagger.security = [{
              "bearerAuth": []
            }]
        #swagger.responses[200] = {
          schema: {
            $ref: "#/components/schemas/customerRefreshSchema"
          }
        }
        */
  );
  router.get(
    '/logout',
    userAuthorizer.authorize,
    userLogoutController.invoke.bind(userLogoutController)
    /*
        #swagger.tags = ['User']
        #swagger.security = [{
              "bearerAuth": []
            }]
        #swagger.responses[200] = {
          schema: {
            $ref: "#/components/schemas/customerRefreshSchema"
          }
        }
        */
  );
  router.post('/forget-password');
  return router;
};

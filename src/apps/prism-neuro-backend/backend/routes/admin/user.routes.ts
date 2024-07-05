import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  userLogoutController: controllers.UserLogoutController;
  generateAccessTokenController: controllers.GenerateAccessTokenController;
  forgotPasswordController: controllers.ForgotPasswordController;
}

export const userRoutesHandler = (
  { userLogoutController, generateAccessTokenController, forgotPasswordController }: IHandler,
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
  router.post(
    '/forgot-password',
    forgotPasswordController.invoke.bind(forgotPasswordController)
    /*
        #swagger.tags = ['User']
        #swagger.security = [{
              "bearerAuth": []
            }]
        #swagger.responses[200]
        */
  );

  router.post(
    '/reset-password',
    forgotPasswordController.invoke.bind(forgotPasswordController)
    /*
        #swagger.tags = ['User']
        #swagger.security = [{
              "bearerAuth": []
            }]
        #swagger.responses[200]
        */
  );

  router.post(
    '/change-password',
    forgotPasswordController.invoke.bind(forgotPasswordController)
    /*
        #swagger.tags = ['User']
        #swagger.security = [{
              "bearerAuth": []
            }]
        #swagger.responses[200]
        */
  );
  return router;
};

import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  generateAccessTokenController: controllers.CreateDoctorController;
}

export const userRoutesHandler = (
  { generateAccessTokenController }: IHandler,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  router.get(
    '/refresh',
    // refreshAuthorizer.authorize,
    generateAccessTokenController.invoke.bind(generateAccessTokenController)
    /*
        #swagger.tags = ['Users']
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
    // refreshAuthorizer.authorize,
    generateAccessTokenController.invoke.bind(generateAccessTokenController)
    /*
        #swagger.tags = ['Users']
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
  return router;
};

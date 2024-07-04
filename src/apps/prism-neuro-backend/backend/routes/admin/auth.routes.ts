/* eslint-disable @typescript-eslint/unbound-method */

import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from '../../../../../contexts/shared/domain/model/authentication/authorizer';
import * as controller from '../../controllers';

interface Handler {
  loginAdminController: controller.LoginAdminController;
}

export const adminAuthRoutesHandler = (
  { loginAdminController }: Handler,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  //TODO Swagger request body ref implimentation required
  router.post(
    '/auth/login',
    loginAdminController.validate,
    loginAdminController.invoke.bind(loginAdminController)
    /*
      #swagger.tags = ['Admin Auth']
      #swagger.summary = 'Login for Admin Controller'
      #swagger.description = 'Endpoint for administrators to log in, providing email, password, and optionally device info and device type'
      #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string", format: "email" },
              password: { type: "string", minLength: 6 },
            }
          }
        }
      }
    }
      #swagger.responses[200]  = {
      schema: {
        $ref: "#/components/schemas/loginAdminResponse"
      }
    }
    */
  );

  return router;
};
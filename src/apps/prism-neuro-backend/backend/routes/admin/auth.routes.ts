/* eslint-disable @typescript-eslint/unbound-method */

import { Router } from 'express';
import { JWTAdminAuthorizer } from '../../../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import * as controller from '../../controllers';

interface Handler {
  loginAdminController: controller.LoginAdminController;
  updateAdminProfileController: controller.UpdateAdminProfileController;
}

export const adminAuthRoutesHandler = (
  { loginAdminController, updateAdminProfileController }: Handler,
  adminAuthorizer: JWTAdminAuthorizer,
  router: Router
): Router => {
  //TODO Swagger request body ref implimentation required
  router.post(
    '/auth/login',
    loginAdminController.validate,
    loginAdminController.invoke.bind(loginAdminController)
    /*
      #swagger.tags = ['User']
      #swagger.summary = 'Login for Patient Physio Therapist and Admin Controller'
      #swagger.description = 'Endpoint for all users to log in, providing email, password'
      #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string", format: "email" ,default:"admin@gmail.com"},
              password: { type: "string", minLength: 6 },
            }
          }
        }
      }
    }
      #swagger.responses[200]  = {
      schema: {
        $ref: "#/components/schemas/loginAdminReponse"
      }
    }
    */
  );

  router.put(
    '/admin/update-profile',
    adminAuthorizer.authorize,
    updateAdminProfileController.validate,
    updateAdminProfileController.invoke.bind(updateAdminProfileController)

    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Admin']
      #swagger.summary = 'Admin update physio'
      #swagger.description = 'Admin can update physio'
      #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
             type:"object",
             required:[""],
               properties :{
              firstName: { type: "string"},
              lastName: { type: "string"},
              phoneCode: { type: "string" },
              phoneNumber:{type:"string"},
            }
          }
        }
      }
    }
      #swagger.responses[200]
    */
  );

  return router;
};

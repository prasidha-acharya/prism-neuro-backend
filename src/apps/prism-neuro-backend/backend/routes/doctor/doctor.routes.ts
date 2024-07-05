import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  loginDoctorController: controllers.LoginDoctorController;
}
export const doctorRoutesHandler = (
  { loginDoctorController }: IHandler,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  router.post(
    '/doctor/login',
    loginDoctorController.validate,
    loginDoctorController.invoke.bind(loginDoctorController)
    /*
      #swagger.tags = ['Doctor']
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
        $ref: "#/components/schemas/loginAdminReponse"
      }
    }
    */
  );

  router.put(
    '/doctor/update/:doctorId',
    adminAuthorizer.authorize
    /*
      #swagger.tags = ['Doctor']
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
        $ref: "#/components/schemas/loginAdminReponse"
      }
    }
    */
  );
  router.delete(
    '/doctor/delete/:doctorId',
    adminAuthorizer.authorize

    /*
      #swagger.tags = ['Doctor']
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
      #swagger.responses[200]
    */
  );

  return router;
};

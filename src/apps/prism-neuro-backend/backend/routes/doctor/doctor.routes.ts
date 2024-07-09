import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  loginDoctorController: controllers.LoginDoctorController;
  deleteDoctorController: controllers.DeleteDoctorController;
  updateDoctorController: controllers.UpdateDoctorController;
}

export const doctorRoutesHandler = (
  { loginDoctorController }: IHandler,
  physioAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  router.post(
    '/physio/login',
    loginDoctorController.validate,
    loginDoctorController.invoke.bind(loginDoctorController)
    /*
      #swagger.tags = ['Physio']
      #swagger.summary = 'Login for physio'
      #swagger.description = 'Endpoint for physio-therapist to log in, providing email, password, and optionally device info and device type'
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

  router.post(
    '/physio/create-patient',
    physioAuthorizer.authorize,
    loginDoctorController.validate,
    loginDoctorController.invoke.bind(loginDoctorController)
    /*
      #swagger.tags = ['Physio']
      #swagger.summary = 'Login for physio'
      #swagger.description = 'Endpoint for physio-therapist to log in, providing email, password, and optionally device info and device type'
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

  // router.get(
  //   '/physion/:physioId',
  //   adminAuthorizer.authorize
  //   /*
  //     #swagger.security = [{
  //           "bearerAuth": []
  //   }]
  //     #swagger.tags = ['Doctor']
  //     #swagger.summary = 'Login for Admin Controller'
  //     #swagger.description = 'Endpoint for administrators to log in, providing email, password, and optionally device info and device type'
  //     #swagger.requestBody = {
  //     required: true,
  //     content: {
  //       "application/json": {
  //         schema: {
  //           type: "object",
  //           required: ["email", "password"],
  //           properties: {
  //             email: { type: "string", format: "email" },
  //             password: { type: "string", minLength: 6 },
  //           }
  //         }
  //       }
  //     }
  //   }
  //     #swagger.responses[200]  = {
  //     schema: {
  //       $ref: "#/components/schemas/loginAdminReponse"
  //     }
  //   }
  //   */
  // );

  return router;
};

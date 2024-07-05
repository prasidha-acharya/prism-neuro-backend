import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  createDoctorController: controllers.CreateDoctorController;
  deleteDoctorController: controllers.DeleteDoctorController;
  updateDoctorController: controllers.UpdateDoctorController;
}

export const physioRoutesHandler = (
  { createDoctorController, deleteDoctorController, updateDoctorController }: IHandler,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  router.post(
    '/admin/create-doctor',
    adminAuthorizer.authorize,
    createDoctorController.validate,
    createDoctorController.invoke.bind(createDoctorController)
    /* 
    #swagger.security = [{
            "bearerAuth": []
    }] 
   #swagger.tags = ['Admin Doctor']
   #swagger.summary = 'Admin creates doctor'
   #swagger.description = ''
   #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/createDoctorRequest"
                    }  
                }
            }
        } 
   #swagger.responses[201]
  */
  );
  router.get(
    '/admin/doctor/:doctorId',
    adminAuthorizer.authorize
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Admin Doctor']
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

  router.get(
    '/admin/doctors',
    adminAuthorizer.authorize
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Admin Doctor']
      #swagger.summary = 'Fetch all doctors'
      #swagger.description = 'Admin can access to all doctors'
      #swagger.responses[200]  = {
      schema: {
        $ref: "#/components/schemas/loginAdminReponse"
      }
    }
    */
  );

  router.put(
    '/admin/update-doctor/:doctorId',
    adminAuthorizer.authorize,
    updateDoctorController.invoke.bind(updateDoctorController)
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Admin Doctor']
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
    '/admin/delete-doctor/:doctorId',
    adminAuthorizer.authorize,
    deleteDoctorController.invoke.bind(deleteDoctorController)
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Admin Doctor']
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

import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  createDoctorController: controllers.CreateDoctorController;
  deleteDoctorController: controllers.DeleteDoctorController;
  updateDoctorController: controllers.UpdateDoctorController;
  getAllUsersController: controllers.GetAllUsersController;
  getAllPatientListByPhysioIdController: controllers.GetAllPatientListByPhysioIdController;
}

export const physioRoutesHandler = (
  { createDoctorController, updateDoctorController, getAllUsersController, getAllPatientListByPhysioIdController }: IHandler,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  router.post(
    '/admin/create-physio',
    adminAuthorizer.authorize,
    createDoctorController.validate,
    createDoctorController.invoke.bind(createDoctorController)
    /* 
    #swagger.security = [{
            "bearerAuth": []
    }] 
   #swagger.tags = ['Admin']
   #swagger.summary = 'Admin creates physio'
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
    '/admin/physio/:physioId',
    adminAuthorizer.authorize
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Admin']
      #swagger.summary = 'Fetch physio data by id'
      #swagger.description = 'Endpoint to fetch physio data by id'
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
    '/admin/physio',
    adminAuthorizer.authorize
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Admin']
      #swagger.summary = 'Fetch all physio'
      #swagger.description = 'Admin can access to all physio'
      #swagger.responses[200]  = {
      schema: {
        $ref: "#/components/schemas/loginAdminReponse"
      }
    }
    */
  );

  router.put(
    '/admin/update-physio/:physioId',
    adminAuthorizer.authorize,
    updateDoctorController.invoke.bind(updateDoctorController)
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

  // router.delete(
  //   '/admin/delete-physio/:physioId',
  //   adminAuthorizer.authorize,
  //   deleteDoctorController.invoke.bind(deleteDoctorController)
  //   /*
  //     #swagger.security = [{
  //           "bearerAuth": []
  //   }]
  //     #swagger.tags = ['Admin']
  //     #swagger.summary = 'Delete physio data'
  //     #swagger.description = 'End point to delete physio'
  //        #swagger.parameters['physioId'] = {
  //       in: 'path',
  //       type: 'string',
  //       required: true,
  //     }
  //     #swagger.responses[200]
  //   */
  // );

  router.get(
    '/admin/users',
    adminAuthorizer.authorize,
    getAllUsersController.validate,
    getAllUsersController.invoke.bind(getAllUsersController)
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Admin']
      #swagger.summary = 'Fetch all physio'
      #swagger.description = 'Admin can access to all physio and patient'
       #swagger.parameters['search'] = {
        in: 'query',
        type: 'string'
      }
      #swagger.parameters['startDate'] = {
        in: 'query',
        type: 'Date'
      }
         #swagger.parameters['endDate'] = {
        in: 'query',
        type: 'Date'
      }
      #swagger.parameters['role'] = {
        in: 'query',
        type: 'string',
        enum: ["PATIENT","PHYSIO"]
      }
      #swagger.responses[200]
    }
    */
  );

  router.get(
    '/admin/patients/:physioId',
    adminAuthorizer.authorize,
    getAllPatientListByPhysioIdController.invoke.bind(getAllPatientListByPhysioIdController)
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Admin']
      #swagger.summary = 'Fetch all patient of physio'
      #swagger.description = 'Admin can access to all patient detail'
       #swagger.parameters['search'] = {
        in: 'query',
        type: 'string'
      }
      #swagger.responses[200]
    }
    */
  );

  return router;
};

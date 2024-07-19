import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import { IAuthorizer } from '../../../../../contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  createPhysioController: controllers.CreatePhysioController;
  deletePhysioController: controllers.DeletePhysioController;
  updatePhysioController: controllers.UpdatePhysioController;
  getAllUsersController: controllers.GetAllUsersController;
  getAllPatientListByPhysioIdController: controllers.GetAllPatientListByPhysioIdController;
}
export const imageUpload = multer({});

export const adminPhysioRoutesHandler = (
  { createPhysioController, updatePhysioController, getAllUsersController, getAllPatientListByPhysioIdController, deletePhysioController }: IHandler,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  router.post(
    '/admin/create-physio',
    imageUpload.single('file'),
    adminAuthorizer.authorize,
    createPhysioController.validate,
    createPhysioController.invoke.bind(createPhysioController)
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
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/createDoctorRequest"
                    }  
                }
            }
        } 
  #swagger.responses[201]  = {
      schema: {
        $ref: "#/components/schemas/successReponse"
      }
    }
  */
  );

  // router.get(
  //   '/admin/physio/:physioId',
  //   adminAuthorizer.authorize
  //   /*
  //     #swagger.security = [{
  //           "bearerAuth": []
  //   }]
  //     #swagger.tags = ['Admin']
  //     #swagger.summary = 'Fetch physio data by id'
  //     #swagger.description = 'Endpoint to fetch physio data by id'
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

  // router.get(
  //   '/admin/physio',
  //   adminAuthorizer.authorize
  //   /*
  //     #swagger.security = [{
  //           "bearerAuth": []
  //   }]
  //     #swagger.tags = ['Admin']
  //     #swagger.summary = 'Fetch all physio'
  //     #swagger.description = 'Admin can access to all physio'
  //     #swagger.responses[200]  = {
  //     schema: {
  //       $ref: "#/components/schemas/loginAdminReponse"
  //     }
  //   }
  //   */
  // );

  router.put(
    '/admin/update-physio',
    imageUpload.single('file'),
    adminAuthorizer.authorize,
    updatePhysioController.validate,
    updatePhysioController.invoke.bind(updatePhysioController)
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Admin']
      #swagger.summary = 'Admin update physio'
      #swagger.description = 'Admin can update physio'
   #swagger.parameters['physioId'] = {
        in: 'path',
        type: 'string'
      }
    #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/createDoctorRequest"
                    }  
                }
            }
        } 
      #swagger.responses[200]
    */
  );

  router.delete(
    '/admin/delete-physio/:physioId',
    adminAuthorizer.authorize,
    deletePhysioController.invoke.bind(deletePhysioController)
    /*
      #swagger.security = [{
            "bearerAuth": []
    }]
      #swagger.tags = ['Admin']
      #swagger.summary = 'Delete user'
      #swagger.description = 'End point to delete user'
      #swagger.responses[200]
    */
  );

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

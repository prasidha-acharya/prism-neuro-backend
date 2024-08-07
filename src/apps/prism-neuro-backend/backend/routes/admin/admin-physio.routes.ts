import { Router } from 'express';
import { JWTAdminAuthorizer } from '../../../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  createPhysioController: controllers.CreatePhysioController;
  deletePhysioController: controllers.DeletePhysioController;
  updatePhysioController: controllers.UpdatePhysioController;
  getAllUsersController: controllers.GetAllUsersController;
  getAllPatientListByPhysioIdController: controllers.GetAllPatientListByPhysioIdController;
}

export const adminPhysioRoutesHandler = (
  { createPhysioController, updatePhysioController, getAllUsersController, getAllPatientListByPhysioIdController, deletePhysioController }: IHandler,
  adminAuthorizer: JWTAdminAuthorizer,
  router: Router
): Router => {
  router.post(
    '/admin/create-physio',
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
        "application/json": {
          schema: {
             type:"object",
             required:["email", "firstName" ,"lastName","address"],
               properties :{
               email: { type: "string", format: "email" },
              firstName: { type: "string"},
              lastName: { type: "string",required:"true" },
              address:{type:"array",required:"true"},
              phoneCode: { type: "string" },
              phoneNumber:{type:"string"},  
              profileURL:{type:"string"},  
            }
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

  router.put(
    '/admin/update-physio/:physioId',
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
      #swagger.parameters['page'] = {
        in: 'query',
        type: 'number'
      }

      #swagger.parameters['limit'] = {
        in: 'query',
        type: 'number'
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

import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';
interface IHandler {
  deletePatientByAdminController: controllers.DeletePatientByAdminController;
  getModeSessionsByPatientIdController: controllers.GetModeSessionsByPatientIdController;
}

export const adminPatientRoutesHandler = (
  { deletePatientByAdminController, getModeSessionsByPatientIdController }: IHandler,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  router.delete(
    '/admin/delete-patient/:patientId',
    adminAuthorizer.authorize,
    deletePatientByAdminController.invoke.bind(deletePatientByAdminController)
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
    '/admin/patient-sessions/:patientId',
    adminAuthorizer.authorize,
    getModeSessionsByPatientIdController.validate,
    getModeSessionsByPatientIdController.invoke.bind(getModeSessionsByPatientIdController)

    /*
    #swagger.security =[{
    "bearerAuth":[]
    }]
    #swagger.tags =['Admin']
    #swagger.summary = 'Patient mode session '
    #swagger.description = 'Admin can view patients sessions'

      #swagger.parameters['search'] = {
    in:"query",
    type:"number",
    }

      #swagger.parameters['startDate'] = {
    in:"query",
    type:"string",
    }

    #swagger.parameters['endDate'] = {
    in:"query",
    type:"string",
    }

    #swagger.parameters['limit'] = {
    in:"query",
    type:"number",
    }
    
    #swagger.parameters['page'] = {
    in:"query",
    type:"number",
    }

    #swagger.parameters['modeId'] = {
    in:"path",
    type:"string",
    }

    #swagger.parameters['patientId'] = {
    in:"path",
    type:"string",
    }

     #swagger.responses[200]  = {
      schema: {
        $ref: "#/components/schemas/getModeSessionOfPatientResponse"
      }
    }
     */
  );
  return router;
};

import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from '../../../../../contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  startModeSessionController: controllers.StartModeSessionController;
  endModeSessionController: controllers.EndModeSessionController;
  getModeSessionOfPatientController: controllers.GetModeSessionOfPatientController;
}
export const modeSessionRoutesHandler = (
  { startModeSessionController, endModeSessionController, getModeSessionOfPatientController }: IHandler,
  physioAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  router.post(
    '/physio/mode/session-start/:patientId',
    physioAuthorizer.authorize,
    startModeSessionController.validate,
    startModeSessionController.invoke.bind(startModeSessionController)
    /* 
     #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags = ['Tablet Mode Session']
    #swagger.summary="Physio can start session"
    #swagger.description="This end point creates session between physio therapist and patient."
    #swagger.parameters['patientId'] = {
    in:"path",
    type:"string",
    required:"true"
    }
    */
  );

  router.put(
    '/physio/mode/session-end/:patientId',
    physioAuthorizer.authorize,
    endModeSessionController.validate,
    endModeSessionController.invoke.bind(endModeSessionController)
    /* 
     #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags = ['Tablet Mode Session']
    #swagger.summary="Physio ends session"
    #swagger.description="This end point ends session between physio and patient."
    #swagger.parameters['patientId'] = {
    in:"path",
    type:"string",
    required:"true"
    }
    #swagger.parameters['sessionId'] = {
    in:"query",
    type:"string",
    required:"true"
    }
    */
  );

  router.get(
    '/physio/mode-session/:modeId/:patientId',
    adminAuthorizer.authorize,
    getModeSessionOfPatientController.validate,
    getModeSessionOfPatientController.invoke.bind(getModeSessionOfPatientController)
    /* 
     #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags = ['Tablet Mode Session']
    #swagger.summary="Admin can fetch session"
    #swagger.description=""
    #swagger.parameters['modeId'] = {
    in:"path",
    type:"string",
    required:"true"
    }
       #swagger.parameters['patientId'] = {
    in:"path",
    type:"string",
    required:"true"
    }

    #swagger.parameters['search'] = {
    in:"query",
    type:"string",
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
   
     #swagger.responses[200]  = {
      schema: {
        $ref: "#/components/schemas/getModeSessionOfPatientResponse"
      }
    }
    */
  );

  return router;
};

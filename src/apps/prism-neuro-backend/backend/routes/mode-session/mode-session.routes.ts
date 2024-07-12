import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from '../../../../../contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  startModeSessionController: controllers.StartModeSessionController;
  endModeSessionController: controllers.EndModeSessionController;
}
export const modeSessionRoutesHandler = (
  { startModeSessionController, endModeSessionController }: IHandler,
  physioAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  router.post(
    '/mode/session-start/:patientId',
    physioAuthorizer.authorize,
    startModeSessionController.validate,
    startModeSessionController.invoke.bind(startModeSessionController)
    /* 
     #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags = ['Mode session']
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
    '/mode/session-end/:patientId',
    physioAuthorizer.authorize,
    endModeSessionController.invoke.bind(endModeSessionController)
    /* 
     #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags = ['Mode session']
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

  return router;
};

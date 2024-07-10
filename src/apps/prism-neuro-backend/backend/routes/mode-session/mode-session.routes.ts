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
    '/mode/session-start',
    physioAuthorizer.authorize,
    startModeSessionController.invoke.bind(startModeSessionController)
    /* 
     #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags = ['Mode session']
    #swagger.summary=""
    #swagger.description=""
    #swagger.parameters['physioId'] = {
    in:"query",
    type:"string",
    required:"true"
    }
    #swagger.parameters['patientId'] = {
    in:"query",
    type:"string",
    required:"true"
    }
    */
  );

  router.post(
    '/mode/session-end',
    physioAuthorizer.authorize,
    endModeSessionController.invoke.bind(endModeSessionController)
    /* 
     #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags = ['Mode session']
    #swagger.summary=""
    #swagger.description=""
    #swagger.parameters['physioId'] = {
    in:"query",
    type:"string",
    required:"true"
    }
    #swagger.parameters['patientId'] = {
    in:"query",
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

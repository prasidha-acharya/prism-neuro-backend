import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  startModeTrialController: controllers.StartModeTrialController;
  endModeTrialController: controllers.EndModeTrialController;
  getModeTrialBySessionController: controllers.GetModeTrialBySessionController;
}

export const modeTrialRoutesHandler = (
  controller: IHandler,
  physioAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  const { startModeTrialController, endModeTrialController, getModeTrialBySessionController } = controller;

  router.post(
    '/mode/trial-start/:modeId',
    physioAuthorizer.authorize,
    startModeTrialController.validate,
    startModeTrialController.invoke.bind(startModeTrialController)
    /* 
     #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags = ['Mode Trial']
    #swagger.summary="Only Physio therapist can start trial"
    #swagger.description="Starts trial"
    #swagger.parameters['modeId'] = {
    in:"path",
    type:"string",
    required:"true"
    }
      #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["trialId", "startTime","sessionId"],
            properties: {
              trialId: { type: "number" },
              startTime: { type: "date"},
              sessionId: {type: "string"}
            }
          }
        }
      }
    }
    */
  );

  router.put(
    '/mode/trial-end/:modeId/:modeTrialId',
    physioAuthorizer.authorize,
    endModeTrialController.validate,
    endModeTrialController.invoke.bind(endModeTrialController)
    /* 
     #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags = ['Mode Trial']
    #swagger.summary=""
    #swagger.description=""
    #swagger.parameters['modeId'] = {
    in:"path",
    type:"string",
    required:"true"
    }
       #swagger.parameters['modeTrialId'] = {
    in:"path",
    type:"string",
    required:"true"
    }
      #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["endTime" ,"results" ,"rawData","sessionId"],
            properties: {
              endTime: { type:"string"},
              sessionId: { type:"string"},
              results: { type: "object" },
              rawData: { type:"object"},
            }
          }
        }
      }
    }
    */
  );

  router.get(
    '/mode/trials/:modeId/:modeSessionId',
    physioAuthorizer.authorize,
    getModeTrialBySessionController.invoke.bind(getModeTrialBySessionController)
    /* 
     #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags = ['Mode Trial']
    #swagger.summary="Physio therapist can access mode trial"
    #swagger.description=""
    #swagger.parameters['modeId'] = {
    in:"path",
    type:"string",
    required:"true"
    }
    #swagger.parameters['modeSessionId'] = {
    in:"path",
    type:"string",
    required:"true"
    }
    #swagger.response ['202'] = {}
    */
  );

  return router;
};

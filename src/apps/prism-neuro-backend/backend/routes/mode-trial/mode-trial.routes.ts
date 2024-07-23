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
  const { endModeTrialController, getModeTrialBySessionController } = controller;

  router.post(
    'physio/mode/trial-end/:modeId',
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
      #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ['startTime","endTime" ,"trialId","results" ,"rawData","sessionId"],
            properties: {
              startTime:{type:'date'},
              endTime: { type:'date'},
              sessionId: { type:"string"},
              trialId:{type:"number"},
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
    '/phyiso/trials/:modeId/:modeSessionId',
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

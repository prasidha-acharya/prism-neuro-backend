import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  startModeTrialController: controllers.StartModeTrialController;
  endModeTrialController: controllers.EndModeTrialController;
}

export const modeTrialRoutesHandler = (
  controller: IHandler,
  physioAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  const { startModeTrialController, endModeTrialController } = controller;

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
            required: ["trialId", "startTime","results"],
            properties: {
              trialId: { type: "number" },
              startTime: { type:"date"},
              results: { type:"json"},
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
            required: ["endTime" ,"results" ,"rawData"],
            properties: {
              endTime: { type:"DateTime"},
              results: { type: "object" },
              rawData: { type:"object"},
            }
          }
        }
      }
    }
    */
  );

  return router;
};

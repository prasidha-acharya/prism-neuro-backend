import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  loginPhysioController: controllers.LoginPhysioController;
  deletePhysioController: controllers.DeletePhysioController;
  updatePhysioController: controllers.UpdatePhysioController;
  createPatientByPhysioController: controllers.CreatePatientByPhysioController;
  getAllPatientListsWithSessionController: controllers.GetAllPatientListsWithSessionController;
  getPhysioModeAnalyticsController: controllers.GetPhysioModeAnalyticsController;
  getPerformanceSummaryOfPhysioController: controllers.GetPerformanceSummaryOfPhysioController;
  deletePatientByAdminController: controllers.DeletePatientByAdminController;
  getModeSessionActivityOfPatientByPhysioController: controllers.GetModeSessionActivityOfPatientByPhysioController;
  getSessionsBetweenPatientAndPhysioController: controllers.GetSessionsBetweenPatientAndPhysioController;
  updatePatientProfileByPhysioController: controllers.UpdatePatientProfileByPhysioController;
  updatePhysioByPhysioController: controllers.UpdatePhysioByPhysioController;
}

export const physioRoutesHandler = (
  {
    loginPhysioController,
    createPatientByPhysioController,
    getAllPatientListsWithSessionController,
    getPhysioModeAnalyticsController,
    getPerformanceSummaryOfPhysioController,
    deletePatientByAdminController,
    getModeSessionActivityOfPatientByPhysioController,
    getSessionsBetweenPatientAndPhysioController,
    updatePatientProfileByPhysioController,
    updatePhysioByPhysioController
  }: IHandler,
  physioAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  router.post(
    '/physio/login',
    loginPhysioController.validate,
    loginPhysioController.invoke.bind(loginPhysioController)
    /*

      #swagger.tags = ['Tablet Physio']
      #swagger.summary = 'Login for physio'
      #swagger.description = 'Endpoint for physio-therapist to log in, providing email, password, and optionally device info and device type'
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

  router.post(
    '/physio/create-patient',
    physioAuthorizer.authorize,
    createPatientByPhysioController.validate,
    createPatientByPhysioController.invoke.bind(createPatientByPhysioController)
    /*
  #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Physio']
      #swagger.summary = 'Patient can be created from both tablet and dashboard'
      #swagger.description = 'Endpoint for physio-therapist to create patient'
      #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["firstName","lastName","email","address"],
              properties :{
              email: { type: "string", format: "email" },
              firstName: { type: "string", minLength: 6 },
              address:{type:"array",required:"true"},
              lastName: { type: "string",required:"true" },
              phoneCode: { type: "string" },
              profileURL: { type: "string" },
              phoneNumber:{type:"string"},
              age:{type:"number"},
              weight:{type:"number"},
            }
          }
        }
      }
    }
      #swagger.responses[201]
    */
  );

  router.put(
    '/physio/update-patient/:patientId',
    physioAuthorizer.authorize,
    updatePatientProfileByPhysioController.validate,
    updatePatientProfileByPhysioController.invoke.bind(updatePatientProfileByPhysioController)
    /*
    #swagger.security =[{
    'bearerAuth':[]
    }]
    #swagger.tags = ['Physio']
    #swagger.summary = 'Update Profile of patient from both tablet and dashboard'
    #swagger.description = 'Physio can update their patient's profile'
      #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: [""],
            properties: {
              firstName: { type: "string"},
              lastName:{type:"string"},
              address:{type:"array"},
              lastName: { type: "string"},
              phoneCode: { type: "string" },
              phoneNumber:{type:"string"},
              age:{type:"number"},
              weight:{type:"number"},    
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
    '/physio/update-profile',
    physioAuthorizer.authorize,
    updatePhysioByPhysioController.validate,
    updatePhysioByPhysioController.invoke.bind(updatePhysioByPhysioController)
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Physio']
      #swagger.summary = 'Physio update their profile'
      #swagger.description = ''
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

  router.get(
    '/physio/patients',
    physioAuthorizer.authorize,
    getAllPatientListsWithSessionController.invoke.bind(getAllPatientListsWithSessionController)

    /*
  #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Tablet Physio']
      #swagger.summary = 'Tablet end point to fetch patient lists to start session.'
      #swagger.description = 'Endpoint for physio-therapist to fetch patient lists'
      #swagger.parameters['search'] = {
        in: 'query',
        type: 'string'
      }
      #swagger.responses[201]
    */
  );

  router.get(
    '/physio/statistics/mode-analytics',
    physioAuthorizer.authorize,
    getPhysioModeAnalyticsController.validate,
    getPhysioModeAnalyticsController.invoke.bind(getPhysioModeAnalyticsController)

    /*
  #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Physio']
      #swagger.summary = 'Physio can view patient mode'
      #swagger.description = ''
       #swagger.parameters['filter'] = {
      in:'query',
      required:true,
      schema: {
                '@enum': ['monthly',"daily"]
            }
    }
      #swagger.parameters['startDate'] = {
        in: 'query',
        type: 'string'
      }
      #swagger.parameters['endDate'] = {
        in: 'query',
        type: 'string'
      }
      #swagger.responses[200] = {
      schema:{
       $ref: "#/components/schemas/statisticsMode"}
      }
    */
  );

  router.get(
    '/physio/statistics/mode-summary',
    physioAuthorizer.authorize,
    getPerformanceSummaryOfPhysioController.invoke.bind(getPerformanceSummaryOfPhysioController)
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Physio']
      #swagger.summary = 'Performance of patient'
      #swagger.description = ''
    */
  );

  router.delete(
    '/physio/delele-patient/:patientId',
    physioAuthorizer.authorize,
    deletePatientByAdminController.invoke.bind(deletePatientByAdminController)
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
      #swagger.tags = ['Physio']
      #swagger.summary = 'Physio therapists delete their patients. '
      #swagger.description = ''
    */
  );

  router.get(
    '/physio/activity/:modeId',
    physioAuthorizer.authorize,
    getModeSessionActivityOfPatientByPhysioController.validate,
    getModeSessionActivityOfPatientByPhysioController.invoke.bind(getModeSessionActivityOfPatientByPhysioController)
    /*
    #swagger.security =[{
    "bearerAuth":[]
    }]
    #swagger.tags =['Physio']
    #swagger.summary = 'Patient Activity / History'
    #swagger.description = 'Patient can view their activity'

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

  router.get(
    '/physio/patient-sessions/:modeId/:patientId',
    physioAuthorizer.authorize,
    getSessionsBetweenPatientAndPhysioController.validate,
    getSessionsBetweenPatientAndPhysioController.invoke.bind(getSessionsBetweenPatientAndPhysioController)

    /*
    #swagger.security =[{
    "bearerAuth":[]
    }]
    #swagger.tags =['Physio']
    #swagger.summary = 'Patient mode session'
    #swagger.description = 'Physio can view their patients activity'

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

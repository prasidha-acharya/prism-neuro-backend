import { Router } from 'express';
import { JWTPatientAuthorizer } from 'src/contexts/shared/infrastructure/authorizer/patient.authorizer';
import * as controllers from '../../controllers/index';
import { imageUpload } from '../admin/admin-physio.routes';

interface IHandler {
  getModeSessionActivityOfPatientController: controllers.GetModeSessionActivityOfPatientController;
  getPerformanceSummaryOfPatientController: controllers.GetPerformanceSummaryOfPatientController;
  getModeComparisionController: controllers.GetModeComparisionController;
  getPatientModeAnalyticsController: controllers.GetPatientModeAnalyticsController;
  updatePatientProfileController: controllers.UpdatePatientProfileController;
}
export const patientRoutesHandler = (
  {
    getModeSessionActivityOfPatientController,
    getPerformanceSummaryOfPatientController,
    getModeComparisionController,
    getPatientModeAnalyticsController,
    updatePatientProfileController
  }: IHandler,
  patientAuthorizer: JWTPatientAuthorizer,
  router: Router
): Router => {
  router.put(
    '/patient/update-profile',
    imageUpload.single('file'),
    patientAuthorizer.authorize,
    updatePatientProfileController.parse,
    updatePatientProfileController.validate,
    updatePatientProfileController.invoke.bind(updatePatientProfileController)
    /*
    #swagger.security =[{
    'bearerAuth':[]
    }]
    #swagger.tags = ['Patient']
    #swagger.summary = 'Update Profile'
    #swagger.description = 'Patient can update their profile'
      #swagger.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            required: ["file","patient"],
            properties: {
             file: { type: "string", format: "binary" },
             patient:{
             type:"object",
               properties :{
               email: { type: "string", format: "email" },
              firstName: { type: "string", minLength: 6 },
              address:{type:"array",required:"true"},
              lastName: { type: "string",required:"true" },
              phoneCode: { type: "string" },
              phoneNumber:{type:"string"},
              age:{type:"number"},
              weight:{type:"number"},
               }

             }
              
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

  router.get(
    '/patient/activity/:modeId',
    patientAuthorizer.authorize,
    getModeSessionActivityOfPatientController.invoke.bind(getModeSessionActivityOfPatientController)
    /*
    #swagger.security =[{
    "bearerAuth":[]
    }]
    #swagger.tags =['Patient']
    #swagger.summary = 'Patient Activity / History'
    #swagger.description = 'Patient can view their activity'

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

     #swagger.responses[200]  = {
      schema: {
        $ref: "#/components/schemas/getModeSessionOfPatientResponse"
      }
    }
     */
  );

  router.get(
    '/patient/statistics/mode-summary',
    patientAuthorizer.authorize,
    getPerformanceSummaryOfPatientController.invoke.bind(getPerformanceSummaryOfPatientController)

    /*
    #swagger.security = [{
    "bearerAuth":[]
    }]
    #swagger.tags = ['Patient']
    #swagger.summary = 'Patient Mode Analytics'
    #swagger.responses[200] = {
      schema: {
        $ref: "#/components/schemas/getPerformanceSummary"
      }
    }
    */
  );

  router.get(
    '/patient/statistics/mode-comparision',
    patientAuthorizer.authorize,
    getModeComparisionController.invoke.bind(getModeComparisionController)
    /*
    #swagger.security = [{
    "bearerAuth":[]
    }]
    #swagger.tags = ['Patient']
    #swagger.summary = 'Patient Mode Comparision'
    #swagger.responses[200] = {
      schema: {
        $ref: "#/components/schemas/statisticsMode"
      }
    }
    */
  );

  router.get(
    '/patient/statistics/mode-analytics',
    patientAuthorizer.authorize,
    getPatientModeAnalyticsController.invoke.bind(getPatientModeAnalyticsController)
    /*
    #swagger.security = [{
    "bearerAuth":[]
    }]
    #swagger.tags = ['Patient']
    #swagger.summary = 'Patient Mode Analytics filtered by date'
     #swagger.parameters['filter'] = {
    in:'query',
    required:true,
      schema: {
                '@enum': ['monthly','weekly',"daily"]
            }
    }
    #swagger.responses[200] = {
      schema: {
        $ref: "#/components/schemas/statisticsMode"
      }
    }
    */
  );
  return router;
};

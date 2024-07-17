import { Router } from 'express';
import { JWTPatientAuthorizer } from 'src/contexts/shared/infrastructure/authorizer/patient.authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  loginPatientController: controllers.LoginPatientController;
  getModeSessionActivityOfPatientController: controllers.GetModeSessionActivityOfPatientController;
  getPerformanceSummaryOfPatientController: controllers.GetPerformanceSummaryOfPatientController;
}
export const PatientRoutesHandler = (
  { loginPatientController, getModeSessionActivityOfPatientController, getPerformanceSummaryOfPatientController }: IHandler,
  patientAuthorizer: JWTPatientAuthorizer,
  router: Router
): Router => {
  router.post(
    '/patient/login',
    loginPatientController.invoke.bind(loginPatientController)
    /*
      #swagger.tags = ['Patient']
      #swagger.summary = 'Login for Patient'
      #swagger.description = 'Endpoint for patient to log in, providing email, password'
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
    '/patient/statistics/mode-analytics',
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
  return router;
};

import { Router } from 'express';
import * as controllers from '../../controllers/index';

interface IHandler {
  loginPatientController: controllers.LoginPatientController;
}
export const PatientRoutesHandler = ({ loginPatientController }: IHandler, router: Router): Router => {
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
  return router;
};

import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  createDoctorController: controllers.CreateDoctorController;
}

export const physioRoutesHandler = (
  { createDoctorController }: IHandler,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  router.post(
    '/admin/create-doctor',
    adminAuthorizer.authorize,
    createDoctorController.validate,
    createDoctorController.invoke.bind(createDoctorController)
    /* 
    #swagger.security = [{
            "bearerAuth": []
    }] 
   #swagger.tags = ['Admin Doctor']
   #swagger.summary = 'Admin creates doctor'
   #swagger.description = ''
   #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/createDoctorRequest"
                    }  
                }
            }
        } 
   #swagger.responses[201]
  */
  );
  return router;
};

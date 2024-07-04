import { Router } from 'express';
import * as controllers from '../../controllers/index';

interface IHandler {
  createDoctorController: controllers.CreateDoctorController;
}

export const physioRoutesHandler = ({ createDoctorController }: IHandler, router: Router): Router => {
  router.post(
    'admin/create-doctor',
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

import { Router } from 'express';
import { JWTAdminAuthorizer } from '../../../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import * as controller from '../../controllers/index';
import { imageUpload } from '../admin/admin-physio.routes';

interface IHandler {
  uploadModeFilesController: controller.UploadModeFilesController;
}

export const fileRoutesHandler = ({ uploadModeFilesController }: IHandler, adminAuthorizer: JWTAdminAuthorizer, router: Router): Router => {
  router.post(
    '/admin/upload/files',
    imageUpload.single('file'),
    // adminAuthorizer.authorize,
    uploadModeFilesController.invoke.bind(uploadModeFilesController)
    /*
    #swagger.tags = ['File']
    #swagger.requestBody  ={
    
    content :{
    "multipart/form-data" :{
    schema:{
    type:"object" ,
    properties:{
    file:{type:"string" ,format:"binary"},
    type:{type:"string"}
    }
    }
    }
    }
    }
 
     */
  );
  return router;
};

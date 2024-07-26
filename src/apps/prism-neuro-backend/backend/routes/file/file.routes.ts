import { Router } from 'express';
import { JWTAdminAuthorizer } from '../../../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import * as controller from '../../controllers/index';
import { imageUpload } from '../admin/admin-physio.routes';

interface IHandler {
  uploadModeFilesController: controller.UploadModeFilesController;
}

export const fileRoutesHandler = ({ uploadModeFilesController }: IHandler, adminAuthorizer: JWTAdminAuthorizer, router: Router): Router => {
  router.post(
    '/admin/upload-files',
    // adminAuthorizer.authorize,
    imageUpload.array('files', 25),
    uploadModeFilesController.invoke.bind(uploadModeFilesController)
    /*
    #swagger.tags = ['File']
    #swagger.requestBody = {
    content:{
    "multipart/form-data": {
    schema:{
    type: "object",
    required: ["files"],
    properties:{
    files:{
    type:"array",
    items:{
    type:"string",
    format:"binary"
    }
    },
    type:{enum :["LEFT_RIGHT_MODE","VISUAL_BALANCE_MODE"]}
    }
    }
    }
    }
    }
 
     */
  );
  return router;
};

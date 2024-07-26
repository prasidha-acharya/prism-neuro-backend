import { Router } from 'express';
import { JWTAdminAuthorizer } from '../../../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import * as controller from '../../controllers/index';
import { imageUpload } from '../admin/admin-physio.routes';

interface IHandler {
  uploadModeFilesController: controller.UploadModeFilesController;
  getModeFilesController: controller.GetModeFilesController;
}

export const fileRoutesHandler = (
  { uploadModeFilesController, getModeFilesController }: IHandler,
  adminAuthorizer: JWTAdminAuthorizer,
  router: Router
): Router => {
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

  router.get(
    '/admin/files',
    getModeFilesController.invoke.bind(getModeFilesController)
    /* 
    #swagger.tags = ['File']
    #swagger.summary = "Get files"
     #swagger.parameters['type'] = {
    in:"query",
    type:"string",
    required:"true",
    schema:{
    '@enum':["LEFT_RIGHT_MODE","VISUAL_BALANCE_MODE"]
    }
    }
    #swagger.parameters['isLeftMode'] = {
    in:"query",
    type:"boolean",
    }
    #swagger.parameters['isRightMode'] = {
    in:"query",
    type:"boolean",

    }

    */
  );
  return router;
};

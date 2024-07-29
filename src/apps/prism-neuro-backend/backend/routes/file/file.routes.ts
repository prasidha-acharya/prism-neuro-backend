import { Router } from 'express';
import multer from 'multer';
import { JWTUserAuthorizer } from 'src/contexts/shared/infrastructure/authorizer/user.authorizer';
import { JWTAdminAuthorizer } from '../../../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import * as controller from '../../controllers/index';

export const imageUpload = multer({});

interface IHandler {
  uploadModeFilesController: controller.UploadModeFilesController;
  getModeFilesController: controller.GetModeFilesController;
  deleteFilesController: controller.DeleteFilesController;
  uploadProfileImageController: controller.UploadProfileImageController;
}

export const fileRoutesHandler = (
  { uploadModeFilesController, getModeFilesController, deleteFilesController, uploadProfileImageController }: IHandler,
  adminAuthorizer: JWTAdminAuthorizer,
  userAuthorizer: JWTUserAuthorizer,
  router: Router
): Router => {
  router.post(
    '/upload-profile',
    userAuthorizer.authorize,
    imageUpload.single('file'),
    uploadProfileImageController.validate,
    uploadProfileImageController.invoke.bind(uploadProfileImageController)

    /*
    #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags =["File"]
    #swagger.requestBody = {
    content:{
    "multipart/form-data" :{
    schema:{
    type:"object",
    required:["file"],
    properties:{
    file:{
    type:"string",
    format:"binary"
    },
    uploadFor:{
    enum:["PATIENT","ADMIN","PHYSIO"]
    }
    }
    }
    }
    }
    }
    #swagger.responses[200] = {
  
    }
    */
  );

  router.post(
    '/admin/upload-files',
    adminAuthorizer.authorize,
    imageUpload.array('files', 25),
    uploadModeFilesController.validate,
    uploadModeFilesController.invoke.bind(uploadModeFilesController)
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
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
    type:{enum :["LEFT_RIGHT_MODE","VISUAL_BALANCE_MODE"]},
    isLeftMode:{type:"boolean"},
    isRightMode:{type:"boolean"}
    }
    }
    }
    }
    }
 
     */
  );

  router.get(
    '/admin/files',
    adminAuthorizer.authorize,
    getModeFilesController.invoke.bind(getModeFilesController)
    /* 
    #swagger.security = [{
            "bearerAuth": []
    }] 
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

  router.post(
    '/delete/file',
    userAuthorizer.authorize,
    deleteFilesController.invoke.bind(deleteFilesController)
    /*
    #swagger.security = [{
      "bearerAuth": []
    }] 
  #swagger.tags = ['File']
  #swagger.summary = 'Delete file'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["key"],
            properties: {
            key:{type:"string"}
            }
          }
        }
      }
    }
  }
  */
  );

  return router;
};
